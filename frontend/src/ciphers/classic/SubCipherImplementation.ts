import { checkAlphabet } from "../../components/Helper";

/**
 * Encrypts a message through a substitution cipher based on a key that is a permutation of the alphabet. The encryption substitutes letters in a string for other letters corresponding to the key.
 * @param message Input string to be encrypted.
 * @param key Permuted string of the alphabet.
 * @returns Encrypted message.
 */
export function subCipherEncrypt(message: string, key: string) {
  checkAlphabet(message)
  var upperKey = key.toUpperCase();
  var alphaset: Record<string, boolean> = {};
  if (key.length != 26) {
    throw new Error("Key should be exactly 26 characters");
  }

  for (var i = 0; i < key.length; i++) {
    if (alphaset[upperKey.charAt(i)]) {
        throw new Error("Key should have unique letters");
    }
    alphaset[upperKey.charAt(i)] = true;
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

/**
 * Decrypts a message through a substitution cipher with a key that is a permutation of the alphabet. It does the inverse operation of the encryption of the substitution cipher.
 * @param encrypted Ciphertext string.
 * @param key A permuted form of the alphabet.
 * @returns Decrypted message.
 */
export function subCipherDecrypt(encrypted: string, key: string) {
  checkAlphabet(encrypted)
  var upperKey = key.toUpperCase();
  var alphaset: Record<string, boolean> = {};
  if (key.length != 26) {
    throw new Error("Key should be exactly 26 characters");
  }

  for (var i = 0; i < key.length; i++) {
    if (alphaset[upperKey.charAt(i)]) {
        throw new Error("Key should have unique letters");
    }
    alphaset[upperKey.charAt(i)] = true;
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

/**
 * 
 * @returns 
 */
export function substitutionGenerateKey() {
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let charArray = alphabet.split("");

  let randomValues = new Uint32Array(1028);
  crypto.getRandomValues(randomValues);

  for (var i = 0; i < 1028; i++) {
    var pos1 = randomValues[i] % 26;
    var pos2 = (randomValues[i] + 1) % 26; // Ensure different positions
    var temp = charArray[pos1];
    charArray[pos1] = charArray[pos2];
    charArray[pos2] = temp;
  }

  return charArray.join("");
}

