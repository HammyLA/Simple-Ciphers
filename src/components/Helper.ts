export function copyToClip(text: string) {
  navigator.clipboard.writeText(text);
}

export function checkAlphabet(text: string) {
  if (!/^[a-zA-Z ]+$/.test(text)) {
    throw new Error("Please use alphabetical characters only in your input");
  }
}

export function isHex(text: string) {
  if (!/^[0-9a-fA-F]+$/.test(text)) {
    throw new Error("Please enter a hexadecimal number / input");
  }
}

export function errorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
}

export function hex2bin(hex: string) {
  var bin = "";
  for (var i = 0; i < hex.length; i++) {
    bin += parseInt(hex.charAt(i), 16).toString(2).padStart(4, "0");
  }
  return bin;
}

export function bin2hex(binary: string): string {
  let hex = "";
  for (let i = 0; i < binary.length; i += 4) {
    let chunk = binary.slice(i, i + 4).padStart(4, "0");
    let hexValue = parseInt(chunk, 2).toString(16).toLowerCase();
    hex += hexValue;
  }
  return hex;
}

export function string2blocks(str: string, bytes: number) {
  const encoder = new TextEncoder();
  let byteArray = encoder.encode(str);
  const paddingLength = bytes - (byteArray.length % bytes);
  const byteList = Array.from(byteArray);

  if (paddingLength !== bytes) {
    for (let i = 0; i < paddingLength; i++) {
      byteList.push(paddingLength);
    }
  }

  byteArray = new Uint8Array(byteList);

  if (byteArray.length % bytes != 0) {
    throw new Error("Error: Byte Array not formatted properly");
  }

  return byteArray
}

export function hex2ByteArray(str: string): Uint8Array {
  if (str.length % 2 !== 0) {
    throw new Error("Hex string must have an even length");
  }

  let byteArray = new Uint8Array(str.length / 2);
  
  for (let i = 0; i < str.length; i += 2) {
    byteArray[i / 2] = parseInt(str.slice(i, i + 2), 16);
  }
  
  return byteArray;
}
