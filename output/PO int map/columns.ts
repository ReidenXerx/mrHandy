const columns = [
{
            field: 'runNumber',
            headerName: t('RunNumberLabel', 'Run number'),
            flex: 1,
            type: 'number'
          },
{
            field: 'fileName',
            headerName: t('FileNameLabel', 'File name'),
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
            field: 'statusDescription',
            headerName: t('StatusDescriptionLabel', 'Status'),
            flex: 1,
            type: 'string'
          },
{
            field: 'totalImported',
            headerName: t('TotalImportedLabel', 'Total imported'),
            flex: 1,
            type: 'number'
          },
{
            field: 'totalExported',
            headerName: t('TotalExportedLabel', 'Total exported'),
            flex: 1,
            type: 'number'
          },
{
            field: 'recordsInMonitor',
            headerName: t('RecordsInMonitorLabel', 'Records in monitor'),
            flex: 1,
            type: 'boolean'
          },
commonColumns.instanceId,
{
            field: 'runType',
            headerName: t('RunTypeLabel', 'Run type'),
            flex: 1,
            type: 'string'
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
commonColumns.createdBy,
commonColumns.created,
commonColumns.lastUpdatedBy,
commonColumns.lastUpdated
];
export default columns;