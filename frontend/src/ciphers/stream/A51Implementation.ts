import { hex2bin, isHex } from "../../components/Helper";

/**
 * XORs the binary input string and the generated keystream from the A5/1 Keystream algorithm.
 * @param bin Binary representation of input string.
 * @param key The private key string.
 * @returns The binary of the encrypted message.
 */
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

/**
 * Translates the message into a binary string and passes it through the A5/1 XOR algorithm to encrypt the message with the keystream.
 * @param message Ciphertext string.
 * @param key The private hexadecimal key string.
 * @returns Encrypted hexadecimal message.
 */
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

/**
 * Translates the hexadecimal ciphertext into a binary string and uses the A5/1 XOR algorithm to decrypt the ciphertext with the generated keystream.
 * @param hex Hexadecimal ciphertext.
 * @param key The private hexadecimal key string.
 * @returns Decrypted final message string.
 */
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

/**
 * A5/1 Algorithm for using the private key to generate a keystream using a split up form of the binaries of the key in registers X, Y, and Z. The keystream algorithm utilizes XOR on the last bits of the registers to generate the next bit and uses specific bits in the registers to decide how to clock each register.
 * @param key Hexadecimal representation of the private key.
 * @param frame Current frame of the keystream. After 114 bits of the keystream have been generated, the frame should be incremented to develop the next 114 bits.
 * @returns The binary representation of the keystream.
 */
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

/**
 * Using bits at position 13, 16, 17, and 18 in the X register, they are XOR'd to decide what bit is shifted into the start of the register.
 * @param x The list of binary values representing the register X.
 * @returns The shifted X register.
 */
function clockX(x: number[]) {
  var bit = x[13] ^ x[16] ^ x[17] ^ x[18];
  return shift(x, bit);
}

/**
 * Using bits at position 20 and 21 in the Y register, they are XOR'd to decide what bit is shifted into the start of the register.
 * @param y The list of binary values representing register Y.
 * @returns The shifted Y register.
 */
function clockY(y: number[]) {
  var bit = y[20] ^ y[21];
  return shift(y, bit);
}

/**
 * Using bits at position 7, 20, 21, and 22, they are XOR'd to decide what bit is shifted into the start of the register.
 * @param z The list of binary values representing register Z
 * @returns The shifted Z register.
 */
function clockZ(z: number[]) {
  var bit = z[7] ^ z[20] ^ z[21] ^ z[22];
  return shift(z, bit);
}

/**
 * Adds the specified bit to the start of the inputted register.
 * @param arr The register input (X, Y, or Z)
 * @param bit (0 or 1)
 * @returns The resulting shifted register
 */
function shift(arr: number[], bit: number) {
  arr.pop();
  arr.unshift(bit);
  return arr;
}

/**
 * Decides which bit is in the majority of 3 numbers (they should be binary)
 * @param x 0 or 1 (from the X register)
 * @param y 0 or 1 (from the Y register)
 * @param z 0 or 1 (from the Z register)
 * @returns The bit that is in the majority.
 */
function vote(x: number, y: number, z: number) {
  var maj = x + y + z;
  if (maj >= 2) {
    return 1;
  }
  return 0;
}

/**
 * Generates a hexadecimal key string of 16 hex, (64-bit)
 * @returns 16-hex key string.
 */
export function A51GenerateKey() {
  const chars = "0123456789abcdef";
  var key = "";
  const keyLength = 16;

  for (var i = 0; i < keyLength; i++) {
    key += chars.charAt(Math.floor(Math.random() * 16));
  }
  return key;
}
