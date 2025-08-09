export type PaymentStatusType = "pending" | "paid" | "failed" | "refunded";

export interface IAdditionalServices {
  varnish: boolean;
  lamination: boolean;
  routerCut: boolean;
}

export interface MiscCharge {
  label: string;
  amount: number;
}

export interface IArtDetail {
  artName: string;
  artDescription: string;
  width: number;
  height: number;
  mounting: IMounting;
  frame: IFrame;
  glass: IGlass;
  additional: IAdditionalServices;
  quantity: number;
  unitPrice: number;
}

export interface ITotalCalculationInput {
  customerName: string;
  likelyDateOfDelivery: string;
  artDetails: IArtDetail[];

  cost: number;
  discountPercentage: number;
  discountAmount: number;
  finalAmount: number;
  miscCharges: any[]; // Replace `any` with a specific type if available
  miscChargesAmount: number;
  advancePayment: number;
  balanceAmount: number;

  invoice: IInvoiceDetail;
  createdAt: string;
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

export interface IMounting {
  isEnabled: boolean;
  top: number;
  right: number;
  bottom: number;
  left: number;
  width?: number;
  height?: number;
}

export interface IFrame {
  type: string;
  color?: string;
  width?: number;
  height?: number;
}

export interface IGlass {
  isEnabled: boolean;
  type: string;
  width?: number;
  height?: number;
}

export interface IInvoiceDetail {
  billDate: string;
  billFrom: IBillDetail;
  billTo: IBillDetail;

  paymentMode: string;
  paymentStatus: PaymentStatusType;

  handledBy: string;
}

export interface IBillDetail {
  name: string;
  detail: string;
  phone: string;
}

export class TotalCalculationInput implements ITotalCalculationInput {
  customerName: string;
  likelyDateOfDelivery: string;
  artDetails: IArtDetail[];

  cost: number;
  discountPercentage: number;
  discountAmount: number;
  finalAmount: number;
  miscCharges: any[];
  miscChargesAmount: number;
  advancePayment: number;
  balanceAmount: number;

  invoice: IInvoiceDetail;
  createdAt: string;

  constructor() {
    this.customerName = "";
    this.likelyDateOfDelivery = "";
    this.artDetails = [];
    this.cost = 0;
    this.discountPercentage = 0;
    this.discountAmount = 0;
    this.finalAmount = 0;
    this.miscCharges = [];
    this.miscChargesAmount = 0;
    this.advancePayment = 0;
    this.balanceAmount = 0;
    this.invoice = {
      billDate: new Date().toDateString(),
      billFrom: { name: "", detail: "", phone: "" },
      billTo: { name: "", detail: "", phone: "" },
      paymentMode: "",
      paymentStatus: "pending",
      handledBy: "",
    };
    this.createdAt = new Date().toISOString();
  }
}

export class ArtDetail implements IArtDetail {
  artName: string;
  artDescription: string;
  width: number;
  height: number;
  mounting: IMounting;
  frame: IFrame;
  glass: IGlass;
  additional: IAdditionalServices;
  quantity: number;
  unitPrice: number;

  constructor() {
    this.artName = "";
    this.artDescription = "";
    this.width = 0;
    this.height = 0;
    this.mounting = new Mounting();
    this.frame = new Frame();
    this.glass = new Glass();
    this.additional = new AdditionalServices();
    this.quantity = 1;
    this.unitPrice = 0;
  }
}

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

export class InvoiceDetail implements IInvoiceDetail {
  billDate: string;
  billFrom: IBillDetail;
  billTo: IBillDetail;
  paymentMode: string;
  paymentStatus: PaymentStatusType;
  handledBy: string;

  constructor() {
    this.billDate = new Date()?.toDateString() || "";
    this.billFrom = { name: "", detail: "", phone: "" };
    this.billTo = { name: "", detail: "", phone: "" };
    this.paymentMode = "";
    this.paymentStatus = "pending"
    this.handledBy = "";
  }
}

export class BillDetail implements IBillDetail {
  name: string;
  detail: string;
  phone: string;

  constructor() {
    this.name = "";
    this.detail = "";
    this.phone = "";
  }
}

//#region request / response model

export interface OrderItemIn {
  productId: string;
  quantity: number;
  unitPrice: number;
  discountedQuantity?: number;
  discountAmount?: number;
  cancelledQty?: number;
  customizedDetails?: CustomizedDetails;
}

export interface InvoiceIn {
  generateInvoice: boolean;
  billDate?: string;
  billFrom?: Record<string, any>;
  billTo?: Record<string, any>;
  paymentMode?: string;
  paymentStatus?: "pending" | "paid" | "failed" | "refunded";
}

export interface OrderIn {
  customerName: string;
  customerId?: string;
  items: OrderItemIn[];
  advancePayment?: number;
  miscCharges?: MiscCharge[];
  paymentMode?: string;
  paymentStatus?: string;
  invoiceId?: string;
  handledBy?: string;
  createdAt?: string; // ISO string (will be converted to Date in backend)
  likelyDateOfDelivery?: string;
  note?: string;
}

export interface IPlaceOrderPayload {
  order: OrderIn;
  invoice?: InvoiceIn;
}

export interface IOrderResponse {
  orderId: string;
}

//#endregion
