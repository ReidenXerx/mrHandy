const columns = [
{
      field: 'totalImported',
      headerName: t('TotalImportedLabel', 'Total imported'),
      flex: 1,
      type: 'string'
    },
{
      field: 'profileDescription',
      headerName: t('ProfileDescriptionLabel', 'Setup profile'),
      flex: 1,
      type: 'string'
    },
{
      field: 'fileName',
      headerName: t('FileNameLabel', 'File name'),
      flex: 1,
      type: 'string'
    },
{
      field: 'statusDescription',
      headerName: t('StatusDescriptionLabel', 'Status'),
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
      field: 'instanceId',
      headerName: t('InstanceIdLabel', 'Instance ID'),
      flex: 1,
      type: 'id'
    },
{
      field: 'interfaceSetupProfileId',
      headerName: t('InterfaceSetupProfileIdLabel', 'Interface setup profile ID'),
      flex: 1,
      type: 'id'
    },
{
      field: 'statusCode',
      headerName: t('StatusCodeLabel', 'Status code'),
      flex: 1,
      type: 'number'
    },
{
      field: 'cancelRequested',
      headerName: t('CancelRequestedLabel', 'Cancel Requested'),
      flex: 1,
      type: 'boolean'
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
      type: 'dateTime'
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
      type: 'dateTime'
    }
];
export default columns;