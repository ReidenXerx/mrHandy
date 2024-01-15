
const useFetchPoPurchaseOrderLines = <Select = Array<InterfacePoLineDTO>(
  {runNumber, interfaceHeaderKey}: { runNumber: number, interfaceHeaderKey: string }
  options?: UseQueryOptions<Array<InterfacePoLineDTO, ErrorResponse, Select>
) => {
  const client = useRecoilValue(apiClient);
  if (!client) throw new Error('MISSING_CLIENT');

  return useQuery<Array<InterfacePoLineDTO, ErrorResponse, Select>(
    [PoPurchaseOrderQueries.PoPurchaseOrder, PoPurchaseOrderQueries.PoPurchaseOrderLines, 'fetch'],
    () => client.PoPurchaseOrderControllerService.getPoPurchaseOrderLines(runNumber, interfaceHeaderKey),
    { cacheTime: HalfHourCacheDuration, ...options }
  );
};

export default useFetchPoPurchaseOrderLines;
