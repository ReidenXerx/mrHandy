import fs from 'fs'
import inquirer from 'inquirer'
import path from 'path'

// Input and output directories
const inputDir = './controller-parser/input-controllers'
const outputDir = './controller-parser/output'

/**
 * Extracts all URL properties from the TypeScript file content.
 * @param fileContent - The content of the TypeScript file as a string.
 * @returns An array of URL strings.
 */
const extractUrls = (fileContent) => {
  const urlRegex = /url:\s*'([^']+)'/g
  let match
  const urls = []

  while ((match = urlRegex.exec(fileContent)) !== null) {
    urls.push(match[1])
  }

  return urls
}

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
  url,
}) => {
  const hookType = determineHookType(methodName)
  let hookContent = ''

  if (hookType === 'fetch') {
    // Fetch hook template
    hookContent = `
    //request url: ${url}
const ${hookName} = <Select = ${returnType}>(
  {${generateParamListWithoutTypes(
    parameters,
  )}}: { ${generateParamListWithTypes(parameters)} },
  options?: UseQueryOptions<${returnType}, ErrorResponse, Select>
) => {
  const client = useRecoilValue(apiClient);
  if (!client) throw new Error('MISSING_CLIENT');

  return useSuspenseQuery<${returnType}, ErrorResponse, Select>({
    queryKey: ${baseQueryConstName}.${hookName.slice(
      3,
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
    //request url: ${url}
const ${hookName} = ({${generateParamListWithoutTypes(
      parameters,
    )}}: { ${generateParamListWithTypes(parameters)} }) => {
  const client = useRecoilValue(apiClient);
  if (!client) throw new Error('MISSING_CLIENT');

  return useMutation<Blob, ApiError, number>({
    mutationKey: ${baseQueryConstName}.${hookName.slice(
      3,
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
    //request url: ${url}
      const ${hookName} = () => {
        const client = useRecoilValue(apiClient);
        const queryClient = useQueryClient();
        if (!client) throw new Error('MISSING_CLIENT');

        return useMutation<${returnType}, ApiError, REQUEST_BODY_TYPE>({
          mutationKey: ${baseQueryConstName}.${hookName.slice(
            3,
          )}(${generateParamListWithoutTypes(parameters)}),
          mutationFn: (requestBody: REQUEST_BODY_TYPE) => client.${controllerName}.${methodName}(${generateParamListWithoutTypes(
            parameters,
          )}, requestBody),
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ${baseQueryConstName}.Fetch${hookName.slice(
              3,
            )}(${generateParamListWithoutTypes(parameters)}) });
            await queryClient.refetchQueries({ queryKey: ${baseQueryConstName}.Fetch${hookName.slice(
              3,
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
const generateQueryFile = (queryMappings, baseQueryKey, filePath) => {
  let fileContent = `export const ${baseQueryKey}Queries = {\n`

  Object.entries(queryMappings).forEach(([key, [parameters, queryAction]]) => {
    queryAction = queryAction === 'get' ? 'fetch' : queryAction
    if (parameters.length && Array.isArray(parameters)) {
      fileContent += `  ${capitalize(
        queryAction,
      )}${key}: (${generateParamListWithTypes(
        parameters,
      )}) => ['${camelToKebabCase(baseQueryKey)}', '${camelToKebabCase(
        key,
      )}', ${generateParamListWithoutTypes(parameters)
        .split(',')
        .map((param) => `\`$\{${param}\}\``)
        .join()}, '${queryAction}'],\n`
    } else if (queryAction.length > 1) {
      fileContent += `  ${capitalize(
        queryAction,
      )}${key}: () => ['${camelToKebabCase(baseQueryKey)}', '${camelToKebabCase(
        key,
      )}', '${queryAction}'],\n`
    } else {
      fileContent += `  ${key}: () => ['${camelToKebabCase(
        baseQueryKey,
      )}', '${camelToKebabCase(key)}'],\n`
    }
  })

  fileContent += '} as const;\n'

  fs.writeFileSync(filePath, fileContent)
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
      /public\s+[a-zA-Z0-9]+\([^)]*\)\s*:\s*CancelablePromise<[\s\S]+?>\s*{/g,
    )

    const urlsByMethod = extractUrls(fileContent)
    const baseQueryKey = extractName(controllerName).suffix
    const queriesFileName = `${baseQueryKey}Queries.ts`
    const baseQueryConstName = `${baseQueryKey}Queries`
    const queries = {
      [baseQueryKey]: camelToKebabCase(baseQueryKey),
    }
    methodDeclarations.forEach((methodDeclaration, index) => {
      const cleanMethodDeclaration = methodDeclaration
        .replace(/\s+/g, ' ')
        .trim()
      const { returnType, parameters } = extractMethodDetails(
        cleanMethodDeclaration,
      )
      const methodName = methodDeclaration.split(' ')[1].split('(')[0]
      const { suffix: specificQueryKey, verb: queryAction } =
        extractName(methodName)

      queries[specificQueryKey] = [parameters, queryAction]

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
        url: urlsByMethod[index],
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
