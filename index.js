import fs from 'fs-extra'
import inquirer from 'inquirer'
import path from 'path'
import xlsx from 'xlsx'

async function main() {
  const xlsxFiles = fs
    .readdirSync('./input')
    .filter((file) => file.endsWith('.xlsx'))

  const selectedFilesAnswer = await inquirer.prompt([
    {
      type: 'checkbox',
      message: 'Select XLSX files',
      name: 'selectedFiles',
      choices: xlsxFiles,
      validate(answer) {
        if (answer.length < 1) {
          return 'You must choose at least one file.'
        }
        return true
      },
    },
  ])

  let allSheets = []
  let resultCollection = []
  for (const file of selectedFilesAnswer.selectedFiles) {
    const workbook = xlsx.readFile(path.join('./input', file))
    allSheets = allSheets.concat(
      workbook.SheetNames.map((sheetName) => `${file} -> ${sheetName}`),
    )
  }

  const selectedSheetsAnswer = await inquirer.prompt([
    {
      type: 'checkbox',
      message: 'Select sheets from all files',
      name: 'selectedSheets',
      choices: allSheets,
      validate(answer) {
        if (answer.length < 1) {
          return 'You must choose at least one sheet.'
        }
        return true
      },
    },
  ])

  const sheetTypesAnswer = await inquirer.prompt(
    selectedSheetsAnswer.selectedSheets.map((sheetWithFile) => {
      const [file, sheetName] = sheetWithFile.split(' -> ')
      return {
        type: 'list',
        name: sheetWithFile.replace('.', ' '),
        message: `Select the type for "${sheetName}" in "${file}":`,
        choices: ['data-grid', 'form/modal'],
      }
    }),
  )

  for (const sheetWithFile of selectedSheetsAnswer.selectedSheets) {
    const [file, sheetName] = sheetWithFile.split(' -> ')
    const type = sheetTypesAnswer[sheetWithFile.replace('.', ' ')]
    const workbook = xlsx.readFile(path.join('./input', file))
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName])
    // Get a list of API Field names from the sheet data
    const apiFieldChoices = sheetData
      .map((row) => row['API Field'])
      .filter(Boolean)
    apiFieldChoices.push(new inquirer.Separator(), 'All fields')

    // Prompt user to select fields for this sheet
    const { selectedApiFields } = await inquirer.prompt({
      type: 'checkbox',
      name: 'selectedApiFields',
      message: `Select API fields to process for sheet "${sheetName}" in file "${file}":`,
      choices: apiFieldChoices,
    })

    // Check if user selected 'All fields'
    const isProcessingAllFields = selectedApiFields.includes('All fields')
    const fieldsToProcess = isProcessingAllFields
      ? apiFieldChoices
      : selectedApiFields
    const {
      fields,
      fieldsNames,
      translations,
      columns,
      defaultVisibleColumns,
      dataSampleConfig,
      yupResolverSchema,
    } = processSheetData(sheetData, type, fieldsToProcess)

    resultCollection.push({
      [sheetName]: {
        fields,
        fieldsNames,
        translations,
        columns,
        defaultVisibleColumns,
        dataSampleConfig,
        yupResolverSchema,
      },
    })
  }

  const existingTranslations = fs.readJsonSync('./input/translation.json')
  let updatedTranslations = {}
  for (const sheetWithFile of selectedSheetsAnswer.selectedSheets) {
    const [file, sheetName] = sheetWithFile.split(' -> ')
    const type = sheetTypesAnswer[sheetWithFile]
    const workbook = xlsx.readFile(path.join('./input', file))
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName])
    const sheetTranslations = processTranslations(sheetData)
    updatedTranslations = { ...updatedTranslations, ...sheetTranslations }
  }
  // gathering translations for all entities
  updatedTranslations = {
    ...existingTranslations,
    ...updatedTranslations,
    ...resultCollection.reduce(
      (acc, resultUnit) => ({ ...acc, ...resultUnit.translations }),
      {},
    ),
  }
  const sortedTranslations = Object.keys(updatedTranslations)
    .sort()
    .reduce((obj, key) => {
      obj[key] = updatedTranslations[key]
      return obj
    }, {})

  // data samples
  resultCollection = resultCollection.map((resultUnit) => {
    const [key] = Object.keys(resultUnit)
    return {
      [key]: {
        ...resultUnit[key],
        dataSamples: generateDataSamples(resultUnit[key].dataSampleConfig),
      },
    }
  })
  writeIntoFiles(resultCollection, sortedTranslations)
}

function writeIntoFiles(resultCollection, translations) {
  for (const resultUnit of resultCollection) {
    const [sheetName] = Object.keys(resultUnit)
    const {
      fields,
      fieldsNames,
      columns,
      defaultVisibleColumns,
      dataSamples,
      yupResolverSchema,
    } = resultUnit[sheetName]
    fs.ensureDirSync(`./output/${sheetName}`)
    Object.keys(fields).length &&
      fs.writeFileSync(
        `./output/${sheetName}/fields.ts`,
        fieldsObjectToString(fields),
      )
    Object.keys(fieldsNames).length &&
      fs.writeJsonSync(`./output/${sheetName}/fieldsNames.json`, fieldsNames, {
        spaces: 2,
      })

    const columnsString = getColumnsString(columns)
    columnsString &&
      fs.writeFileSync(
        `./output/${sheetName}/columns.ts`,
        `const columns = [\n${columnsString}\n];\nexport default columns;`,
      )
    columnsString &&
      fs.writeFileSync(
        `./output/${sheetName}/defaultVisibleColumns.ts`,
        `const defaultVisibleColumns = ${JSON.stringify(
          defaultVisibleColumns,
          null,
          2,
        )};\nexport default defaultVisibleColumns;`,
      )

    dataSamples.length &&
      fs.writeJsonSync(`./output/${sheetName}/dataSamples.json`, dataSamples, {
        spaces: 2,
      })

    Object.keys(yupResolverSchema).length &&
      fs.writeFileSync(
        `./output/${sheetName}/yupSchema.ts`,
        yupObjectSchemaToString(yupResolverSchema),
      )
  }
  fs.writeJsonSync('./output/translation.json', translations, { spaces: 2 })
}

function processSheetData(sheetData, entityType, fieldsToProcess) {
  const fields = {}
  const columns = []
  const defaultVisibleColumns = {}
  const fieldsNames = {}
  const translations = {}
  const dataSampleConfig = []
  let yupResolverSchema = {}

  sheetData.forEach((row) => {
    const apiField = row['API Field']
    const label = row['Label']
    const translationKey = apiField
      ? `${capitalizeFirstLetter(apiField)}Label`
      : ''
    const editable = row['Editable'] === 'Y'
    const visible = row['Visible by default'] === 'Y'
    const nullable = row['Non-null'] === 'N'
    const type = row['Field type']
    translations[translationKey] = label

    if (
      apiField !== undefined &&
      label !== undefined &&
      visible !== undefined &&
      type !== undefined &&
      fieldsToProcess.includes(apiField)
    ) {
      // Fields for data-grid
      if (entityType === 'data-grid') {
        const fieldType = mapFieldTypeToType(type, label, apiField)

        columns.push({
          field: apiField,
          headerName: `t('${translationKey}', '${label}')`,
          flex: 1,
          type: fieldType,
        })

        dataSampleConfig.push({ type: fieldType, field: apiField })

        defaultVisibleColumns[apiField] = visible
      }
      // Fields for form/modal
      else if (entityType === 'form/modal') {
        fields[apiField] = {
          visibility: visible,
          component: determineComponent(
            type,
            apiField,
            label,
            translationKey,
            editable,
          ),
        }

        const fieldType = mapFieldTypeToType(type, label, apiField)
        yupResolverSchema = {
          ...yupResolverSchema,
          ...mapFieldToYupSchemaEntry(
            fieldType,
            apiField,
            translationKey,
            label,
            nullable,
            editable,
          ),
        }

        dataSampleConfig.push({ type: fieldType, field: apiField })
        fieldsNames[apiField] = apiField
      }
    }
  })

  return {
    fields,
    fieldsNames,
    translations,
    columns,
    defaultVisibleColumns,
    dataSampleConfig,
    yupResolverSchema,
  }
}

function mapFieldToYupSchemaEntry(
  fieldType,
  apiField,
  translationKey,
  label,
  nullable,
  _editable,
) {
  switch (fieldType) {
    case 'string':
      return {
        [apiField]: `string().required()${
          nullable ? '.nullable()' : ''
        }.label(t('${translationKey}', '${label}'))`,
      }
    case 'number':
    case 'id':
      return {
        [apiField]: `number().required()${
          nullable ? '.nullable()' : ''
        }.label(t('${translationKey}', '${label}'))`,
      }
    case 'boolean':
      return {
        [apiField]: `boolean().required()${
          nullable ? '.nullable()' : ''
        }.label(t('${translationKey}', '${label}'))`,
      }
    case 'dateTime':
      return {
        [apiField]: `date().required()${
          nullable ? '.nullable()' : ''
        }.label(t('${translationKey}', '${label}'))`,
      }
    default:
      return {
        [apiField]: `string()${
          nullable ? '.nullable()' : ''
        }.label(t('${translationKey}', '${label}'))`,
      }
  }
}

function yupObjectSchemaToString(obj) {
  let str = 'import { object, string, number, boolean, date } from "yup";\n\n'
  str += 'const schema = object({\n'

  for (const key in obj) {
    str += `  [${key}]: ${obj[key]},\n`
  }

  str += '});\n\nexport default schema;'
  return str
}

function fieldsObjectToString(fields) {
  let str =
    'import { TextField, NumberField, Checkbox, DatePickerField, LOV } from "path_to_your_components";\n'
  str += 'import { FIELDS_NAMES } from "path_to_your_field_names";\n'
  str += 'import { t } from "i18next";\n'
  str += 'import { control } from "your_form_control_location";\n\n'

  str += 'export const FIELDS = {\n'

  for (const key in fields) {
    str += `  ${key}: (\n`
    str += `    ${fields[key].component},\n`
    str += '  ),\n'
  }

  str += '};\n'
  return str
}

const getColumnsString = (columns) => {
  const commonColumns = [
    'active',
    'created',
    'createdBy',
    'lastUpdatedBy',
    'lastUpdated',
    'startDate',
    'endDate',
    'instanceId',
  ]

  const columnsString = columns
    .map((column) => {
      if (commonColumns.includes(column.field)) {
        return `commonColumns.${column.field}`
      } else if (column.type === 'dateTime') {
        return `{
            field: '${column.field}',
            headerName: ${column.headerName},
            flex: ${column.flex},
            type: '${column.type}'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          }`
      } else {
        return `{
            field: '${column.field}',
            headerName: ${column.headerName},
            flex: ${column.flex},
            type: '${column.type}'
          }`
      }
    })
    .join(',\n')

  return columnsString
}

function processTranslations(sheetData) {
  const translations = {}
  sheetData.forEach((row) => {
    const apiField = row['API Field']
    const label = row['Label']
    if (apiField && label) {
      const translationKey = `${capitalizeFirstLetter(apiField)}Label`
      translations[translationKey] = label
    }
  })
  return translations
}

function determineComponent(
  fieldType,
  apiField,
  label,
  translationKey,
  _editable,
) {
  switch (fieldType) {
    case 'Text':
    case 'Long':
      return `<TextField name="${apiField}" control={control} label={t('${translationKey}', '${label}')} data-testid='${apiField}-test-id'/>`
    case 'Number':
      return `<NumberField name="${apiField}" control={control} label={t('${translationKey}', '${label}')} data-testid='${apiField}-test-id'/>`
    case 'Checkbox':
      return `<Checkbox name="${apiField}" control={control} label={t('${translationKey}', '${label}')} data-testid='${apiField}-test-id'/>`
    case 'Date':
    case 'DateTime':
    case 'datetime':
    case 'Datetime':
    case 'Date time':
      return `<DatePickerField name="${apiField}" control={control} label={t('${translationKey}', '${label}')} />`
    case 'LOV': // List of Values
      return `<LOV name="${apiField}" control={control} label={t('${translationKey}', '${label}')} />`
    default:
      return `<div>Unknown field type for ${apiField}</div>` // Default case for unknown field type
  }
}

function mapFieldTypeToType(fieldType, label, fieldName) {
  if (
    label.includes('id') ||
    label.includes('Id') ||
    fieldName.includes('id') ||
    fieldName.includes('Id')
  ) {
    return 'id'
  }
  switch (fieldType) {
    case 'Number (integer)':
    case 'Number':
    case 'Number (no formatting)':
    case 'number':
      return 'number'
    case 'Checkbox':
      return 'boolean'
    case 'Date':
    case 'DateTime':
    case 'datetime':
    case 'Datetime':
    case 'Date time':
      return 'dateTime'
    case 'Long':
      return 'id'
    default:
      return 'string'
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function generateRandomData(type) {
  switch (type) {
    case 'string':
      return 'Sample Text'
    case 'number':
      return Math.floor(Math.random() * 100)
    case 'boolean':
      return Math.random() > 0.5
    case 'dateTime':
      return new Date().toISOString()
    case 'id':
      return Math.floor(Math.random() * 9000000) + 1000000
    default:
      return ''
  }
}

function generateDataSamples(columns, count = 3) {
  const dataSamples = []

  for (let i = 0; i < count; i++) {
    const dataObject = {}
    columns.forEach((column) => {
      dataObject[column.field] = generateRandomData(column.type)
    })
    dataSamples.push(dataObject)
  }

  return dataSamples
}

main().catch(console.error)
