import {
  bin2hex,
  hex2bin,
  isHex,
  string2blocks,
} from "../../components/Helper";

// Credit to Ziaullah for these tables and implementation
// https://ziaullahrajpoot.medium.com/data-encryption-standard-des-dc8610aafdb3

const ip_table = [
  58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38,
  30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9, 1,
  59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39,
  31, 23, 15, 7,
];

const pc1_table = [
  57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35,
  27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38,
  30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4,
];

const shift_schedule = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

const pc2_table = [
  14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27,
  20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34,
  53, 46, 42, 50, 36, 29, 32,
];

const e_box_table = [
  32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15, 16,
  17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27, 28, 29,
  28, 29, 30, 31, 32, 1,
];

const s_boxes = [
  // S-box 1
  [
    [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
    [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
    [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
    [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13],
  ],
  // S-box 2
  [
    [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
    [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
    [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
    [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9],
  ],
  // S-box 3
  [
    [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
    [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
    [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
    [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12],
  ],
  // S-box 4
  [
    [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
    [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
    [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
    [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14],
  ],
  // S-box 5
  [
    [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
    [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
    [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
    [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3],
  ],
  // S-box 6
  [
    [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
    [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
    [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
    [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13],
  ],
  // S-box 7
  [
    [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
    [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
    [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
    [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12],
  ],
  // S-box 8
  [
    [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
    [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
    [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
    [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11],
  ],
];

const p_box_table = [
  16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14, 32,
  27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25,
];

const ip_inverse_table = [
  40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14,
  54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28,
  35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9,
  49, 17, 57, 25,
];

export function DESEncrypt(message: string, key: string) {
  isHex(key);
  if (key.length != 16) {
    throw new Error("Enter a 64-bit key (16-hex)");
  }
  key = hex2bin(key);
  let byteArray = string2blocks(message, 8);
  let blocks: string[] = [];
  for (let i = 0; i < byteArray.length; i += 8) {
    let block = byteArray.slice(i, i + 8);

    let bitString = Array.from(block)
      .map((byte) => byte.toString(2).padStart(8, "0"))
      .join("");

    blocks.push(bitString);
  }

  let encryptedBlocks = [];
  for (var i = 0; i < blocks.length; i++) {
    encryptedBlocks.push(encrypt(blocks[i], key));
  }

  return bin2hex(encryptedBlocks.join(""));
}

export function DESDecrypt(hexstring: string, key: string) {
  isHex(key);
  isHex(hexstring);
  if (key.length != 16) {
    throw new Error("Enter a 64-bit key (16-hex)");
  }
  key = hex2bin(key);
  var binstring = hex2bin(hexstring);

  var blocks = [];
  for (var i = 0; i < binstring.length; i += 64) {
    blocks[i / 64] = binstring.slice(i, i + 64);
  }

  var decryptedBlocks = [];
  for (var i = 0; i < blocks.length; i++) {
    decryptedBlocks.push(decrypt(blocks[i], key));
  }
  var decBinString = decryptedBlocks.join("");
  var byteArray = new Uint8Array(decBinString.length / 8);

  for (var i = 0; i < decBinString.length; i += 8) {
    var byte = decBinString.slice(i, i + 8);
    byteArray[i / 8] = parseInt(byte, 2);
  }

  return new TextDecoder().decode(byteArray);
}

function encrypt(bitstring: string, key: string) {
  var roundKeys = generateRoundKey(key);
  var ipStr = init(bitstring);

  var l = ipStr.slice(0, 32);
  var r = ipStr.slice(32);

  for (var round = 0; round < 16; round++) {
    let expandR = e_box_table.map((index) => r.charAt(index - 1)).join("");
    let roundKey = roundKeys[round];

    var newR = DESAlgo(l, expandR, roundKey);

    l = r;
    r = newR;
  }
  var bitResult = r + l;
  var cipher = ip_inverse_table
    .map((index) => bitResult.charAt(index - 1))
    .join("");

  return cipher;
}

function decrypt(cipherbin: string, key: string) {
  var roundKeys = generateRoundKey(key);
  var ipStr = init(cipherbin);

  var l = ipStr.slice(0, 32);
  var r = ipStr.slice(32);

  for (var round = 0; round < 16; round++) {
    var expandR = e_box_table.map((index) => r.charAt(index - 1)).join("");
    var roundKey = roundKeys[15 - round];

    var newR = DESAlgo(l, expandR, roundKey);

    l = r;
    r = newR;
  }

  var bitResult = r + l;
  var decrypted = ip_inverse_table
    .map((index) => bitResult.charAt(index - 1))
    .join("");

  return decrypted;
}

function DESAlgo(l: string, expandR: string, roundKey: string) {
  var xorStr = "";
  for (var i = 0; i < 48; i++) {
    xorStr += expandR.charAt(i) === roundKey.charAt(i) ? "0" : "1";
  }

  var sboxGroups = [];
  for (var i = 0; i < 48; i += 6) {
    sboxGroups.push(xorStr.slice(i, i + 6));
  }

  var sboxsubbed = "";
  for (var i = 0; i < 8; i++) {
    let rowBits = parseInt(sboxGroups[i][0] + sboxGroups[i][5], 2);
    let colBits = parseInt(sboxGroups[i].slice(1, 5), 2);

    var sboxVal = s_boxes[i][rowBits][colBits];
    sboxsubbed += sboxVal.toString(2).padStart(4, "0");
  }

  var pboxRes = p_box_table.map((index) => sboxsubbed[index - 1]);
  var leftList = l.split("");

  var newR = "";
  for (var i = 0; i < 32; i++) {
    newR += leftList[i] !== pboxRes[i] ? "1" : "0";
  }
  return newR;
}

function init(bitstring: string) {
  var permute = "";
  for (var i = 0; i < 64; i++) {
    permute += bitstring.charAt(ip_table[i] - 1); // I WAS DOING "ip_table[i]" THIS CAUSE HOURS OF STRESS
  }
  return permute;
}

function generateRoundKey(key: string) {
  let pc1key = pc1_table.map((index) => key.charAt(index - 1)).join("");

  var c0 = pc1key.slice(0, 28);
  var d0 = pc1key.slice(28);
  var round_keys = [];
  for (var i = 0; i < 16; i++) {
    c0 = c0.slice(shift_schedule[i]) + c0.slice(0, shift_schedule[i]);
    d0 = d0.slice(shift_schedule[i]) + d0.slice(0, shift_schedule[i]);

    var cd = c0 + d0;
    let pc2key = pc2_table.map((index) => cd.charAt(index - 1)).join("");

    round_keys.push(pc2key);
  }
  return round_keys;
}

export function generateKey() {
  const chars = "0123456789abcdef";
  var key = "";

  for (var i = 0; i < 16; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return key;
}
