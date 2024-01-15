
const useFetchPoPurchaseOrderHeaders = <Select = Array<InterfacePoHeaderDTO>(
  {runNumber}: { runNumber: number }
  options?: UseQueryOptions<Array<InterfacePoHeaderDTO, ErrorResponse, Select>
) => {
  const client = useRecoilValue(apiClient);
  if (!client) throw new Error('MISSING_CLIENT');

  return useQuery<Array<InterfacePoHeaderDTO, ErrorResponse, Select>(
    [PoPurchaseOrderQueries.PoPurchaseOrder, PoPurchaseOrderQueries.PoPurchaseOrderHeaders, 'fetch'],
    () => client.PoPurchaseOrderControllerService.getPoPurchaseOrderHeaders(runNumber),
    { cacheTime: HalfHourCacheDuration, ...options }
  );
};

export default useFetchPoPurchaseOrderHeaders;
