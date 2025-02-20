import { checkAlphabet } from "../../components/Helper";

export function vigenereEncrypt(message: string, key: string) {
  checkAlphabet(message);
  checkAlphabet(key);
  var encrypted = "";
  message = message.toUpperCase();
  key = key.toUpperCase();

  for (var i = 0; i < message.length; i++) {
    if (message.charAt(i) === " ") {
      encrypted += " ";
      continue;
    }
    var shift = key.charCodeAt(i % key.length) - "A".charCodeAt(0);
    var charCode = message.charCodeAt(i) + shift;
    if (charCode > "Z".charCodeAt(0)) {
      charCode = charCode - 26;
    }
    encrypted += String.fromCharCode(charCode);
  }

  return encrypted;
}

export function vigenereDecrypt(encrypted: string, key: string) {
  checkAlphabet(encrypted);
  checkAlphabet(key);

  var decrypted = "";
  encrypted = encrypted.toUpperCase();
  key = key.toUpperCase();

  for (var i = 0; i < encrypted.length; i++) {
    if (encrypted.charAt(i) === " ") {
      decrypted += " ";
      continue;
    }
    var shift = key.charCodeAt(i % key.length) - "A".charCodeAt(0);
    var charCode = encrypted.charCodeAt(i) - shift;
    if (charCode < "A".charCodeAt(0)) {
      charCode = charCode + 26;
    }
    decrypted += String.fromCharCode(charCode);
  }

  return decrypted;
}

export function generateKey() {
  var length = Math.floor(Math.random() * 10) + 6;
  var key = "";
  for (var i = 0; i < length; i++) {
    var charCode = Math.floor(Math.random() * 26) + "A".charCodeAt(0);
    key += String.fromCharCode(charCode);
  }
  return key;
}
