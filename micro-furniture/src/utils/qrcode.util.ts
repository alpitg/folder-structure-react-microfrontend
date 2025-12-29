import QRCode from "qrcode";

export const generateQRCode = async (jsonData: any) => {
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
