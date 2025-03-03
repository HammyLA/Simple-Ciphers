import { checkAlphabet } from "../../components/Helper";

/**
 * This is the implementation of the Caesar Cipher. Based on a shift value, it will shift the corresponding alphabet by that many characters to the right.
 */

/**
 * Caesar Cipher encryption function. Takes in a string and a shift value and shifts them over by the shift value
 * @param message Message to be encrypted
 * @param shift Number of characters to shift over
 * @returns Encrypted string
 */
export function caesarEncrypt(message: string, shift: number) {
  checkAlphabet(message);
  if (isNaN(shift) || shift < 0) {
    throw new Error("Please use a positive shift!");
  }

  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var realshift = shift % 26;
  var encrypted = "";
  var temp = message.toUpperCase();

  var charArray = alphabet.split("");
  for (var i = 0; i < temp.length; i++) {
    if (temp.charAt(i) === " ") {
      encrypted += " ";
      continue;
    }
    var keyindex = (temp.charCodeAt(i) - "A".charCodeAt(0) + realshift) % 26;
    encrypted += charArray[keyindex];
  }

  return encrypted;
}

/**
 * Caesar Cipher decryption function. Takes a string and a shift value and shifts them the opposite direction of the encryption by the shift value.
 * @param encrypted Encrypted string to be decrypted
 * @param shift Value that the encrypted string was shifted
 * @returns Decrypted string
 */
export function caesarDecrypt(encrypted: string, shift: number) {
  checkAlphabet(encrypted);
  if (shift < 0) {
    throw new Error("Please use a positive shift!");
  }

  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var realshift = shift % 26;
  var decrypted = "";
  var temp = encrypted.toUpperCase();

  var charArray = alphabet.split("");
  for (var i = 0; i < temp.length; i++) {
    if (temp.charAt(i) === " ") {
      decrypted += " ";
      continue;
    }
    var keyIndex = temp.charCodeAt(i) - "A".charCodeAt(0) - realshift;
    if (keyIndex < 0) {
      keyIndex += 26;
    }
    decrypted += charArray[keyIndex];
  }

  return decrypted;
}
