import { isHex } from "../../components/Helper";

function hex2bin(hex: string) {
  hex = hex.toLowerCase();
  var out = "";
  for (var c of hex) {
    switch (c) {
      case "0":
        out += "0000";
        break;
      case "1":
        out += "0001";
        break;
      case "2":
        out += "0010";
        break;
      case "3":
        out += "0011";
        break;
      case "4":
        out += "0100";
        break;
      case "5":
        out += "0101";
        break;
      case "6":
        out += "0110";
        break;
      case "7":
        out += "0111";
        break;
      case "8":
        out += "1000";
        break;
      case "9":
        out += "1001";
        break;
      case "a":
        out += "1010";
        break;
      case "b":
        out += "1011";
        break;
      case "c":
        out += "1100";
        break;
      case "d":
        out += "1101";
        break;
      case "e":
        out += "1110";
        break;
      case "f":
        out += "1111";
        break;
      default:
        return "";
    }
  }

  return out;
}

function A51XorAlgo(bin: string, key: string) {
  var frame = 0;
  var keystream = A51Keystream(key, frame);
  var processed = "";
  for (var i = 0; i < bin.length; i++) {
    processed += bin[i] === keystream[i % 114] ? "0" : "1";
    if ((i + 1) % 114 === 0) {
      frame++;
      keystream = A51Keystream(key, frame);
    }
  }

  return processed;
}

export function A51Encrypt(message: string, key: string) {
  message = message.replace(/(\r\n|\n|\r)/gm, "");
  var binmessage = message
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");

  var processed = A51XorAlgo(binmessage, key);

  var output = "";
  for (var i = 0; i < processed.length; i += 8) {
    var byte = processed.substring(i, i + 8);
    output += parseInt(byte, 2).toString(16).padStart(2, "0");
  }

  return output;
}

export function A51Decrypt(hex: string, key: string) {
  isHex(hex);
  hex = hex.replace(/(\r\n|\n|\r)/gm, "");
  var bin = hex2bin(hex);

  var processed = A51XorAlgo(bin, key);

  var output = "";
  for (var i = 0; i < processed.length; i += 8) {
    var byte = processed.substring(i, i + 8);
    output += String.fromCharCode(parseInt(byte, 2));
  }

  return output;
}

function A51Keystream(key: string, frame: number) {
  isHex(key);
  key = hex2bin(key);
  var keyReg = key.split("").map(Number);
  if (keyReg.length != 64) {
    console.log(keyReg);
    throw new Error("Enter a 64-bit key (8-hex key)");
  }

  const keystreamBits = 114;
  var x = keyReg.slice(0, 19);
  var y = keyReg.slice(19, 41);
  var z = keyReg.slice(41);

  for (var i = 0; i < frame * 32; i++) {
    clockX(x);
    clockY(y);
    clockZ(z);
  }

  var keystream = "";

  for (var i = 0; i < keystreamBits; i++) {
    var maj = vote(x[8], y[10], z[10]);
    if (x[8] == maj) {
      clockX(x);
    }
    if (y[10] == maj) {
      clockY(y);
    }
    if (z[10] == maj) {
      clockZ(z);
    }

    keystream = (x[18] ^ y[21] ^ z[22]) + keystream;
  }

  return keystream;
}

function clockX(x: number[]) {
  var bit = x[13] ^ x[16] ^ x[17] ^ x[18];
  return shift(x, bit);
}

function clockY(y: number[]) {
  var bit = y[20] ^ y[21];
  return shift(y, bit);
}

function clockZ(z: number[]) {
  var bit = z[7] ^ z[20] ^ z[21] ^ z[22];
  return shift(z, bit);
}

function shift(arr: number[], bit: number) {
  arr.pop();
  arr.unshift(bit);
  return arr;
}

function vote(x: number, y: number, z: number) {
  var maj = x + y + z;
  if (maj >= 2) {
    return 1;
  }
  return 0;
}

export function generateKey() {
  const chars = "0123456789abcdef";
  var key = "";
  const keyLength = 16;

  for (var i = 0; i < keyLength; i++) {
    key += chars.charAt(Math.floor(Math.random() * 16));
  }
  return key;
}
