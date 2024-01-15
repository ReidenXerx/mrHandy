const columns = [
{
            field: 'runNumber',
            headerName: t('RunNumberLabel', 'Run number'),
            flex: 1,
            type: 'number'
          },
commonColumns.instanceId,
{
            field: 'rowNumber',
            headerName: t('RowNumberLabel', 'Row number'),
            flex: 1,
            type: 'number'
          },
{
            field: 'errorMessage',
            headerName: t('ErrorMessageLabel', 'Error message'),
            flex: 1,
            type: 'string'
          },
{
            field: 'importAction',
            headerName: t('ImportActionLabel', 'Import action'),
            flex: 1,
            type: 'string'
          },
{
            field: 'action',
            headerName: t('ActionLabel', 'Action'),
            flex: 1,
            type: 'string'
          },
{
            field: 'recordType',
            headerName: t('RecordTypeLabel', 'Record type'),
            flex: 1,
            type: 'string'
          },
{
            field: 'interfaceHeaderKey',
            headerName: t('InterfaceHeaderKeyLabel', 'Interface header key'),
            flex: 1,
            type: 'string'
          },
{
            field: 'batchId',
            headerName: t('BatchIdLabel', 'Batch ID'),
            flex: 1,
            type: 'id'
          },
{
            field: 'interfaceSourceCode',
            headerName: t('InterfaceSourceCodeLabel', 'Interface source code'),
            flex: 1,
            type: 'string'
          },
{
            field: 'approvalAction',
            headerName: t('ApprovalActionLabel', 'Approval action'),
            flex: 1,
            type: 'string'
          },
{
            field: 'documentNum',
            headerName: t('DocumentNumLabel', 'Document num'),
            flex: 1,
            type: 'string'
          },
{
            field: 'documentTypeCode',
            headerName: t('DocumentTypeCodeLabel', 'Document type code'),
            flex: 1,
            type: 'string'
          },
{
            field: 'styleDisplayName',
            headerName: t('StyleDisplayNameLabel', 'Style display name'),
            flex: 1,
            type: 'string'
          },
{
            field: 'prcBuName',
            headerName: t('PrcBuNameLabel', 'Prc bu name'),
            flex: 1,
            type: 'string'
          },
{
            field: 'reqBuName',
            headerName: t('ReqBuNameLabel', 'Req bu name'),
            flex: 1,
            type: 'string'
          },
{
            field: 'soldtoLeName',
            headerName: t('SoldtoLeNameLabel', 'Soldto le name'),
            flex: 1,
            type: 'string'
          },
{
            field: 'billtoBuName',
            headerName: t('BilltoBuNameLabel', 'Billto bu name'),
            flex: 1,
            type: 'string'
          },
{
            field: 'agentName',
            headerName: t('AgentNameLabel', 'Agent name'),
            flex: 1,
            type: 'string'
          },
{
            field: 'currencyCode',
            headerName: t('CurrencyCodeLabel', 'Currency code'),
            flex: 1,
            type: 'string'
          },
{
            field: 'rate',
            headerName: t('RateLabel', 'Rate'),
            flex: 1,
            type: 'string'
          },
{
            field: 'rateType',
            headerName: t('RateTypeLabel', 'Rate type'),
            flex: 1,
            type: 'string'
          },
{
            field: 'rateDate',
            headerName: t('RateDateLabel', 'Rate date'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'comments',
            headerName: t('CommentsLabel', 'Comments'),
            flex: 1,
            type: 'string'
          },
{
            field: 'billToLocation',
            headerName: t('BillToLocationLabel', 'Bill to location'),
            flex: 1,
            type: 'string'
          },
{
            field: 'shipToLocation',
            headerName: t('ShipToLocationLabel', 'Ship to location'),
            flex: 1,
            type: 'string'
          },
{
            field: 'vendorName',
            headerName: t('VendorNameLabel', 'Vendor name'),
            flex: 1,
            type: 'string'
          },
{
            field: 'vendorNum',
            headerName: t('VendorNumLabel', 'Vendor num'),
            flex: 1,
            type: 'string'
          },
{
            field: 'vendorSiteCode',
            headerName: t('VendorSiteCodeLabel', 'Vendor site code'),
            flex: 1,
            type: 'string'
          },
{
            field: 'vendorContact',
            headerName: t('VendorContactLabel', 'Vendor contact'),
            flex: 1,
            type: 'string'
          },
{
            field: 'vendorDocNum',
            headerName: t('VendorDocNumLabel', 'Vendor doc num'),
            flex: 1,
            type: 'string'
          },
{
            field: 'fob',
            headerName: t('FobLabel', 'Fob'),
            flex: 1,
            type: 'string'
          },
{
            field: 'freightCarrier',
            headerName: t('FreightCarrierLabel', 'Freight carrier'),
            flex: 1,
            type: 'string'
          },
{
            field: 'freightTerms',
            headerName: t('FreightTermsLabel', 'Freight terms'),
            flex: 1,
            type: 'string'
          },
{
            field: 'payOnCode',
            headerName: t('PayOnCodeLabel', 'Pay on code'),
            flex: 1,
            type: 'string'
          },
{
            field: 'paymentTerms',
            headerName: t('PaymentTermsLabel', 'Payment terms'),
            flex: 1,
            type: 'string'
          },
{
            field: 'originatorRole',
            headerName: t('OriginatorRoleLabel', 'Originator role'),
            flex: 1,
            type: 'string'
          },
{
            field: 'changeOrderDesc',
            headerName: t('ChangeOrderDescLabel', 'Change order desc'),
            flex: 1,
            type: 'string'
          },
{
            field: 'acceptanceRequiredFlag',
            headerName: t('AcceptanceRequiredFlagLabel', 'Acceptance required flag'),
            flex: 1,
            type: 'boolean'
          },
{
            field: 'acceptanceWithinDays',
            headerName: t('AcceptanceWithinDaysLabel', 'Acceptance within days'),
            flex: 1,
            type: 'number'
          },
{
            field: 'supplierNotifMethod',
            headerName: t('SupplierNotifMethodLabel', 'Supplier notif method'),
            flex: 1,
            type: 'string'
          },
{
            field: 'fax',
            headerName: t('FaxLabel', 'Fax'),
            flex: 1,
            type: 'string'
          },
{
            field: 'emailAddress',
            headerName: t('EmailAddressLabel', 'Email address'),
            flex: 1,
            type: 'string'
          },
{
            field: 'confirmingOrderFlag',
            headerName: t('ConfirmingOrderFlagLabel', 'Confirming order flag'),
            flex: 1,
            type: 'boolean'
          },
{
            field: 'amountAgreed',
            headerName: t('AmountAgreedLabel', 'Amount agreed'),
            flex: 1,
            type: 'string'
          },
{
            field: 'amountLimit',
            headerName: t('AmountLimitLabel', 'Amount limit'),
            flex: 1,
            type: 'string'
          },
{
            field: 'minReleaseAmount',
            headerName: t('MinReleaseAmountLabel', 'Min release amount'),
            flex: 1,
            type: 'string'
          },
{
            field: 'effectiveDate',
            headerName: t('EffectiveDateLabel', 'Effective date'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'expirationDate',
            headerName: t('ExpirationDateLabel', 'Expiration date'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'noteToVendor',
            headerName: t('NoteToVendorLabel', 'Note to vendor'),
            flex: 1,
            type: 'string'
          },
{
            field: 'noteToReceiver',
            headerName: t('NoteToReceiverLabel', 'Note to receiver'),
            flex: 1,
            type: 'string'
          },
{
            field: 'generateOrdersAutomatic',
            headerName: t('GenerateOrdersAutomaticLabel', 'Generate orders automatic'),
            flex: 1,
            type: 'boolean'
          },
{
            field: 'submitApprovalAutomatic',
            headerName: t('SubmitApprovalAutomaticLabel', 'Submit approval automatic'),
            flex: 1,
            type: 'boolean'
          },
{
            field: 'groupRequisitions',
            headerName: t('GroupRequisitionsLabel', 'Group requisitions'),
            flex: 1,
            type: 'boolean'
          },
{
            field: 'groupRequisitionLines',
            headerName: t('GroupRequisitionLinesLabel', 'Group requisition lines'),
            flex: 1,
            type: 'boolean'
          },
{
            field: 'useShipTo',
            headerName: t('UseShipToLabel', 'Use ship to'),
            flex: 1,
            type: 'boolean'
          },
{
            field: 'useNeedByDate',
            headerName: t('UseNeedByDateLabel', 'Use need by date'),
            flex: 1,
            type: 'boolean'
          },
{
            field: 'catAdminAuthEnabledFlag',
            headerName: t('CatAdminAuthEnabledFlagLabel', 'Cat admin auth enabled flag'),
            flex: 1,
            type: 'boolean'
          },
{
            field: 'retroPriceApplyUpdatesFlag',
            headerName: t('RetroPriceApplyUpdatesFlagLabel', 'Retro price apply updates flag'),
            flex: 1,
            type: 'boolean'
          },
{
            field: 'retroPriceCommUpdatesFlag',
            headerName: t('RetroPriceCommUpdatesFlagLabel', 'Retro price comm updates flag'),
            flex: 1,
            type: 'boolean'
          },
{
            field: 'defautTaxationCountry',
            headerName: t('DefautTaxationCountryLabel', 'Defaut taxation country'),
            flex: 1,
            type: 'string'
          },
{
            field: 'taxDocumentSubtype',
            headerName: t('TaxDocumentSubtypeLabel', 'Tax document subtype'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attributeCategory',
            headerName: t('AttributeCategoryLabel', 'Attribute category'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attribute1',
            headerName: t('Attribute1Label', 'Attribute 1'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attribute2',
            headerName: t('Attribute2Label', 'Attribute 2'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attribute3',
            headerName: t('Attribute3Label', 'Attribute 3'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attribute4',
            headerName: t('Attribute4Label', 'Attribute 4'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attribute5',
            headerName: t('Attribute5Label', 'Attribute 5'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attribute6',
            headerName: t('Attribute6Label', 'Attribute 6'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attribute7',
            headerName: t('Attribute7Label', 'Attribute 7'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attribute8',
            headerName: t('Attribute8Label', 'Attribute 8'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attribute9',
            headerName: t('Attribute9Label', 'Attribute 9'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attribute10',
            headerName: t('Attribute10Label', 'Attribute 10'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attribute11',
            headerName: t('Attribute11Label', 'Attribute 11'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attribute12',
            headerName: t('Attribute12Label', 'Attribute 12'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attribute13',
            headerName: t('Attribute13Label', 'Attribute 13'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attribute14',
            headerName: t('Attribute14Label', 'Attribute 14'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attribute15',
            headerName: t('Attribute15Label', 'Attribute 15'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attribute16',
            headerName: t('Attribute16Label', 'Attribute 16'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attribute17',
            headerName: t('Attribute17Label', 'Attribute 17'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attribute18',
            headerName: t('Attribute18Label', 'Attribute 18'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attribute19',
            headerName: t('Attribute19Label', 'Attribute 19'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attribute20',
            headerName: t('Attribute20Label', 'Attribute 20'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attributeDate1',
            headerName: t('AttributeDate1Label', 'Attribute date 1'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'attributeDate2',
            headerName: t('AttributeDate2Label', 'Attribute date 2'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'attributeDate3',
            headerName: t('AttributeDate3Label', 'Attribute date 3'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'attributeDate4',
            headerName: t('AttributeDate4Label', 'Attribute date 4'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'attributeDate5',
            headerName: t('AttributeDate5Label', 'Attribute date 5'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'attributeDate6',
            headerName: t('AttributeDate6Label', 'Attribute date 6'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'attributeDate7',
            headerName: t('AttributeDate7Label', 'Attribute date 7'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'attributeDate8',
            headerName: t('AttributeDate8Label', 'Attribute date 8'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'attributeDate9',
            headerName: t('AttributeDate9Label', 'Attribute date 9'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'attributeDate10',
            headerName: t('AttributeDate10Label', 'Attribute date 10'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'attributeNumber1',
            headerName: t('AttributeNumber1Label', 'Attribute number 1'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attributeNumber2',
            headerName: t('AttributeNumber2Label', 'Attribute number 2'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attributeNumber3',
            headerName: t('AttributeNumber3Label', 'Attribute number 3'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attributeNumber4',
            headerName: t('AttributeNumber4Label', 'Attribute number 4'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attributeNumber5',
            headerName: t('AttributeNumber5Label', 'Attribute number 5'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attributeNumber6',
            headerName: t('AttributeNumber6Label', 'Attribute number 6'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attributeNumber7',
            headerName: t('AttributeNumber7Label', 'Attribute number 7'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attributeNumber8',
            headerName: t('AttributeNumber8Label', 'Attribute number 8'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attributeNumber9',
            headerName: t('AttributeNumber9Label', 'Attribute number 9'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attributeNumber10',
            headerName: t('AttributeNumber10Label', 'Attribute number 10'),
            flex: 1,
            type: 'string'
          },
{
            field: 'attributeTimestamp1',
            headerName: t('AttributeTimestamp1Label', 'Attribute timestamp 1'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'attributeTimestamp2',
            headerName: t('AttributeTimestamp2Label', 'Attribute timestamp 2'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'attributeTimestamp3',
            headerName: t('AttributeTimestamp3Label', 'Attribute timestamp 3'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'attributeTimestamp4',
            headerName: t('AttributeTimestamp4Label', 'Attribute timestamp 4'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'attributeTimestamp5',
            headerName: t('AttributeTimestamp5Label', 'Attribute timestamp 5'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'attributeTimestamp6',
            headerName: t('AttributeTimestamp6Label', 'Attribute timestamp 6'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'attributeTimestamp7',
            headerName: t('AttributeTimestamp7Label', 'Attribute timestamp 7'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'attributeTimestamp8',
            headerName: t('AttributeTimestamp8Label', 'Attribute timestamp 8'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'attributeTimestamp9',
            headerName: t('AttributeTimestamp9Label', 'Attribute timestamp 9'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'attributeTimestamp10',
            headerName: t('AttributeTimestamp10Label', 'Attribute timestamp 10'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'agentEmailAddress',
            headerName: t('AgentEmailAddressLabel', 'Agent email address'),
            flex: 1,
            type: 'string'
          },
{
            field: 'modeOfTransport',
            headerName: t('ModeOfTransportLabel', 'Mode of transport'),
            flex: 1,
            type: 'string'
          },
{
            field: 'serviceLevel',
            headerName: t('ServiceLevelLabel', 'Service level'),
            flex: 1,
            type: 'string'
          },
{
            field: 'agingPeriodDays',
            headerName: t('AgingPeriodDaysLabel', 'Aging period days'),
            flex: 1,
            type: 'number'
          },
{
            field: 'agingOnsetPoint',
            headerName: t('AgingOnsetPointLabel', 'Aging onset point'),
            flex: 1,
            type: 'string'
          },
{
            field: 'consumptionAdviceFrequency',
            headerName: t('ConsumptionAdviceFrequencyLabel', 'Consumption advice frequency'),
            flex: 1,
            type: 'string'
          },
{
            field: 'consumptionAdviceSummary',
            headerName: t('ConsumptionAdviceSummaryLabel', 'Consumption advice summary'),
            flex: 1,
            type: 'string'
          },
{
            field: 'defaultConsignmentLineFlag',
            headerName: t('DefaultConsignmentLineFlagLabel', 'Default consignment line flag'),
            flex: 1,
            type: 'boolean'
          },
{
            field: 'payOnUseFlag',
            headerName: t('PayOnUseFlagLabel', 'Pay on use flag'),
            flex: 1,
            type: 'boolean'
          },
{
            field: 'billingCycleClosingDate',
            headerName: t('BillingCycleClosingDateLabel', 'Billing cycle closing date'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
{
            field: 'configuredItemFlag',
            headerName: t('ConfiguredItemFlagLabel', 'Configured item flag'),
            flex: 1,
            type: 'boolean'
          },
{
            field: 'firstPtyRegNum',
            headerName: t('FirstPtyRegNumLabel', 'First pty reg num'),
            flex: 1,
            type: 'string'
          },
{
            field: 'thirdPtyRegNum',
            headerName: t('ThirdPtyRegNumLabel', 'Third pty reg num'),
            flex: 1,
            type: 'string'
          },
{
            field: 'useSalesOrderNumberFlag',
            headerName: t('UseSalesOrderNumberFlagLabel', 'Use sales order number flag'),
            flex: 1,
            type: 'boolean'
          },
{
            field: 'buyerManagedTransportFlag',
            headerName: t('BuyerManagedTransportFlagLabel', 'Buyer managed transport flag'),
            flex: 1,
            type: 'boolean'
          },
{
            field: 'outsideProcessEnabledFlag',
            headerName: t('OutsideProcessEnabledFlagLabel', 'OutsIDe process enabled flag'),
            flex: 1,
            type: 'id'
          },
{
            field: 'sourceAgreementNumber',
            headerName: t('SourceAgreementNumberLabel', 'Source agreement number'),
            flex: 1,
            type: 'number'
          },
{
            field: 'oracleHeaderId',
            headerName: t('OracleHeaderIdLabel', 'Oracle header ID'),
            flex: 1,
            type: 'id'
          },
{
            field: 'oraclePoStatus',
            headerName: t('OraclePoStatusLabel', 'Oracle po status'),
            flex: 1,
            type: 'string'
          },
{
            field: 'lastUpdateDate',
            headerName: t('LastUpdateDateLabel', 'Last update date'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
commonColumns.lastUpdatedBy,
{
            field: 'creationDate',
            headerName: t('CreationDateLabel', 'Creation date'),
            flex: 1,
            type: 'dateTime'
            valueGetter: (d: GridValueGetterParams<any, string>) => parseISO(d.value ?? ''),
            valueFormatter: (d: GridValueFormatterParams<Date>) => fDateTime(d.value)
          },
commonColumns.createdBy,
{
            field: 'oracleOrderNumber',
            headerName: t('OracleOrderNumberLabel', 'Oracle order number'),
            flex: 1,
            type: 'string'
          }
];
export default columns;