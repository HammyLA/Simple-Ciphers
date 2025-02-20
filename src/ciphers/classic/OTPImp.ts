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

export function OTPdecrypt(encrypted: string, key: string) {
  let decoded = atob(encrypted); // Decode Base64
  let ret = "";

  for (let i = 0; i < decoded.length; i++) {
    let xor = decoded.charCodeAt(i) ^ key.charCodeAt(i);
    ret += String.fromCharCode(xor);
  }

  return ret;
}

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
