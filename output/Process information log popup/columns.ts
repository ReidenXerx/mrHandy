const columns = [
{
      field: 'logItemTimeStamp',
      headerName: t('LogItemTimeStampLabel', 'Log timestamp'),
      flex: 1,
      type: 'number'
    },
{
      field: 'processStep',
      headerName: t('ProcessStepLabel', 'Step'),
      flex: 1,
      type: 'string'
    },
{
      field: 'processSubStep',
      headerName: t('ProcessSubStepLabel', 'Sub step'),
      flex: 1,
      type: 'string'
    },
{
      field: 'logType',
      headerName: t('LogTypeLabel', 'Log type'),
      flex: 1,
      type: 'string'
    },
{
      field: 'runByUserName',
      headerName: t('RunByUserNameLabel', 'User'),
      flex: 1,
      type: 'string'
    },
{
      field: 'logMessage',
      headerName: t('LogMessageLabel', 'Message'),
      flex: 1,
      type: 'string'
    },
{
      field: 'processType',
      headerName: t('ProcessTypeLabel', 'Process type'),
      flex: 1,
      type: 'string'
    },
{
      field: 'logLevel',
      headerName: t('LogLevelLabel', 'Log level'),
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
      field: 'processId',
      headerName: t('ProcessIdLabel', 'Process ID'),
      flex: 1,
      type: 'id'
    },
{
      field: 'runNumberId',
      headerName: t('RunNumberIdLabel', 'Run number ID'),
      flex: 1,
      type: 'id'
    },
{
      field: 'secondLevelId',
      headerName: t('SecondLevelIdLabel', 'Second level ID'),
      flex: 1,
      type: 'id'
    },
{
      field: 'thirdLevelId',
      headerName: t('ThirdLevelIdLabel', 'Third level ID'),
      flex: 1,
      type: 'id'
    },
{
      field: 'loggingStepId',
      headerName: t('LoggingStepIdLabel', 'Logging step ID'),
      flex: 1,
      type: 'id'
    }
];
export default columns;