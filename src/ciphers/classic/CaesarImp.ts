import { checkAlphabet } from "../../components/Helper";

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
