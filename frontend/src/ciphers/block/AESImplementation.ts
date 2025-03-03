import { hex2ByteArray, isHex, string2blocks } from "../../components/Helper";

// A lot of reference from https://github.com/francisrstokes/AES-C/blob/main/src/aes.c
// Francis R. Stokes has a great blog on implementing AES as well here: https://github.com/francisrstokes/githublog/blob/main/2022/6/15/rolling-your-own-crypto-aes.md

/**
 * Substitution box (S-box) for encryption
 */
const sbox_encrypt: Uint8Array = new Uint8Array([
  0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe,
  0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4,
  0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7,
  0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3,
  0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09,
  0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3,
  0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe,
  0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85,
  0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92,
  0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c,
  0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19,
  0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14,
  0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2,
  0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5,
  0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25,
  0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
  0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86,
  0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e,
  0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42,
  0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16,
]);

/**
 * Substitution box (S-box) for decryption
 */
const sbox_decrypt: Uint8Array = new Uint8Array([
  0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81,
  0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e,
  0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23,
  0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66,
  0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72,
  0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65,
  0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46,
  0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a,
  0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca,
  0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91,
  0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6,
  0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8,
  0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f,
  0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2,
  0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8,
  0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f,
  0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93,
  0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb,
  0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6,
  0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d,
]);

/**
 * Used for initialization for generating following keys in the key schedule
 */
const roundConstant: Uint8Array[] = [
  new Uint8Array([0x01, 0x00, 0x00, 0x00]),
  new Uint8Array([0x02, 0x00, 0x00, 0x00]),
  new Uint8Array([0x04, 0x00, 0x00, 0x00]),
  new Uint8Array([0x08, 0x00, 0x00, 0x00]),
  new Uint8Array([0x10, 0x00, 0x00, 0x00]),
  new Uint8Array([0x20, 0x00, 0x00, 0x00]),
  new Uint8Array([0x40, 0x00, 0x00, 0x00]),
  new Uint8Array([0x80, 0x00, 0x00, 0x00]),
  new Uint8Array([0x1b, 0x00, 0x00, 0x00]),
  new Uint8Array([0x36, 0x00, 0x00, 0x00]),
];

/**
 * Splits message into blocks and encrypts them. The resulting encrypted blocks in hexadecimal are combined together into a ciphertext string.
 * @param {string} message Input string for encryption
 * @param {string} key 32-bit Hexadecimal private key string to encrypt the message
 * @returns {string} The encrypted message in hexadecimal with a length of mod 32 to conform to 128-bit blocks
 */
export function AESEncrypt(message: string, key: string): string {
  isHex(key);
  if (key.length != 32) {
    throw new Error("Enter a 128-bit (32 hex) key");
  }
  var messageByteArray = string2blocks(message, 16);
  let keyByteArray = hex2ByteArray(key);
  let keySchedule = generateKeySchedule(keyByteArray, 11);
  let encrypted: string = "";

  // Goes through every 16 byte block, appends encrypted block to encrypted string
  for (var i = 0; i < messageByteArray.length; i += 16) {
    encrypted += Array.from(
      encryptBlock(messageByteArray.slice(i, i + 16), keySchedule, 11)
    )
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }
  return encrypted;
}

/**
 * Splits ciphertext into blocks and decrypts each in ECB mode. The resulting blocks are then combined into one string and returned
 * @param {string} ciphertext Input hexadecimal string of encrypted ciphertext
 * @param {string} key 32-bit Hexadecimal private key string to encrypt the message
 * @returns {string} The decrypted message string
 */
export function AESDecrypt(ciphertext: string, key: string): string {
  isHex(ciphertext);
  isHex(key);
  if (key.length != 32) {
    throw new Error("Enter a 128-bit (32 hex) key");
  }
  let decoder = new TextDecoder();
  let byteArray = hex2ByteArray(ciphertext);
  let keyByteArray = hex2ByteArray(key);

  let keySchedule = generateKeySchedule(keyByteArray, 11);

  let decrypted = "";
  for (var i = 0; i < byteArray.length; i += 16) {
    decrypted += decoder.decode(
      decryptBlock(byteArray.slice(i, i + 16), keySchedule, 11)
    );
  }
  return decrypted;
}

/**
 *
 * @returns 32-bit generated pseudorandom key for use in AES
 */
export function generateKey(): string {
  let chars = "0123456789abcdef";
  let keyLength = 32;
  let key = "";
  for (var i = 0; i < keyLength; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

/**
 * Galois Field Multiplication used for MixColumns in AES
 * @param a 1st Input to Galois Field Multiplication
 * @param b 2nd Input to Galois Field Multiplication
 * @returns Output Number of Galois Field Multiplication
 */
function GFMult(a: number, b: number): number {
  let res = 0;
  let shiftOut = 0;

  for (var i = 0; i < 8; i++) {
    if (b & 1) {
      res ^= a;
    }
    shiftOut = a & 0x80;
    a <<= 1;
    if (shiftOut) {
      a ^= 0x1b;
    }
    b >>= 1;
  }
  return res;
}

/**
 * Generates a key schedule for encryption and decryption of AES to use for each round. The resulting list is indexed from 0 being the first round and "rounds" - 1 being the last round
 * @param key Byte array of the key
 * @param rounds Number of rounds to go through, traditionally AES-128 goes throygh 11 rounds
 * @returns Arrray of byte matrices representing the key schedule
 */
function generateKeySchedule(key: Uint8Array, rounds: number): Uint8Array[][] {
  var currKey = arrayToMatrix(key);
  let blockKeys: Uint8Array[][] = [];
  blockKeys.push(currKey);
  for (var i = 0; i < rounds - 1; i++) {
    let nextKey: Uint8Array[] = [
      new Uint8Array(4),
      new Uint8Array(4),
      new Uint8Array(4),
      new Uint8Array(4),
    ];
    let col3 = currKey[3].slice();

    rotWord(col3);
    subWord(col3, sbox_encrypt);
    wordAdd(col3, roundConstant[i], col3);

    wordAdd(col3, currKey[0], nextKey[0]);
    wordAdd(nextKey[0], currKey[1], nextKey[1]);
    wordAdd(nextKey[1], currKey[2], nextKey[2]);
    wordAdd(nextKey[2], currKey[3], nextKey[3]);

    currKey = nextKey;
    blockKeys.push(nextKey);
  }
  return blockKeys;
}

/**
 * Add Round Key operation of AES, XORs current matrix values to corresponding current round key matrix values and sets them in the current state matrix
 * @param state The state of matrix currently being encrypted (ie. input matrix)
 * @param roundKey The current round key matrix
 */
function addRoundKey(state: Uint8Array[], roundKey: Uint8Array[]) {
  for (var col = 0; col < 4; col++) {
    for (var row = 0; row < 4; row++) {
      state[col][row] ^= roundKey[col][row];
    }
  }
}

/**
 * Sub Bytes operation of AES. Each state matrix value is replaced by values corresponding in the S-Box table.
 * @param state The state of matrix currently being encrypted (ie. input matrix)
 * @param table The S-Box table used to substitute values in the state matrix (sbox_encrypt or sbox_decrypt)
 */
function subBytes(state: Uint8Array[], table: Uint8Array) {
  for (var col = 0; col < 4; col++) {
    for (var row = 0; row < 4; row++) {
      state[col][row] = table[state[col][row]];
    }
  }
}

/**
 * Shift Row operation of AES. State matrix is shifted depending on the row it is (0, 1, 2, 3 shifts to the left)
 * @param state Current state matrix being encrypted (ie. input matrix)
 */
function shiftRows(state: Uint8Array[]) {
  var temp0;
  var temp1;

  // Shift row 1
  // [0] [1] [2] [3] -> [1] [2] [3] [0]
  temp0 = state[0][1];
  state[0][1] = state[1][1];
  state[1][1] = state[2][1];
  state[2][1] = state[3][1];
  state[3][1] = temp0;

  // Shift row 2
  // [0] [1] [2] [3] -> [2] [3] [0] [1]
  temp0 = state[0][2];
  temp1 = state[1][2];
  state[0][2] = state[2][2];
  state[1][2] = state[3][2];
  state[2][2] = temp0;
  state[3][2] = temp1;

  // Shift row 3
  // [0] [1] [2] [3] -> [3] [0] [1] [2]
  temp0 = state[3][3];
  state[3][3] = state[2][3];
  state[2][3] = state[1][3];
  state[1][3] = state[0][3];
  state[0][3] = temp0;
}

/**
 * Inverse of the shift row process in AES. This is for decryption (shifts right instead of left)
 * @param state Current state matrix being decrypted
 */
function invShiftRows(state: Uint8Array[]) {
  var temp0;
  var temp1;

  // Shift row 1
  // [0] [1] [2] [3] -> [3] [0] [1] [2]
  temp0 = state[3][1];
  state[3][1] = state[2][1];
  state[2][1] = state[1][1];
  state[1][1] = state[0][1];
  state[0][1] = temp0;

  // Shift row 2
  // [0] [1] [2] [3] -> [2] [3] [0] [1]
  temp0 = state[0][2];
  temp1 = state[1][2];
  state[0][2] = state[2][2];
  state[1][2] = state[3][2];
  state[2][2] = temp0;
  state[3][2] = temp1;

  // Shift row 3
  // [0] [1] [2] [3] -> [1] [2] [3] [0]
  temp0 = state[0][3];
  state[0][3] = state[1][3];
  state[1][3] = state[2][3];
  state[2][3] = state[3][3];
  state[3][3] = temp0;
}

/**
 * Mix Column operation of AES, Utilizes Galois Field Multiplication to alter each column of the state matrix
 * @param state The state of matrix currently being encrypted (ie. input matrix)
 */
function mixColumn(state: Uint8Array[]) {
  for (let i = 0; i < 4; i++) {
    const s0 = state[i][0];
    const s1 = state[i][1];
    const s2 = state[i][2];
    const s3 = state[i][3];

    state[i][0] = GFMult(0x02, s0) ^ GFMult(0x03, s1) ^ s2 ^ s3;
    state[i][1] = s0 ^ GFMult(0x02, s1) ^ GFMult(0x03, s2) ^ s3;
    state[i][2] = s0 ^ s1 ^ GFMult(0x02, s2) ^ GFMult(0x03, s3);
    state[i][3] = GFMult(0x03, s0) ^ s1 ^ s2 ^ GFMult(0x02, s3);
  }
}

/**
 * Inverse operation of Mix Column in AES. Used for decryption
 * @param state Current matrix being decrypted.
 */
function invMixColumn(state: Uint8Array[]) {
  for (let i = 0; i < 4; i++) {
    const s0 = state[i][0];
    const s1 = state[i][1];
    const s2 = state[i][2];
    const s3 = state[i][3];

    state[i][0] =
      GFMult(0x0e, s0) ^ GFMult(0x0b, s1) ^ GFMult(0x0d, s2) ^ GFMult(0x09, s3);
    state[i][1] =
      GFMult(0x09, s0) ^ GFMult(0x0e, s1) ^ GFMult(0x0b, s2) ^ GFMult(0x0d, s3);
    state[i][2] =
      GFMult(0x0d, s0) ^ GFMult(0x09, s1) ^ GFMult(0x0e, s2) ^ GFMult(0x0b, s3);
    state[i][3] =
      GFMult(0x0b, s0) ^ GFMult(0x0d, s1) ^ GFMult(0x09, s2) ^ GFMult(0x0e, s3);
  }
}

/**
 * Circular rotation of a column in a matrix
 * @param column Column in a matrix
 */
function rotWord(column: Uint8Array) {
  let temp = column[0];
  column[0] = column[1];
  column[1] = column[2];
  column[2] = column[3];
  column[3] = temp;
}

/**
 * Substitution of values in a column using the S-box table
 * @param column Column in a matrix
 * @param table The S-Box table used to substitute values in the state matrix (sbox_encrypt or sbox_decrypt)
 */
function subWord(column: Uint8Array, table: Uint8Array) {
  for (var i = 0; i < 4; i++) {
    column[i] = table[column[i]];
  }
}

/**
 * Adds bytes together for columns
 * @param a input column 1
 * @param b input column 2
 * @param dest desired output column
 */
function wordAdd(a: Uint8Array, b: Uint8Array, dest: Uint8Array) {
  dest[0] = a[0] ^ b[0];
  dest[1] = a[1] ^ b[1];
  dest[2] = a[2] ^ b[2];
  dest[3] = a[3] ^ b[3];
}

/**
 * Encryption algorithm of AES.
 * @param block Input byte array of the message.
 * @param keySchedule Calculated key schedule based on the key input.
 * @param rounds Number of rounds that AES will run through.
 * @returns The byte array of the AES encrypted message
 */
function encryptBlock(
  block: Uint8Array,
  keySchedule: Uint8Array[][],
  rounds: number
) {
  let state = arrayToMatrix(block);
  addRoundKey(state, keySchedule[0]);

  for (let round = 1; round < rounds - 1; round++) {
    subBytes(state, sbox_encrypt);
    shiftRows(state);
    mixColumn(state);
    addRoundKey(state, keySchedule[round]);
  }

  subBytes(state, sbox_encrypt);
  shiftRows(state);
  addRoundKey(state, keySchedule[rounds - 1]);

  return matrixToArray(state);
}
/**
 * Decryption algorithm of AES, inverse of the encryption in AES.
 * @param block Input byte array of the ciphertext.
 * @param keySchedule Calculated key schedule based on the key input.
 * @param rounds Number of rounds that AES will run through.
 * @returns The byte array of the AES decrypted message.
 */
function decryptBlock(
  block: Uint8Array,
  keySchedule: Uint8Array[][],
  rounds: number
) {
  let state = arrayToMatrix(block);
  addRoundKey(state, keySchedule[rounds - 1]);

  for (let round = rounds - 2; round > 0; round--) {
    invShiftRows(state);
    subBytes(state, sbox_decrypt);
    addRoundKey(state, keySchedule[round]);
    invMixColumn(state);
  }

  invShiftRows(state);
  subBytes(state, sbox_decrypt);
  addRoundKey(state, keySchedule[0]);

  return matrixToArray(state);
}

/**
 * Transposes byte array to a 4x4 matrix needed for AES.
 * @param arr 16-Byte array.
 * @returns 4x4 Matrix of the byte array.
 */
function arrayToMatrix(arr: Uint8Array): Uint8Array[] {
  if (arr.length !== 16) {
    throw new Error("Array must have exactly 16 elements");
  }

  const matrix: Uint8Array[] = [
    new Uint8Array([arr[0], arr[4], arr[8], arr[12]]), // 1st column
    new Uint8Array([arr[1], arr[5], arr[9], arr[13]]), // 2nd column
    new Uint8Array([arr[2], arr[6], arr[10], arr[14]]), // 3rd column
    new Uint8Array([arr[3], arr[7], arr[11], arr[15]]), // 4th column
  ];

  return matrix;
}

/**
 * Transposes byte matrix to a byte array
 * @param mat 4x4 Byte Matrix used in AES
 * @returns 16-Byte array
 */
function matrixToArray(mat: Uint8Array[]) {
  let arr: number[] = [];
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      arr.push(mat[j][i]);
    }
  }
  return new Uint8Array(arr);
}
