import type {
  ICustomizedDetails,
  IMiscCharge,
  IOrder,
  IOrderInvoiceData,
  IOrderItem,
  PaymentStatusType,
} from "../../../interfaces/order/order.model";

import { ADDITIONAL_SERVICE_CODE } from "../../../constants/global/global-key.const";
import type { IFrameType } from "../../../app/features/master/frame-types/frame-types.slice";
import type { IGlassType } from "../../../app/features/master/glass-types/glass-types.slice";

export class BillCalculation {
  frameTypes: IFrameType[];
  glassTypes: IGlassType[] = [];
  miscCharges: IMiscCharge[] = [];

  constructor(
    frameTypes: IFrameType[],
    glassTypes: IGlassType[],
    miscCharges: IMiscCharge[]
  ) {
    this.frameTypes = frameTypes;
    this.glassTypes = glassTypes;
    this.miscCharges = miscCharges;
  }

  chargableWidth = (item: ICustomizedDetails) => {
    const width = item?.width || 0;
    const mountingLeft = item?.mounting?.left || 0;
    const mountingRight = item?.mounting?.right || 0;
    return width + mountingLeft + mountingRight;
  };

  chargableHeight = (item: ICustomizedDetails) => {
    const height = item?.height || 0;
    const mountingTop = item?.mounting?.top || 0;
    const mountingBottom = item?.mounting?.bottom || 0;
    return height + mountingTop + mountingBottom;
  };

  totalItemArea = (item: ICustomizedDetails) => {
    return item?.mounting?.isEnabled
      ? this.chargableWidth(item) * this.chargableHeight(item)
      : (item?.width || 0) * item?.height || 0;
  };

  /**
   * Cost of one item calcuated here
   * @param item
   * @returns
   */
  unitPrice = (item: IOrderItem): number => {
    // Calculate area with mounting if enabled
    const area = this.totalItemArea(item?.customizedDetails);

    // const frame = item.frame.type
    //   ? frameTypes.find((frame) => frame.name === item.frame.type)
    //   : null;
    // const frameWidth = chargableWidth(item);
    // const frameHeight = chargableHeight(item);
    // const frameRate = frame ? frame.baseCost || 0 : 0;
    // const frameCostPerInch = frameRate / (frameWidth * frameHeight);

    // Calculate frame cost per inch
    const frameCostPerInch =
      this.frameTypes.find(
        (frame) => frame?.name === item?.customizedDetails?.frame?.type
      )?.baseCost || 0;

    // Calculate total frame cost based on area
    const totalFrameCost = frameCostPerInch;

    // Calculate glass cost
    const glassCost = item?.customizedDetails?.glass?.isEnabled
      ? this.glassTypes.find(
          (glass) => glass.name === item?.customizedDetails?.glass?.type
        )?.rate || 0
      : 0;

    // Calculate varnish cost
    const varnishCost = item?.customizedDetails?.additional?.varnish
      ? this.miscCharges.find((x) => x.code === ADDITIONAL_SERVICE_CODE.varnish)
          ?.amount || 0
      : 0;

    // Calculate routerCut cost
    const routerCutCost = item?.customizedDetails?.additional?.routerCut
      ? this.miscCharges.find(
          (x) => x.code === ADDITIONAL_SERVICE_CODE.mdf_router_cutting
        )?.amount || 0
      : 0;

    // Calculate lamination cost
    const laminationCost = item?.customizedDetails?.additional?.lamination
      ? this.miscCharges.find(
          (x) => x.code === ADDITIONAL_SERVICE_CODE.lamination
        )?.amount || 0
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

export const calculateTotalAmount = (order: IOrder): number => {
  if (!order) 0;

  return (
    order?.items?.reduce(
      (cost, item) => cost + item?.unitPrice * item?.quantity,
      0
    ) || 0
  );
};

export const mapOrderForApi = (
  item: IOrderInvoiceData
): IOrderInvoiceData | null => {
  if (
    !item ||
    !item?.order?.customerName ||
    !item?.order?.items ||
    item?.order?.items?.length === 0
  ) {
    return null;
  }

  const defaultPaymentStatus: PaymentStatusType = "pending";

  let order: IOrderInvoiceData = {
    order: {
      orderCode: "",
      customerName: item?.order?.customerName,
      customerId: item?.order?.customerName,
      handledBy: item?.order?.handledBy,
      createdAt: item?.order?.createdAt,
      likelyDateOfDelivery: item?.order?.likelyDateOfDelivery,
      invoiceId: item?.order?.invoiceId || null,
      note: "Fresh order",
      orderStatus: "placed",
      miscCharges: item?.order?.miscCharges,
      discountAmount: item?.order?.discountAmount,

      items: item?.order?.items?.map(
        (product, idX) =>
          ({
            productId: product?.productId || null,
            quantity: product?.quantity || 1,
            unitPrice: product?.unitPrice || 0,
            discountedQuantity: 0, // NOTE: Look for this later
            discountAmount: product?.discountAmount || 0,
            customizedDetails: {
              name: product?.customizedDetails?.name || `"Art ${idX + 1}"}`,
              description: product?.customizedDetails?.description || "",
              width: product?.customizedDetails?.width || 0,
              height: product?.customizedDetails?.height || 0,
              frame: {
                type: product?.customizedDetails?.frame?.type || "",
                color: product?.customizedDetails?.frame?.color || "",
                width: product?.customizedDetails?.frame?.width || 0,
                height: product?.customizedDetails?.frame?.height || 0,
              },
              glass: {
                type: product?.customizedDetails?.glass?.type || "",
                isEnabled:
                  product?.customizedDetails?.glass?.isEnabled || false,
              },
              additional: {
                varnish:
                  product?.customizedDetails?.additional?.varnish || false,
                lamination:
                  product?.customizedDetails?.additional?.lamination || false,
                routerCut:
                  product?.customizedDetails?.additional?.routerCut || false,
              },
              mounting: {
                isEnabled:
                  product?.customizedDetails?.mounting?.isEnabled || false,
                top: product?.customizedDetails?.mounting?.top || 0,
                right: product?.customizedDetails?.mounting?.right || 0,
                bottom: product?.customizedDetails?.mounting?.bottom || 0,
                left: product?.customizedDetails?.mounting?.left || 0,
              },
            },
          } as IOrderItem)
      ),
    },
    invoice: {
      id: item?.invoice?.id,
      generateInvoice: true, // item?.invoice?.generateInvoice,
      billDate: item?.invoice?.billDate,
      billFrom: item?.invoice?.billFrom,
      billTo: item?.invoice?.billTo,
      orderIds: item?.invoice?.orderIds,
      balanceAmount: item?.invoice?.balanceAmount,
      createdAt: item?.invoice?.createdAt,
      paymentMode: item?.invoice?.paymentMode || defaultPaymentStatus,
      paymentStatus: item?.invoice?.paymentStatus,
      totalAmount: item?.invoice?.totalAmount,
      advancePaid: item?.invoice?.advancePaid,
    },
  };

  return order;
};
