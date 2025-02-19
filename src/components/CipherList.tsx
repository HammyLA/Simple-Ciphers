import { ReactNode } from "react";
import Substitution from "./ciphercomps/Substitution";

interface Cipher {
  id: number;
  name: string;
  description: string;
}

const CipherList: { id: number, name: string; cipher: Cipher[] }[] = [
  {
    id: 0,
    name: "classic",
    cipher: [
      {
        id: 0,
        name: "Caesar Cipher",
        description: "Alphabet shifted based on a value",
      },
      {
        id: 1,
        name: "Substitution Cipher",
        description: "Letter assigned to another letter",
      },
      {
        id: 2,
        name: "One-Time Pad",
        description: "Plaintext combined with a random secret key",
      },
      {
        id: 3,
        name: "Vigenere Cipher",
        description: "The shift of each letter is determined by the corresponding letter of the key",
      },
    ],
  },
  {
    id: 1,
    name: "stream",
    cipher: [
      {
        id: 0,
        name: "A5/1",
        description: "3 Registers and a key create a keystream to combine with the plaintext",
      },
      {
        id: 1,
        name: "RC4",
        description: "256 distinct bytes, a key, and constant permutations to generate a keystream to combine with plaintext",
      },
    ],
  },
  {
    id: 2,
    name: "block",
    cipher: [
      {
        id: 0,
        name: "DES",
        description: "A Feistel Cipher, using a 56-bit key on 64-bit blocks of text to encrypt block by block",
      },
      {
        id: 1,
        name: "AES",
        description: "Encrypting 128-bit plaintext blocks using keys of varying sizes (128, 192, 256 bits)",
      },
      {
        id: 1,
        name: "TEA",
        description: "A simpler block cipher using a 128-bit key and a Feistel structure going through substantially higher rounds of encryption",
      },
    ],
  },
];

export default CipherList;
