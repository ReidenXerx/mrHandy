
const useFetchPoPurchaseOrderLovProfiles = <Select = Array<SetupProfilesGetDTO>(
  {}: {  }
  options?: UseQueryOptions<Array<SetupProfilesGetDTO, ErrorResponse, Select>
) => {
  const client = useRecoilValue(apiClient);
  if (!client) throw new Error('MISSING_CLIENT');

  return useQuery<Array<SetupProfilesGetDTO, ErrorResponse, Select>(
    [PoPurchaseOrderQueries.PoPurchaseOrder, PoPurchaseOrderQueries.PoPurchaseOrderLovProfiles, 'fetch'],
    () => client.PoPurchaseOrderControllerService.getPoPurchaseOrderLovProfiles(),
    { cacheTime: HalfHourCacheDuration, ...options }
  );
};

export default useFetchPoPurchaseOrderLovProfiles;
