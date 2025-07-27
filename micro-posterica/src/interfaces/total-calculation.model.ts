export interface IAdditionalDetails {
  varnish: boolean;
  lamination: boolean;
  routerCut: boolean;
}

export interface IArtDetail {
  artName: string;
  width: string;
  height: string;
  mounting: IMounting;
  frame: IFrame;
  glass: IGlass;
  additional: IAdditionalDetails;
  quantity: number;
  total: number;
}

export interface ITotalCalculationInput {
  customerName: string;
  likelyDateOfDelivery: string;
  expectedDeliveryDate: string;
  artDetails: IArtDetail[];
  subtotal: number;
  discountPercentage: number;
  discountAmount: number;
  finalAmount: number;
  miscCharges: any[]; // Replace `any` with a specific type if available
  miscChargesAmount: number;
  totalAmount: number;
  advancePayment: number;
  balanceAmount: number;
  paymentStatus: string;
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
