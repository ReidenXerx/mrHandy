import fs from 'fs'
import inquirer from 'inquirer'
import path from 'path'

// Input and output directories
const inputDir = './controller-parser/input-controllers'
const outputDir = './controller-parser/output'

/**
 * Generates a parameter list as a string without types.
 * @param {Array} parameters - The array of parameter objects.
 * @return {string} A comma-separated list of parameter names.
 */
const generateParamListWithoutTypes = (parameters) => {
  return parameters.map((param) => param.name).join(', ')
}

/**
 * Generates a parameter list as a string with types.
 * @param {Array} parameters - The array of parameter objects.
 * @return {string} A comma-separated list of parameters with their types.
 */
const generateParamListWithTypes = (parameters) => {
  return parameters.map((param) => `${param.name}: ${param.type}`).join(', ')
}

// Determine the type of hook based on the method name
const determineHookType = (methodName) => {
  if (methodName.startsWith('get') || methodName.startsWith('fetch')) {
    return 'fetch'
  } else if (methodName.startsWith('download')) {
    return 'download'
  } else {
    return 'mutation'
  }
}

/**
 * Converts camelCase to kebab-case.
 * @param {string} str - The string to convert.
 * @return {string} The converted string.
 */
const camelToKebabCase = (str) => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

// Helper function to capitalize first letter
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

// Function to generate hook name
const generateHookName = (methodName) => {
  const verb = methodName.match(
    /^(get|post|update|delete|download|approve|cancel|import|proceed|end|import)/i,
  )[0]
  const suffix = methodName.replace(verb, '')
  if (
    [
      'approve',
      'cancel',
      'download',
      'update',
      'proceed',
      'end',
      'import',
    ].includes(verb.toLowerCase())
  ) {
    return `use${capitalize(verb)}${capitalize(suffix)}`
  } else if (verb.toLowerCase() === 'get') {
    return `useFetch${capitalize(suffix)}`
  }
  return `use${capitalize(suffix)}`
}

const extractName = (methodName) => {
  const verb = methodName.match(
    /^(get|post|update|delete|download|approve|cancel|import)/i,
  )?.[0]
  const suffix = methodName.replace(verb, '').replace('ControllerService', '')
  return { verb, suffix }
}

// Extract ReturnType and Parameters from a controller method declaration
const extractMethodDetails = (methodDeclaration) => {
  const returnTypeMatch = methodDeclaration.match(/:\sCancelablePromise<(.+?)>/)
  const returnType = returnTypeMatch
    ? returnTypeMatch[1].includes('<')
      ? `${returnTypeMatch[1]}>`
      : returnTypeMatch[1]
    : 'unknown'

  const parametersMatch = methodDeclaration.match(/\(([^)]+)\)/)
  let parameters = []

  if (parametersMatch) {
    const paramsString = parametersMatch[1]
    // Match each parameter, taking into account optional parameters and destructured objects
    const paramRegex = /(\w+)?\??\s*:\s*({[^}]+}|[^,]+)/g
    let paramMatch

    while ((paramMatch = paramRegex.exec(paramsString)) !== null) {
      let [fullMatch, paramName, paramType] = paramMatch

      // If the parameter is an object destructuring, keep it as is, otherwise trim
      paramType = paramType.startsWith('{') ? paramType : paramType.trim()
      paramName = (paramName || '').trim()
      const optional = fullMatch.includes('?')

      parameters.push({ name: paramName, type: paramType, optional })
    }
  }

  return { returnType, parameters }
}

// Generate hook file content based on hook type and method name
const generateHookFile = ({
  baseQueryKey,
  baseQueryConstName,
  specificQueryKey,
  methodName,
  hookName,
  controllerName,
  returnType,
  parameters,
}) => {
  const hookType = determineHookType(methodName)
  let hookContent = ''

  if (hookType === 'fetch') {
    // Fetch hook template
    hookContent = `
const ${hookName} = <Select = ${returnType}>(
  {${generateParamListWithoutTypes(
    parameters,
  )}}: { ${generateParamListWithTypes(parameters)} }
  options?: UseQueryOptions<${returnType}, ErrorResponse, Select>
) => {
  const client = useRecoilValue(apiClient);
  if (!client) throw new Error('MISSING_CLIENT');

  return useSuspenseQuery<${returnType}, ErrorResponse, Select>({
    queryKey: ${baseQueryConstName}.${hookName.slice(
      2,
    )}(${generateParamListWithoutTypes(parameters)}),
    queryFn: () => client.${controllerName}.${methodName}(${generateParamListWithoutTypes(
      parameters,
    )}),
    staleTime: HalfHourCacheDuration,
    ...options
  });
};

export default ${hookName};
`
  } else if (hookType === 'download') {
    // Download hook template
    hookContent = `
const ${hookName} = ({${generateParamListWithoutTypes(
      parameters,
    )}}: { ${generateParamListWithTypes(parameters)} }) => {
  const client = useRecoilValue(apiClient);
  if (!client) throw new Error('MISSING_CLIENT');

  return useMutation<Blob, ApiError, number>({
    mutationKey: ${baseQueryConstName}.${hookName.slice(
      2,
    )}(${generateParamListWithoutTypes(parameters)}),
    mutationFn: () => client.${controllerName}.${methodName}(${generateParamListWithoutTypes(
      parameters,
    )}),
  });
};

export default ${hookName};
`
  } else {
    // Mutation hook template
    hookContent = `
      const ${hookName} = () => {
        const client = useRecoilValue(apiClient);
        const queryClient = useQueryClient();
        if (!client) throw new Error('MISSING_CLIENT');

        return useMutation<${returnType}, ApiError, REQUEST_BODY_TYPE>({
          mutationKey: ${baseQueryConstName}.${hookName.slice(
            2,
          )}(${generateParamListWithoutTypes(parameters)}),
          mutationFn: (requestBody: REQUEST_BODY_TYPE) => client.${controllerName}.${methodName}(${generateParamListWithoutTypes(
            parameters,
          )}, requestBody),
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: Fetch${baseQueryConstName}.${hookName.slice(
              2,
            )}(${generateParamListWithoutTypes(parameters)}) });
            await queryClient.refetchQueries({ queryKey: Fetch${baseQueryConstName}.${hookName.slice(
              2,
            )}(${generateParamListWithoutTypes(parameters)}) });
          }
        });
      };

      export default ${hookName};
      `
  }

  return hookContent
}

/**
 * Generates a file with query constants from an object.
 * @param {Object} queryMappings - The object containing the query mappings.
 * @param {string} fileName - The desired name for the output file (without extension).
 */
const generateQueryFile = (queryMappings, baseQueryKey, path) => {
  let fileContent = `export const ${baseQueryKey}Queries = {\n`

  for (const [key, value] of Object.entries(queryMappings)) {
    fileContent += `  ${key}: '${value}',\n`
  }

  fileContent += '} as const;\n'

  fs.writeFileSync(path, fileContent)
}

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const processFiles = async () => {
  // Get all controller files
  const files = fs.readdirSync(inputDir).filter((file) => file.endsWith('.ts'))

  // Prompt the user to select files to process
  const answers = await inquirer.prompt([
    {
      type: 'checkbox',
      message: 'Select controller files to process',
      name: 'selectedFiles',
      choices: files.map((file) => ({ name: file })),
      validate: (answer) => {
        if (answer.length < 1) {
          return 'You must choose at least one file.'
        }
        return true
      },
    },
  ])

  answers.selectedFiles.forEach((file) => {
    const controllerName = path.basename(file, '.ts')
    const fileContent = fs.readFileSync(path.join(inputDir, file), 'utf8')
    const outputControllerDir = path.join(outputDir, controllerName)
    if (!fs.existsSync(outputControllerDir)) {
      fs.mkdirSync(outputControllerDir, { recursive: true })
    }
    // Extract method declarations
    const methodDeclarations = fileContent.match(
      /public\s+[a-zA-Z]+\([^)]*\)\s*:\s*CancelablePromise<[^{]+?{/g,
    )
    const baseQueryKey = extractName(controllerName).suffix
    const queriesFileName = `${baseQueryKey}Queries.ts`
    const baseQueryConstName = `${baseQueryKey}Queries`
    const queries = {
      [baseQueryKey]: camelToKebabCase(baseQueryKey),
    }
    methodDeclarations.forEach((methodDeclaration) => {
      const cleanMethodDeclaration = methodDeclaration
        .replace(/\s+/g, ' ')
        .trim()
      const { returnType, parameters } = extractMethodDetails(
        cleanMethodDeclaration,
      )
      const methodName = methodDeclaration.split(' ')[1].split('(')[0]
      const specificQueryKey = extractName(methodName).suffix
      queries[specificQueryKey] = camelToKebabCase(specificQueryKey)
      const hookName = generateHookName(methodName)
      const hookContent = generateHookFile({
        baseQueryKey,
        specificQueryKey,
        baseQueryConstName,
        methodName,
        hookName,
        controllerName,
        returnType,
        parameters,
      })
      const hookFileName = `${hookName}.ts`

      const outputHookFilePath = path.join(outputControllerDir, hookFileName)
      fs.writeFileSync(outputHookFilePath, hookContent)
    })
    generateQueryFile(
      queries,
      baseQueryKey,
      path.join(outputControllerDir, queriesFileName),
    )
  })
  console.log('Hooks generated successfully.')
}

processFiles().catch(console.error)
