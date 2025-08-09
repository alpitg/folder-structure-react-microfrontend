import type {
  IArtDetail,
  IPlaceOrderPayload,
  ITotalCalculationInput,
  OrderItemIn,
} from "../../../interfaces/total-calculation.model";

import { ADDITIONAL_SERVICE_CODE } from "../../../constants/global/global-key.const";
import type { IFrameType } from "../../../app/features/master/frame-types/frame-types.slice";
import type { IGlassType } from "../../../app/features/master/glass-types/glass-types.slice";
import type { IMiscCharges } from "../../../app/features/master/misc-charges/misc-charges.slice";

export class BillCalculation {
  frameTypes: IFrameType[];
  glassTypes: IGlassType[] = [];
  miscCharges: IMiscCharges[] = [];

  constructor(
    frameTypes: IFrameType[],
    glassTypes: IGlassType[],
    miscCharges: IMiscCharges[]
  ) {
    this.frameTypes = frameTypes;
    this.glassTypes = glassTypes;
    this.miscCharges = miscCharges;
  }

  chargableWidth = (item: IArtDetail) => {
    const width = item?.width || 0;
    const mountingLeft = item?.mounting?.left || 0;
    const mountingRight = item?.mounting?.right || 0;
    return width + mountingLeft + mountingRight;
  };

  chargableHeight = (item: IArtDetail) => {
    const height = item?.height || 0;
    const mountingTop = item?.mounting?.top || 0;
    const mountingBottom = item?.mounting?.bottom || 0;
    return height + mountingTop + mountingBottom;
  };

  totalItemArea = (item: IArtDetail) => {
    return item?.mounting?.isEnabled
      ? this.chargableWidth(item) * this.chargableHeight(item)
      : (item.width || 0) * item.height || 0;
  };

  /**
   * Cost of one item calcuated here
   * @param item
   * @returns
   */
  unitCost = (item: IArtDetail): number => {
    // Calculate area with mounting if enabled
    const area = this.totalItemArea(item);

    // const frame = item.frame.type
    //   ? frameTypes.find((frame) => frame.name === item.frame.type)
    //   : null;
    // const frameWidth = chargableWidth(item);
    // const frameHeight = chargableHeight(item);
    // const frameRate = frame ? frame.baseCost || 0 : 0;
    // const frameCostPerInch = frameRate / (frameWidth * frameHeight);

    // Calculate frame cost per inch
    const frameCostPerInch =
      this.frameTypes.find((frame) => frame?.name === item?.frame?.type)
        ?.baseCost || 0;

    // Calculate total frame cost based on area
    const totalFrameCost = frameCostPerInch;

    // Calculate glass cost
    const glassCost = item?.glass?.isEnabled
      ? this.glassTypes.find((glass) => glass.name === item?.glass?.type)
          ?.rate || 0
      : 0;

    // Calculate varnish cost
    const varnishCost = item?.additional?.varnish
      ? this.miscCharges.find((x) => x.code === ADDITIONAL_SERVICE_CODE.varnish)
          ?.cost || 0
      : 0;

    // Calculate routerCut cost
    const routerCutCost = item?.additional?.routerCut
      ? this.miscCharges.find(
          (x) => x.code === ADDITIONAL_SERVICE_CODE.mdf_router_cutting
        )?.cost || 0
      : 0;

    // Calculate lamination cost
    const laminationCost = item?.additional?.lamination
      ? this.miscCharges.find(
          (x) => x.code === ADDITIONAL_SERVICE_CODE.lamination
        )?.cost || 0
      : 0;

    // Calculate additional costs
    const additionalCosts = varnishCost + laminationCost + routerCutCost;

    return (
      parseFloat(
        (area * glassCost + totalFrameCost + additionalCosts).toFixed(2)
      ) || 0
    );
  };
}

export const mapOrderForApi = (
  item: ITotalCalculationInput
): IPlaceOrderPayload | null => {
  if (
    !item ||
    !item?.customerName ||
    !item?.artDetails ||
    item?.artDetails?.length === 0
  ) {
    return null;
  }

  let order: IPlaceOrderPayload = {
    order: {
      customerName: item?.customerName,
      customerId: item?.customerName,
      advancePayment: item?.advancePayment,
      miscCharges: item?.miscCharges,
      paymentMode: item?.invoice?.paymentMode,
      paymentStatus: item?.invoice?.paymentStatus,
      handledBy: item?.invoice?.handledBy,
      createdAt: item?.createdAt,
      likelyDateOfDelivery: item?.likelyDateOfDelivery,
      note: "Fresh order",
      items: item?.artDetails?.map(
        (art, idX) =>
          ({
            // productId: ,
            quantity: art?.quantity || 1,
            unitPrice: art?.unitPrice || 0, // TODO: calculate unit price later
            discountedQuantity: 0, // NOTE: Look for thie later
            discountAmount: item?.discountAmount || 0,
            customizedDetails: {
              name: art?.artName || `"Art ${idX + 1}"}`,
              description: art?.artDescription || "",
              width: art?.width || 0,
              height: art?.height || 0,
              frame: {
                type: art?.frame?.type || "",
                color: art?.frame?.color || "",
                width: art?.frame?.width || 0,
                height: art?.frame?.height || 0,
              },
              glass: {
                type: art?.glass?.type || "",
                isEnabled: art?.glass?.isEnabled || false,
              },
              additional: {
                varnish: art?.additional?.varnish || false,
                lamination: art?.additional?.lamination || false,
                routerCut: art?.additional?.routerCut || false,
              },
              mounting: {
                isEnabled: art?.mounting?.isEnabled || false,
                top: art?.mounting?.top || 0,
                right: art?.mounting?.right || 0,
                bottom: art?.mounting?.bottom || 0,
                left: art?.mounting?.left || 0,
              },
            },
          } as OrderItemIn)
      ),
      // invoiceId: null
    },
    invoice: {
      generateInvoice: true,
      billDate: item?.invoice?.billDate,
      billFrom: item?.invoice?.billFrom,
      billTo: item?.invoice?.billTo,
      paymentMode: item?.invoice?.paymentMode,
      paymentStatus: item?.invoice?.paymentStatus,
    },
  };

  return order;
};
