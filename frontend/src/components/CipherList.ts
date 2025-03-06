interface Cipher {
  id: number;
  name: string;
  description: string;
  path: string;
}

/**
 * List of cipher styles, in which each unit contains a list of ciphers.
 */
const CipherList: { id: number, name: string; cipher: Cipher[] }[] = [
  {
    id: 0,
    name: "classic",
    cipher: [
      {
        id: 0,
        name: "Caesar Cipher",
        description: "Alphabet shifted based on a value",
        path: "caesar",
      },
      {
        id: 1,
        name: "Substitution Cipher",
        description: "Letter assigned to another letter",
        path: "substitution",
      },
      {
        id: 2,
        name: "One-Time Pad",
        description: "Plaintext combined with a random secret key",
        path: "otp",
      },
      {
        id: 3,
        name: "Vigenere Cipher",
        description: "The shift of each letter is determined by the corresponding letter of the key",
        path: "vigenere"
      },
    ],
  },
  {
    id: 1,
    name: "stream",
    cipher: [
      {
        id: 4,
        name: "A5/1",
        description: "3 Registers and a key create a keystream to combine with the plaintext",
        path: "a51"
      },
      {
        id: 5,
        name: "RC4",
        description: "256 distinct bytes, a key, and constant permutations to generate a keystream to combine with plaintext",
        path: "rc4"
      },
    ],
  },
  {
    id: 2,
    name: "block",
    cipher: [
      {
        id: 6,
        name: "DES",
        description: "A Feistel Cipher, using a 56-bit key on 64-bit blocks of text to encrypt block by block",
        path: "des"
      },
      {
        id: 7,
        name: "AES-128",
        description: "Modern cipher encrypting 128-bit plaintext blocks using a key of 128 bits",
        path: "aes"
      },
      {
        id: 8,
        name: "TEA",
        description: "A simpler block cipher using a 128-bit key and a Feistel structure going through substantially higher rounds of encryption",
        path: "tea"
      },
    ],
  },
];

export default CipherList;
