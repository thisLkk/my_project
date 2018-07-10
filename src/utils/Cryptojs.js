import CryptoJS from 'crypto-js/crypto-js'

const KEY = "cgs@ctc-osp-rsp|";
/**
 * AES加密 ：字符串 key iv  返回base64
 */
export function encryptByDES(word) {
  var key = CryptoJS.enc.Utf8.parse(KEY);
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
  return encrypted.toString();

}
/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 */
export function decryptByDES(word) {
  var key = CryptoJS.enc.Utf8.parse(KEY);
  var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
