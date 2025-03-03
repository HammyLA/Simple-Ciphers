/**
 * Encrypts message through the One-Time Pad. XORs the bitstring of the message to the key and returns it as a base64 value.
 * @param message Input string to be encrypted
 * @param key The private key
 * @returns Base64 representation of the encrypted message
 */
export function OTPencrypt(message: string, key: string) {
  if (message.length > key.length) {
    throw new Error(
      "Please enter a key of the same length or longer than the message"
    );
  }

  var ret = "";

  for (var i = 0; i < message.length; i++) {
    var xor = message.charCodeAt(i) ^ key.charCodeAt(i);
    ret += String.fromCharCode(xor);
  }

  return btoa(ret);
}

/**
 * Decrypts ciphertext through the One-Time Pad. XORs bitstring of ciphertext and key and returns it as a string.
 * @param encrypted Base64 ciphertext
 * @param key The private key
 * @returns String of the decrypted message
 */
export function OTPdecrypt(encrypted: string, key: string) {
  let decoded = atob(encrypted); // Decode Base64
  let ret = "";

  for (let i = 0; i < decoded.length; i++) {
    let xor = decoded.charCodeAt(i) ^ key.charCodeAt(i);
    ret += String.fromCharCode(xor);
  }

  return ret;
}

/**
 * Generates a key of the same length or longer than the input based on a pseudorandom generation process.
 * @param message Input message
 * @returns A key of the length or longer than the message
 */
export function generateKey(message: string) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var padding = Math.floor(Math.random() * 11);
  var key = "";

  for (var i = 0; i < message.length + padding; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return key;
}
