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

export function bin2hex(binary: string): string {
  let hex = "";
  for (let i = 0; i < binary.length; i += 4) {
    let chunk = binary.slice(i, i + 4).padStart(4, "0");
    let hexValue = parseInt(chunk, 2).toString(16).toLowerCase();
    hex += hexValue;
  }
  return hex;
}
