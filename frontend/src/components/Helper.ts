import { Bounce, toast } from "react-toastify";

/**
 * Copies specified text to clipboard for pasting
 * @param text String to be copied
 */
export function copyToClip(text: string) {
  navigator.clipboard.writeText(text);
  toast.success(`Copied key: ${text}`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
}

/**
 * Checks if a string contains only symbols contained in the English Alphabet, if not throws an error.
 * @param text String to be checked
 */
export function checkAlphabet(text: string) {
  if (!/^[a-zA-Z ]+$/.test(text)) {
    throw new Error("Please use alphabetical characters only in your input");
  }
}

/**
 * Checks if the string is in hexadecimal form, if not throws an error.
 * @param text String checked
 */
export function isHex(text: string) {
  if (!/^[0-9a-fA-F]+$/.test(text)) {
    throw new Error("Please enter a hexadecimal number / input");
  }
}

/**
 * Function for returning error messages
 * @param error The error that was thrown
 * @returns Error message accompanying thrown error
 */
export function getError(error: unknown) {
  if (error instanceof Error) return error.message;
}

/**
 * Translates hexadecimal strings to binary strings
 * @param hex hexadecimal formatted string input
 * @returns binary formatted string
 */
export function hex2bin(hex: string): string {
  var bin = "";
  for (var i = 0; i < hex.length; i++) {
    bin += parseInt(hex.charAt(i), 16).toString(2).padStart(4, "0");
  }
  return bin;
}

/**
 * Translates binary strings to hexadecimal strings
 * @param binary binary formatted string input
 * @returns hexadecimal formatted string
 */
export function bin2hex(binary: string): string {
  let hex = "";
  for (let i = 0; i < binary.length; i += 4) {
    let chunk = binary.slice(i, i + 4).padStart(4, "0");
    let hexValue = parseInt(chunk, 2).toString(16).toLowerCase();
    hex += hexValue;
  }
  return hex;
}

/**
 * Translates strings to byte arrays for block ciphers to work with. Adds padding bytes if needed for a specified amount of bytes in a block.
 * @param str Input string
 * @param bytes Desired amount of bytes per block
 * @returns Array of bytes
 */
export function string2blocks(str: string, bytes: number): Uint8Array {
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

  return byteArray;
}

/**
 * Translates hexadecimal string input into an array of bytes
 * @param str input hexadecimal string
 * @returns byte array representation of hexadecimals
 */
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
