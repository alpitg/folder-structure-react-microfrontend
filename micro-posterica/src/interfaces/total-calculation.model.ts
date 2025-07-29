export interface IAdditionalDetails {
  varnish: boolean;
  lamination: boolean;
  routerCut: boolean;
}

export interface IArtDetail {
  artName: string;
  artDescription: string;
  width: string;
  height: string;
  mounting: IMounting;
  frame: IFrame;
  glass: IGlass;
  additional: IAdditionalDetails;
  quantity: number;
  cost: number;
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

  paymentMode: string;
  paymentStatus: string;
  invoice: IInvoiceDetail;
  createdAt: string;
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
  billDate: Date;
  billFrom: IBillDetail;
  billTo: IBillDetail;
  handledBy: string;
}

export interface IBillDetail {
  name: string;
  detail: string;
  phone: string;
}
