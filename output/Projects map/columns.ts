const columns = [
{
      field: 'errorMessage',
      headerName: t('ErrorMessageLabel', 'Error message'),
      flex: 1,
      type: 'number'
    },
{
      field: 'importAction',
      headerName: t('ImportActionLabel', 'Import action'),
      flex: 1,
      type: 'string'
    },
{
      field: 'projectReference',
      headerName: t('ProjectReferenceLabel', 'Project reference'),
      flex: 1,
      type: 'string'
    },
{
      field: 'description',
      headerName: t('DescriptionLabel', 'Description'),
      flex: 1,
      type: 'string'
    },
{
      field: 'endDate',
      headerName: t('EndDateLabel', 'End date'),
      flex: 1,
      type: 'dateTime'
    },
{
      field: 'projectAttribute1',
      headerName: t('ProjectAttribute1Label', 'Project attribute 1'),
      flex: 1,
      type: 'string'
    },
{
      field: 'runNumber',
      headerName: t('RunNumberLabel', 'Run number'),
      flex: 1,
      type: 'number'
    },
{
      field: 'lineNumber',
      headerName: t('LineNumberLabel', 'Line number'),
      flex: 1,
      type: 'number'
    },
{
      field: 'instanceId',
      headerName: t('InstanceIdLabel', 'Instance ID'),
      flex: 1,
      type: 'id'
    },
{
      field: 'projectHistId',
      headerName: t('ProjectHistIdLabel', 'Project hist id'),
      flex: 1,
      type: 'id'
    },
{
      field: 'createdBy',
      headerName: t('CreatedByLabel', 'Created by'),
      flex: 1,
      type: 'string'
    },
{
      field: 'created',
      headerName: t('CreatedLabel', 'Created'),
      flex: 1,
      type: 'string'
    },
{
      field: 'lastUpdatedBy',
      headerName: t('LastUpdatedByLabel', 'Last updated by'),
      flex: 1,
      type: 'string'
    },
{
      field: 'lastUpdated',
      headerName: t('LastUpdatedLabel', 'Last updated'),
      flex: 1,
      type: 'string'
    }
];
export default columns;