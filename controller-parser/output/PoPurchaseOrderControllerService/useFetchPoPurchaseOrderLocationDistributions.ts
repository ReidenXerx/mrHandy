
const useFetchPoPurchaseOrderLocationDistributions = <Select = Array<InterfacePoDistributionDTO>(
  {runNumber, interfaceLineLocationKey}: { runNumber: number, interfaceLineLocationKey: string }
  options?: UseQueryOptions<Array<InterfacePoDistributionDTO, ErrorResponse, Select>
) => {
  const client = useRecoilValue(apiClient);
  if (!client) throw new Error('MISSING_CLIENT');

  return useQuery<Array<InterfacePoDistributionDTO, ErrorResponse, Select>(
    [PoPurchaseOrderQueries.PoPurchaseOrder, PoPurchaseOrderQueries.PoPurchaseOrderLocationDistributions, 'fetch'],
    () => client.PoPurchaseOrderControllerService.getPoPurchaseOrderLocationDistributions(runNumber, interfaceLineLocationKey),
    { cacheTime: HalfHourCacheDuration, ...options }
  );
};

export default useFetchPoPurchaseOrderLocationDistributions;
