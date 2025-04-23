import CryptoJS from 'crypto-js';

const secretKey = 'C7d8h2uu@1'; 

export const encryptText = (text) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decryptText = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};