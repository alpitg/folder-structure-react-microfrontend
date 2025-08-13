//#region Master interfaces

export type PaymentStatusType = "pending" | "paid" | "failed" | "refunded";

export interface IAdditionalServices {
  varnish: boolean;
  lamination: boolean;
  routerCut: boolean;
}

export interface IMiscCharge {
  id?: string;
  code?: string;
  label?: string;
  amount?: number;
  description?: string;
}

export interface CustomizedDetails {
  name: string;
  description: string;
  width: number;
  height: number;
  frame?: IFrame;
  glass?: IGlass;
  mounting?: IMounting;
  additional?: AdditionalServices;
}

export interface IBillParty {
  name?: string;
  detail?: string;
  phone?: string;
}

export interface IFrame {
  type: string;
  color?: string;
  width?: number;
  height?: number;
}

export interface IGlass {
  isEnabled: boolean;
  type?: string;
  width?: number;
  height?: number;
}

export interface IMounting {
  isEnabled: boolean;
  top: number;
  right: number;
  bottom: number;
  left: number;
  width?: number;
  height?: number;
}

export interface IAdditionalServices {
  varnish: boolean;
  lamination: boolean;
  routerCut: boolean;
}

export interface ICustomizedDetails {
  name: string;
  description?: string;
  width: number;
  height: number;
  frame: IFrame;
  glass: IGlass;
  mounting: IMounting;
  additional: IAdditionalServices;
}

export interface IOrderItem {
  /**
   * NOTE: Only for frontend to maintain dynamic id.
   */
  _id: string;
  productId?: string;
  quantity: number;
  unitPrice: number;
  /**
   * @ignore This for future implementation.
   * @description We can provide offers like - buy one get one.
   */
  discountedQuantity: number;
  /**
   * Discount per item - Discount is provided per item here.
   */
  discountAmount: number;
  cancelledQty: number;
  customizedDetails: ICustomizedDetails;
}

/**
  | Field               | Belongs To | Why                                            |
  | ------------------- | ---------- | ---------------------------------------------- |
  | **Discount**        | `Order`    | Pricing logic at time of order placement       |
  | **Advance Payment** | `Invoice`  | Payment transaction info, affects balance owed |
 */
export interface IOrder {
  id?: string;
  orderCode: string;
  customerName: string;
  customerId?: string | null;
  createdAt?: string;
  note?: string;
  handledBy?: string | null;
  likelyDateOfDelivery?: string | null;
  orderStatus?: string;
  itemCount?: number;

  miscCharges?: IMiscCharge[];
  /**
   * Discount per order - Overall discount on purchase.
   */
  discountAmount: number;

  invoiceId?: string | null;
  items: IOrderItem[];
}

export interface IBillParty {
  name?: string;
  detail?: string;
  phone?: string;
}

export interface IInvoice {
  id?: string;
  generateInvoice?: boolean;
  billDate?: string;
  billFrom?: IBillParty;
  billTo?: IBillParty;
  orderIds?: string[];
  createdAt?: string;
  paymentMode?: string;
  paymentStatus?: PaymentStatusType;

  totalAmount?: number;
  advancePaid: number;
  balanceAmount?: number;
}

//#endregion

export interface IOrderInvoiceData {
  order: IOrder;
  invoice: IInvoice;
}

//#region classes defined

export class AdditionalServices implements IAdditionalServices {
  varnish: boolean;
  lamination: boolean;
  routerCut: boolean;

  constructor() {
    this.varnish = false;
    this.lamination = false;
    this.routerCut = false;
  }
}

export class Mounting implements IMounting {
  isEnabled: boolean;
  top: number;
  right: number;
  bottom: number;
  left: number;
  width?: number;
  height?: number;

  constructor() {
    this.isEnabled = false;
    this.top = 0;
    this.right = 0;
    this.bottom = 0;
    this.left = 0;
    this.width = undefined;
    this.height = undefined;
  }
}

export class Frame implements IFrame {
  type: string;
  color?: string;
  width?: number;
  height?: number;

  constructor() {
    this.type = "";
    this.color = undefined;
    this.width = undefined;
    this.height = undefined;
  }
}

export class Glass implements IGlass {
  isEnabled: boolean;
  type: string;
  width?: number;
  height?: number;

  constructor() {
    this.isEnabled = false;
    this.type = "";
    this.width = undefined;
    this.height = undefined;
  }
}

export class BillParty implements IBillParty {
  name: string;
  detail: string;
  phone: string;

  constructor() {
    this.name = "";
    this.detail = "";
    this.phone = "";
  }
}

export class InitializeCustomizedDetails implements ICustomizedDetails {
  name: string;
  description?: string;
  width: number;
  height: number;
  frame: IFrame;
  glass: IGlass;
  mounting: IMounting;
  additional: IAdditionalServices;

  constructor() {
    this.name = "";
    this.description = "";
    this.width = 0;
    this.height = 0;
    this.mounting = new Mounting();
    this.frame = new Frame();
    this.glass = new Glass();
    this.additional = new AdditionalServices();
  }
}

/**
 * Item/Product class in a order.
 * @description When we add an item/product in order then while initiating the item we can use this.
 */
export class InitializeOrderItem implements IOrderItem {
  _id: string;
  productId?: string;
  quantity: number;
  unitPrice: number;
  discountedQuantity: number;
  discountAmount: number;
  cancelledQty: number;
  customizedDetails: ICustomizedDetails;

  constructor() {
    this._id = crypto.randomUUID();
    this.productId = "";
    this.quantity = 0;
    this.unitPrice = 0;
    this.discountedQuantity = 0;
    this.discountAmount = 0;
    this.cancelledQty = 0;
    this.customizedDetails = new InitializeCustomizedDetails();
  }
}

export class InitializeOrderInvoice implements IOrderInvoiceData {
  order: IOrder;
  invoice: IInvoice;

  constructor() {
    this.order = {
      id: "",
      orderCode: "",
      customerName: "",
      createdAt: new Date().toISOString(),
      itemCount: 0,
      orderStatus: "placed",
      note: "",
      items: [],
      miscCharges: [],
      likelyDateOfDelivery: "",
      handledBy: null,
      discountAmount: 0,
    };

    this.invoice = {
      id: "",
      billDate: new Date().toDateString(),
      generateInvoice: true,
      billFrom: {
        name: "",
        detail: "",
        phone: "",
      },
      billTo: {
        name: "",
        detail: "",
        phone: "",
      },
      paymentMode: "cash",
      paymentStatus: "pending",
      createdAt: new Date().toISOString(),
      orderIds: [],
      totalAmount: 0,
      advancePaid: 0,
      balanceAmount: 0,
    };
  }
}
//#endregion
