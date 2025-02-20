import { checkAlphabet } from "../../components/Helper";

export function subCipherEncrypt(message: string, key: string) {
  checkAlphabet(message)
  var upperKey = key.toUpperCase();
  var alphaset: Set<string> = new Set<string>();
  if (key.length != 26) {
    throw new Error("Key should be exactly 26 characters");
  }

  for (var i = 0; i < key.length; i++) {
    if (alphaset.has(upperKey.charAt(i))) {
      throw new Error("Key should have unique letters");
    }
    alphaset.add(upperKey.charAt(i));
  }

  var temp = message.toUpperCase();
  var ret = "";
  for (var i = 0; i < message.length; i++) {
    if (temp.charAt(i) === " ") {
      ret += " ";
      continue;
    }
    var keyIndex = temp.charCodeAt(i) - "A".charCodeAt(0);
    ret += upperKey.charAt(keyIndex);
  }

  return ret;
}

export function subCipherDecrypt(encrypted: string, key: string) {
  checkAlphabet(encrypted)
  var upperKey = key.toUpperCase();
  var alphaset: Set<string> = new Set<string>();
  if (key.length != 26) {
    throw new Error("Key should be exactly 26 characters");
  }

  for (var i = 0; i < key.length; i++) {
    if (alphaset.has(upperKey.charAt(i))) {
      throw new Error("Key should have unique letters");
    }
    alphaset.add(upperKey.charAt(i));
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var temp = encrypted.toUpperCase();
  var ret = "";
  for (var i = 0; i < encrypted.length; i++) {
    if (temp.charAt(i) === " ") {
      ret += " ";
      continue;
    }
    ret += alphabet.charAt(upperKey.indexOf(temp.charAt(i)));
  }

  return ret;
}

export function generateKey() {
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let charArray = alphabet.split("");
  for (var i = 0; i < 1028; i++) {
    var pos1 = Math.floor(Math.random() * 26);
    var pos2 = Math.floor(Math.random() * 26);
    var temp = charArray[pos1];
    charArray[pos1] = charArray[pos2];
    charArray[pos2] = temp;
  }

  return charArray.join("");
}
