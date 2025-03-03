import { checkAlphabet } from "../../components/Helper";

/**
 * Encrypts a message using the Vigenere Cipher, given a key the message will be offset by the index of the corresponding letter in the alphabet.
 * @param message Input string to be encrypted.
 * @param key The private keyword string.
 * @returns The encrypted string.
 */
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

/**
 * Decrypts a message using the Vigenere Cipher, given a key the message will be offset in the INVERSE direction as the encryption.
 * @param encrypted Ciphertext string.
 * @param key The private keyword string.
 * @returns The decrypted message.
 */
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

/**
 * Generates a keyword for the Vigenere Cipher from 6 to 16 characters.
 * @returns Keyword string from 6 to 16 characters.
 */
export function generateKey() {
  var length = Math.floor(Math.random() * 10) + 6;
  var key = "";
  for (var i = 0; i < length; i++) {
    var charCode = Math.floor(Math.random() * 26) + "A".charCodeAt(0);
    key += String.fromCharCode(charCode);
  }
  return key;
}
