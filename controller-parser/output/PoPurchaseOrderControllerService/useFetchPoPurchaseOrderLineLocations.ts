
const useFetchPoPurchaseOrderLineLocations = <Select = Array<InterfacePoLineLocationDTO>(
  {runNumber, interfaceLineKey}: { runNumber: number, interfaceLineKey: string }
  options?: UseQueryOptions<Array<InterfacePoLineLocationDTO, ErrorResponse, Select>
) => {
  const client = useRecoilValue(apiClient);
  if (!client) throw new Error('MISSING_CLIENT');

  return useQuery<Array<InterfacePoLineLocationDTO, ErrorResponse, Select>(
    [PoPurchaseOrderQueries.PoPurchaseOrder, PoPurchaseOrderQueries.PoPurchaseOrderLineLocations, 'fetch'],
    () => client.PoPurchaseOrderControllerService.getPoPurchaseOrderLineLocations(runNumber, interfaceLineKey),
    { cacheTime: HalfHourCacheDuration, ...options }
  );
};

export default useFetchPoPurchaseOrderLineLocations;
