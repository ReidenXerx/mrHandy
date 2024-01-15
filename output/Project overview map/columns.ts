const columns = [
{
      field: 'projectReference',
      headerName: t('ProjectReferenceLabel', 'Project reference'),
      flex: 1,
      type: 'string'
    },
{
      field: 'projectAttribute1',
      headerName: t('ProjectAttribute1Label', 'Attribute 1'),
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
      field: 'projectId',
      headerName: t('ProjectIdLabel', 'Project ID'),
      flex: 1,
      type: 'id'
    },
{
      field: 'instanceId',
      headerName: t('InstanceIdLabel', 'Instance ID'),
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