import type {
  ICustomizedDetails,
  IMiscCharge,
  IOrder,
  IOrderInvoiceData,
  IOrderItemBase,
} from "../../../../../interfaces/order/order.model";

import { ADDITIONAL_SERVICE_CODE } from "../../../../../constants/global/global-key.const";
import type { IFrameType } from "../../../../../app/redux/master/frame-types/frame-types.slice";
import type { IGlassType } from "../../../../../app/redux/master/glass-types/glass-types.slice";
import type { IProductPrice } from "../../interface/product/product.model";

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
      : (item?.width || 0) * (item?.height || 0);
  };

  /**
   * Cost of one item calcuated here
   * @param item
   * @returns
   */
  customArtUnitPrice = (item: IOrderItemBase): number => {
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

export const calculateDiscountAmount = (price: IProductPrice): number => {
  const base = price.basePrice ?? 0;

  switch (price.discountType) {
    case "percentage": {
      const percent = price.discountPercentage ?? 0;
      return (base * percent) / 100; // money off
    }
    case "fixed": {
      // if your fixedDiscountedPrice means “final price after discount”:
      // return base - (price.fixedDiscountedPrice ?? base);
      // if it means “discount amount itself”:
      return price.fixedDiscountedPrice ?? 0;
    }
    default:
      return 0;
  }
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

  const mappedItems: IOrderItemBase[] = item.order.items.map(
    (orderItem, idx) => {
      // Common fields
      const base = {
        _id: orderItem?._id,
        productId: orderItem?.productId,
        productType: orderItem?.productType || "physical",
        name: orderItem?.name || `Item ${idx + 1}`,
        description: orderItem?.description || "",
        quantity: orderItem?.quantity || 1,
        unitPrice: orderItem?.unitPrice || 0,
        discountedQuantity: orderItem?.discountedQuantity || 0,
        discountAmount: orderItem?.discountAmount || 0,
        cancelledQty: orderItem?.cancelledQty || 0,
      };

      // Customized details
      const cd = orderItem.customizedDetails;
      if (orderItem.productType === "custom") {
        base.productId = base?._id;
        base.name = cd?.name || `Product ${idx + 1}`;
        base.description =
          cd?.description || `Product ${idx + 1}  is customized`;
      }

      return {
        ...base,
        customizedDetails: {
          name: base?.name,
          description: base?.description,
          width: cd?.width || 0,
          height: cd?.height || 0,
          frame: {
            type: cd?.frame?.type || "",
            color: cd?.frame?.color || "",
            width: cd?.frame?.width || 0,
            height: cd?.frame?.height || 0,
          },
          glass: {
            isEnabled: cd?.glass?.isEnabled || false,
            type: cd?.glass?.type || "",
            width: cd?.glass?.width || 0,
            height: cd?.glass?.height || 0,
          },
          additional: {
            varnish: cd?.additional?.varnish || false,
            lamination: cd?.additional?.lamination || false,
            routerCut: cd?.additional?.routerCut || false,
          },
          mounting: {
            isEnabled: cd?.mounting?.isEnabled || false,
            top: cd?.mounting?.top || 0,
            right: cd?.mounting?.right || 0,
            bottom: cd?.mounting?.bottom || 0,
            left: cd?.mounting?.left || 0,
            width: cd?.mounting?.width || 0,
            height: cd?.mounting?.height || 0,
          },
        },
      } as IOrderItemBase;
    }
  );

  const order: IOrderInvoiceData = {
    order: {
      orderCode: "", // Or generate code here
      customerName: item.order.customerName,
      customerId: item.order.customerId,
      handledBy: item.order.handledBy,
      createdAt: item.order.createdAt,
      likelyDateOfDelivery: item.order.likelyDateOfDelivery,
      invoiceId: item.order.invoiceId || null,
      note: "Fresh order",
      orderStatus: "placed",
      miscCharges: item.order.miscCharges,
      discountAmount: item.order.discountAmount,
      items: mappedItems,
    },
    invoice: {
      id: item.invoice.id,
      generateInvoice: true,
      billDate: item.invoice.billDate,
      billFrom: item.invoice.billFrom,
      billTo: item.invoice.billTo,
      orderIds: item.invoice.orderIds,
      balanceAmount: item.invoice.balanceAmount,
      createdAt: item.invoice.createdAt,
      paymentMode: item.invoice.paymentMode || "cash",
      paymentStatus: item.invoice.paymentStatus,
      totalAmount: item.invoice.totalAmount,
      advancePaid: item.invoice.advancePaid,
    },
  };

  return order;
};
