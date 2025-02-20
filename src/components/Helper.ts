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
        throw new Error("Please enter a hexadecimal number / input")
    }
}

export function errorMessage(error: unknown) {
    if (error instanceof Error) return error.message
}
