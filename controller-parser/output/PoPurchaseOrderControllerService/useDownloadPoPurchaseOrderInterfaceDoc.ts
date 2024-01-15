
const useDownloadPoPurchaseOrderInterfaceDoc = ({runNumber}: { runNumber: number }) => {
  const client = useRecoilValue(apiClient);
  if (!client) throw new Error('MISSING_CLIENT');

  return useMutation<Blob, ApiError, number>(
    [PoPurchaseOrderQueries.PoPurchaseOrder, PoPurchaseOrderQueries.PoPurchaseOrderInterfaceDoc, 'download'],
    async () => {
      const data = await client.PoPurchaseOrderControllerService.downloadPoPurchaseOrderInterfaceDoc(runNumber);
      return new Blob(data);
    }
  );
};

export default useDownloadPoPurchaseOrderInterfaceDoc;
