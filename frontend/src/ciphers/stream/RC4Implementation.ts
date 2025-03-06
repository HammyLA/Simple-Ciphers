import { isHex } from "../../components/Helper";

/**
 * Encodes the string into bytes and uses the hexadecimal key to generate an RC4 Keystream to encrypt the message. The encrypted message is then returned in hexadecimal format.
 * @param message Input string to be encrypted.
 * @param key Private hexadecimal key string.
 * @returns Encrypted hexadecimal string.
 */
export function RC4Encrypt(message: string, key: string) {
  isHex(key);
  var messageByte = new TextEncoder().encode(message);
  var keyStream = RC4Keystream(key, messageByte.length);
  var xorStream = new Uint8Array(messageByte.length);

  for (var i = 0; i < messageByte.length; i++) {
    xorStream[i] = messageByte[i] ^ keyStream[i];
  }

  return Array.from(xorStream)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Translates the hexadecimal string into bytes and generates a RC4 Keystream using the private key to decrypt the ciphertext. Returns a string of the final decrypted message.
 * @param encrypted Encrypted hexadecimal string.
 * @param key Private hexadecimal key string.
 * @returns Decrypted final message.
 */
export function RC4Decrypt(encrypted: string, key: string) {
  isHex(encrypted);
  isHex(key);
  if (encrypted.length % 2 !== 0) {
    encrypted = "0" + encrypted;
  }

  var encryptedByte = new Uint8Array(encrypted.length / 2);
  for (var i = 0; i < encrypted.length; i += 2) {
    encryptedByte[i / 2] = parseInt(encrypted.substring(i, i + 2), 16);
  }
  var keyStream = RC4Keystream(key, encryptedByte.length);
  var xorStream = new Uint8Array(encryptedByte.length);
  for (var i = 0; i < encryptedByte.length; i++) {
    xorStream[i] = encryptedByte[i] ^ keyStream[i];
  }

  return new TextDecoder().decode(xorStream);
}

/**
 * Initializes the RC4 permutation table using the private key.
 * @param key Hexadecimal private key string.
 * @returns The initial permuted RC4 table.
 */
function RC4Init(key: string) {
  if (key.length % 2 != 0) {
    key = "0" + key;
  }
  var keyArr = key.match(/.{1,2}/g);
  if (keyArr == null) {
    throw new Error("Please enter a valid key");
  }
  var keyNums = keyArr.map((hex) => parseInt(hex, 16));
  var tableNums: number[] = [];
  var tableKey: number[] = [];

  for (var i = 0; i < 256; i++) {
    tableNums[i] = i;
    tableKey[i] = keyNums[i % keyNums.length];
  }

  var j = 0;
  for (var i = 0; i < 256; i++) {
    j = (j + tableNums[i] + tableKey[i]) % 256;
    var temp = tableNums[i];
    tableNums[i] = tableNums[j];
    tableNums[j] = temp;
  }

  return tableNums;
}

/**
 * Uses the private key to generate keystream bytes through the RC4 permutation table. The keystreamLength is the number of bytes to generate.
 * @param key Private hexadecimal key string.
 * @param keystreamLength Number of bytes to generate for the keystream.
 * @returns Byte array representing the keystream.
 */
function RC4Keystream(key: string, keystreamLength: number) {
  var S = RC4Init(key);
  var i = 0;
  var j = 0;
  var keystream = new Uint8Array(keystreamLength);

  for (var k = 0; k < keystreamLength; k++) {
    i = (i + 1) % 256;
    j = (j + S[i]) % 256;

    var temp = S[i];
    S[i] = S[j];
    S[j] = temp;
    var t = (S[i] + S[j]) % 256;
    keystream[k] = S[t];
  }

  return keystream;
}

/**
 * Generates a 32-hex (128 bit) key for use in the RC4 Cipher.
 * @returns 32-hex private key.
 */
export function RC4GenerateKey() {
  const chars = "0123456789abcdef";
  var key = "";

  for (var i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return key;
}
