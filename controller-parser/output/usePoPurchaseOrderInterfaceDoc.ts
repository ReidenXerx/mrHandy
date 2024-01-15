
const usePoPurchaseOrderInterfaceDoc = () => {
  const client = useRecoilValue(apiClient);
  const queryClient = useQueryClient();
  if (!client) throw new Error('MISSING_CLIENT');

  return useMutation<InterfacingRunDTO, ApiError, number>(
    [PoPurchaseOrderQueries.PoPurchaseOrder, PoPurchaseOrderQueries.PoPurchaseOrderInterfaceDoc, 'update'],
    (formData: { theFile: Blob; interfaceDocPostDTO: InterfaceDocPostDTO; }) => client.PoPurchaseOrderControllerService.importPoPurchaseOrderInterfaceDoc(formData),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([PoPurchaseOrderQueries.PoPurchaseOrder, PoPurchaseOrderQueries.PoPurchaseOrderInterfaceDoc]);
        await queryClient.refetchQueries([PoPurchaseOrderQueries.PoPurchaseOrder', 'PoPurchaseOrderQueries.PoPurchaseOrderInterfaceDoc]);
      }
    }
  );
};

export default usePoPurchaseOrderInterfaceDoc;
