export interface IAdditionalDetails {
  mounting: boolean;
  varnish: boolean;
  lamination: boolean;
  routerCut: boolean;
}

export interface IArtDetail {
  artName: string;
  width: string;
  height: string;
  frameType: string;
  glassType: string;
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
