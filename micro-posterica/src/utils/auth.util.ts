export const allowedChar = () =>
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+,.?";

export const generateRandomPassword = (length = 12): string => {
  const chars = allowedChar();

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// /**
//  * Check if claim is valid or not
//  * @param claims - List of all claims assigned to user
//  * @param requiredClaims - specific feature claims
//  * @returns
//  */
// export const hasClaim = (requiredClaims: string[] = []) => {
//   const user: AuthenticationModel = AuthService.getAuthDetail();
//   if (requiredClaims?.length === 0) {
//     return true;
//   } else {
//     return (
//       requiredClaims &&
//       user?.claims &&
//       user?.claims?.some((claim) => requiredClaims?.includes(claim?.claimType))
//     );
//   }
// };
