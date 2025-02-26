import { hex2ByteArray, isHex, string2blocks } from "../../components/Helper";

export function TEAEncrypt(message: string, key: string) {
  isHex(key);
  if (key.length != 32) {
    throw new Error("TEA requires a 128-bit (32-hex) key");
  }
  let byteArray = string2blocks(message, 8);
  let keyArray = hex2ByteArray(key);
  let res = new Uint8Array(byteArray.length);
  for (var i = 0; i < byteArray.length; i += 8) {
    res.set(encrypt(byteArray.slice(i, i + 8), keyArray), i);
  }
  return Array.from(res)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function TEADecrypt(ciphertext: string, key: string) {
  isHex(ciphertext);
  isHex(key);
  if (key.length != 32) {
    throw new Error("TEA requires a 128-bit (32-hex) key");
  }
  let decoder = new TextDecoder();
  let byteArray = hex2ByteArray(ciphertext);
  let keyArray = hex2ByteArray(key);
  let res = new Uint8Array(byteArray.length);
  for (var i = 0; i < byteArray.length; i += 8) {
    res.set(decrypt(byteArray.slice(i, i + 8), keyArray), i);
  }
  return decoder.decode(res);
}

function encrypt(block: Uint8Array, key: Uint8Array): Uint8Array {
  if (block.length !== 8 || key.length !== 16) {
    throw new Error("TEA requires an 8-byte block and a 16-byte key.");
  }
  let inSet = processIn(block, key);
  let v0 = inSet[0];
  let v1 = inSet[1];
  let k = inSet[2];

  let delta = 0x9e3779b9,
    sum = 0;
  for (let i = 0; i < 32; i++) {
    sum = (sum + delta) >>> 0; // Ensure sum remains unsigned
    v0 = (v0 + (((v1 << 4) + k[0]) ^ (v1 + sum) ^ ((v1 >>> 5) + k[1]))) >>> 0;
    v1 = (v1 + (((v0 << 4) + k[2]) ^ (v0 + sum) ^ ((v0 >>> 5) + k[3]))) >>> 0;
  }
  return processOut(block, v0, v1);
}

function decrypt(block: Uint8Array, key: Uint8Array): Uint8Array {
  if (block.length !== 8 || key.length !== 16) {
    throw new Error("TEA requires an 8-byte block and a 16-byte key.");
  }
  let inSet = processIn(block, key);
  let v0 = inSet[0],
    v1 = inSet[1],
    k = inSet[2];
  let delta = 0x9e3779b9,
    sum = 0xc6ef3720;
  for (let i = 0; i < 32; i++) {
    v1 = (v1 - (((v0 << 4) + k[2]) ^ (v0 + sum) ^ ((v0 >>> 5) + k[3]))) >>> 0;
    v0 = (v0 - (((v1 << 4) + k[0]) ^ (v1 + sum) ^ ((v1 >>> 5) + k[1]))) >>> 0;
    sum = (sum - delta) >>> 0;
  }
  return processOut(block, v0, v1);
}

function processIn(
  block: Uint8Array,
  key: Uint8Array
): [number, number, number[]] {
  let v0 =
    ((block[0] << 24) >>> 0) |
    ((block[1] << 16) >>> 0) |
    ((block[2] << 8) >>> 0) |
    block[3];

  let v1 =
    ((block[4] << 24) >>> 0) |
    ((block[5] << 16) >>> 0) |
    ((block[6] << 8) >>> 0) |
    block[7];

  let k = [
    ((key[0] << 24) >>> 0) |
      ((key[1] << 16) >>> 0) |
      ((key[2] << 8) >>> 0) |
      key[3],

    ((key[4] << 24) >>> 0) |
      ((key[5] << 16) >>> 0) |
      ((key[6] << 8) >>> 0) |
      key[7],

    ((key[8] << 24) >>> 0) |
      ((key[9] << 16) >>> 0) |
      ((key[10] << 8) >>> 0) |
      key[11],

    ((key[12] << 24) >>> 0) |
      ((key[13] << 16) >>> 0) |
      ((key[14] << 8) >>> 0) |
      key[15],
  ];
  return [v0, v1, k];
}

function processOut(block: Uint8Array, v0: number, v1: number): Uint8Array {
  block[0] = (v0 >>> 24) & 0xff;
  block[1] = (v0 >>> 16) & 0xff;
  block[2] = (v0 >>> 8) & 0xff;
  block[3] = v0 & 0xff;

  block[4] = (v1 >>> 24) & 0xff;
  block[5] = (v1 >>> 16) & 0xff;
  block[6] = (v1 >>> 8) & 0xff;
  block[7] = v1 & 0xff;

  return block;
}

export function generateKey() {
  let chars = "0123456789abcdef";
  var key = "";
  for (var i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}
