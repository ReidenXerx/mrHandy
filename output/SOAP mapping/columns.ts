const columns = [
{
      field: 'processingOrder',
      headerName: t('ProcessingOrderLabel', 'Processing order'),
      flex: 1,
      type: 'number'
    },
{
      field: 'startTime',
      headerName: t('StartTimeLabel', 'Start time'),
      flex: 1,
      type: 'string'
    },
{
      field: 'endTime',
      headerName: t('EndTimeLabel', 'End time'),
      flex: 1,
      type: 'string'
    },
{
      field: 'status',
      headerName: t('StatusLabel', 'Status'),
      flex: 1,
      type: 'string'
    },
{
      field: 'fusionRequestId',
      headerName: t('FusionRequestIdLabel', 'Fusion request ID'),
      flex: 1,
      type: 'id'
    },
{
      field: 'jobDefinitionName',
      headerName: t('JobDefinitionNameLabel', 'Job definition name'),
      flex: 1,
      type: 'string'
    },
{
      field: 'soapId',
      headerName: t('SoapIdLabel', 'Soap ID'),
      flex: 1,
      type: 'id'
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
      field: 'fileId',
      headerName: t('FileIdLabel', 'File ID'),
      flex: 1,
      type: 'id'
    },
{
      field: 'statementId',
      headerName: t('StatementIdLabel', 'Statement ID'),
      flex: 1,
      type: 'id'
    },
{
      field: 'buId',
      headerName: t('BuIdLabel', 'Business Unit ID'),
      flex: 1,
      type: 'id'
    },
{
      field: 'seqId',
      headerName: t('SeqIdLabel', 'Sequence ID'),
      flex: 1,
      type: 'id'
    },
{
      field: 'selectInConcProcessing',
      headerName: t('SelectInConcProcessingLabel', 'Select in Concurrent Processing'),
      flex: 1,
      type: 'boolean'
    },
{
      field: 'requestType',
      headerName: t('RequestTypeLabel', 'Request Type'),
      flex: 1,
      type: 'string'
    },
{
      field: 'requestResult',
      headerName: t('RequestResultLabel', 'Request Result'),
      flex: 1,
      type: 'string'
    },
{
      field: 'requestMessage',
      headerName: t('RequestMessageLabel', 'Request message'),
      flex: 1,
      type: 'string'
    },
{
      field: 'resultDocId',
      headerName: t('ResultDocIdLabel', 'Result doc ID'),
      flex: 1,
      type: 'id'
    },
{
      field: 'userId',
      headerName: t('UserIdLabel', 'User ID'),
      flex: 1,
      type: 'id'
    },
{
      field: 'jobType',
      headerName: t('JobTypeLabel', 'Job Type'),
      flex: 1,
      type: 'string'
    },
{
      field: 'jobPackageName',
      headerName: t('JobPackageNameLabel', 'Job Package Name'),
      flex: 1,
      type: 'string'
    },
{
      field: 'ucmLoadFileName',
      headerName: t('UcmLoadFileNameLabel', 'Ucm Load file name'),
      flex: 1,
      type: 'string'
    },
{
      field: 'workerId',
      headerName: t('WorkerIdLabel', 'Worker ID'),
      flex: 1,
      type: 'id'
    },
{
      field: 'subGroupId',
      headerName: t('SubGroupIdLabel', 'Sub group ID'),
      flex: 1,
      type: 'id'
    },
{
      field: 'errorAction',
      headerName: t('ErrorActionLabel', 'Error Action'),
      flex: 1,
      type: 'string'
    },
{
      field: 'customWsdl',
      headerName: t('CustomWsdlLabel', 'Custom WSDL'),
      flex: 1,
      type: 'string'
    },
{
      field: 'response',
      headerName: t('ResponseLabel', 'Response'),
      flex: 1,
      type: 'string'
    },
{
      field: 'retryCounter',
      headerName: t('RetryCounterLabel', 'Retry counter'),
      flex: 1,
      type: 'number'
    },
{
      field: 'statement',
      headerName: t('StatementLabel', 'Statement'),
      flex: 1,
      type: 'string'
    }
];
export default columns;