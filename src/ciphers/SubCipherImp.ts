export function subCipherEncrypt(message: string, key: string) {
  var arr: number[] = Array<number>(26);
  if (key.length > 26) {
    throw new Error("Key should be exactly 26 characters")
  }

  for (var i = 0; i < key.length; i++) {
    arr[key.toUpperCase().charCodeAt(i) - 'A'.charCodeAt(0)]++
    if (arr[key.toUpperCase().charCodeAt(i) - 'A'.charCodeAt(0)] > 1) {
        throw new Error("Key should have unique characters");
    }
  }

  var temp = message.toUpperCase();
  var ret = "";
  for (var i = 0; i < message.length; i++) {
    if (temp.charAt(i) === ' ') {
      ret += ' ';
      continue;
    }
    var keyIndex = temp.charCodeAt(i) - 'A'.charCodeAt(0);
    ret += key.charAt(keyIndex)
  }

  return ret;
}

export function subCipherDecrypt(ciphertext: string, key: string) {
  var arr: number[] = Array<number>(26);
  if (key.length > 26) {
    throw new Error("Key should be exactly 26 characters")
  }

  for (var i = 0; i < key.length; i++) {
    arr[key.toUpperCase().charCodeAt(i) - 'A'.charCodeAt(0)]++
    if (arr[key.toUpperCase().charCodeAt(i) - 'A'.charCodeAt(0)] > 1) {
        throw new Error("Key should have unique characters");
    }
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  var temp = ciphertext.toUpperCase();
  var ret = "";
  for (var i = 0; i < ciphertext.length; i++) {
    if (temp.charAt(i) === ' ') {
      ret += " "
      continue;
    }
    ret += alphabet.charAt(key.indexOf(temp.charAt(i)))
  }

  return ret;
}

export function generateKey() {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let charArray = alphabet.split('')
    for (var i = 0; i < 1028; i++) {
        var pos1 = Math.floor(Math.random() * 26)
        var pos2 = Math.floor(Math.random() * 26)
        var temp = charArray[pos1]
        charArray[pos1] = charArray[pos2]
        charArray[pos2] = temp
    }

    return charArray.join('')
}
