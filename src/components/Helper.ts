export function copyToClip(text: string) {
  navigator.clipboard.writeText(text);
}

export function checkAlphabet(text: string) {
  if (!/^[a-zA-Z ]+$/.test(text)) {
    throw new Error("Please use alphabetical characters only in your input");
  }
}
