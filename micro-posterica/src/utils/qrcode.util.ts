import type { ITotalCalculationInput } from "../interfaces/total-calculation.model";
import QRCode from "qrcode";

// const jsonData = {
//   advancePayment: 70,
//   artDetails: [
//     {
//       additional: {
//         lamination: false,
//         mounting: false,
//         routerCut: false,
//         varnish: false,
//       },
//       artName: "sdsds",
//       frameType: "1.25 inch premium Black/Silver",
//       glassType: "",
//       height: "12",
//       quantity: 1,
//       total: 144,
//       width: "12",
//     },
//   ],
//   balanceAmount: 2,
//   createdAt: "2025-07-02T18:15:33.289Z",
//   customerName: "",
//   discountAmount: 72,
//   discountPercentage: 50,
//   expectedDeliveryDate: "",
//   finalAmount: 72,
//   likelyDateOfDelivery: "",
//   miscCharges: [],
//   miscChargesAmount: 0,
//   paymentStatus: "Pending",
//   subtotal: 144,
//   totalAmount: 0,
// };

export const generateQRCode = async (jsonData: ITotalCalculationInput) => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(jsonData));
    console.log(qrCodeDataURL); // This will log the QR code as a base64 image URL
    // document.getElementById("qrcode").src = qrCodeDataURL; // Display the QR code in an <img> tag

    return qrCodeDataURL;
  } catch (err) {
    console.error(err);
  }
};

// generateQRCode();
