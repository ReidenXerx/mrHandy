/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InterfaceDocPostDTO } from '../models/InterfaceDocPostDTO';
import type { InterfacePoDistributionDTO } from '../models/InterfacePoDistributionDTO';
import type { InterfacePoHeaderDTO } from '../models/InterfacePoHeaderDTO';
import type { InterfacePoLineDTO } from '../models/InterfacePoLineDTO';
import type { InterfacePoLineLocationDTO } from '../models/InterfacePoLineLocationDTO';
import type { InterfacingRunDTO } from '../models/InterfacingRunDTO';
import type { SetupProfilesGetDTO } from '../models/SetupProfilesGetDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PoPurchaseOrderControllerService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param formData 
     * @returns InterfacingRunDTO OK
     * @throws ApiError
     */
    public importPoPurchaseOrderInterfaceDoc(
formData?: {
theFile: Blob;
interfaceDocPostDTO: InterfaceDocPostDTO;
},
): CancelablePromise<InterfacingRunDTO> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/interfacing/po-purchase-orders/file',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `{errorCode: "VALIDATION_FAILED", errorMessage: "Validation failed for field: {fieldName}"};<br>{errorCode: "ERROR_PROCESSING_FILE", errorMessage: "Error processing file."};<br>{errorCode: "INTERFACE_DOC_SETUP_PROFILE_DOES_NOT_EXIST", errorMessage: "Setup profile does not exist."};<br>`,
            },
        });
    }

    /**
     * @returns SetupProfilesGetDTO OK
     * @throws ApiError
     */
    public getPoPurchaseOrderLovProfiles(): CancelablePromise<Array<SetupProfilesGetDTO>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/interfacing/po-purchase-orders/setup-profiles',
        });
    }

    /**
     * @param runNumber 
     * @param interfaceLineLocationKey 
     * @returns InterfacePoDistributionDTO OK
     * @throws ApiError
     */
    public getPoPurchaseOrderLocationDistributions(
runNumber: number,
interfaceLineLocationKey: string,
): CancelablePromise<Array<InterfacePoDistributionDTO>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/interfacing/po-purchase-orders/runs/{runNumber}/locations/{interfaceLineLocationKey}/distributions',
            path: {
                'runNumber': runNumber,
                'interfaceLineLocationKey': interfaceLineLocationKey,
            },
        });
    }

    /**
     * @param runNumber 
     * @param interfaceLineKey 
     * @returns InterfacePoLineLocationDTO OK
     * @throws ApiError
     */
    public getPoPurchaseOrderLineLocations(
runNumber: number,
interfaceLineKey: string,
): CancelablePromise<Array<InterfacePoLineLocationDTO>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/interfacing/po-purchase-orders/runs/{runNumber}/lines/{interfaceLineKey}/locations',
            path: {
                'runNumber': runNumber,
                'interfaceLineKey': interfaceLineKey,
            },
        });
    }

    /**
     * @param runNumber 
     * @returns InterfacePoHeaderDTO OK
     * @throws ApiError
     */
    public getPoPurchaseOrderHeaders(
runNumber: number,
): CancelablePromise<Array<InterfacePoHeaderDTO>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/interfacing/po-purchase-orders/runs/{runNumber}/headers',
            path: {
                'runNumber': runNumber,
            },
        });
    }

    /**
     * @param runNumber 
     * @param interfaceHeaderKey 
     * @returns InterfacePoLineDTO OK
     * @throws ApiError
     */
    public getPoPurchaseOrderLines(
runNumber: number,
interfaceHeaderKey: string,
): CancelablePromise<Array<InterfacePoLineDTO>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/interfacing/po-purchase-orders/runs/{runNumber}/headers/{interfaceHeaderKey}/lines',
            path: {
                'runNumber': runNumber,
                'interfaceHeaderKey': interfaceHeaderKey,
            },
        });
    }

    /**
     * @param runNumber 
     * @returns string OK
     * @throws ApiError
     */
    public downloadPoPurchaseOrderInterfaceDoc(
runNumber: number,
): CancelablePromise<Array<string>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/interfacing/po-purchase-orders/file/{runNumber}',
            path: {
                'runNumber': runNumber,
            },
            errors: {
                404: `{errorCode: "INTERFACE_DOC_NOT_FOUND", errorMessage: "Interface doc not found."};<br>`,
            },
        });
    }

}
