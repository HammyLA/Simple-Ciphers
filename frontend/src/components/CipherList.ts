interface Cipher {
  id: number;
  name: string;
  description: string;
  longDescription: string;
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
        longDescription: "The Caesar Cipher is a simple and ancient encryption technique where each letter in a message is shifted a fixed number of positions down the alphabet. For example, with a shift of 3, A becomes D, B becomes E, and so on, wrapping around at the end of the alphabet. To decode the message, the letters are shifted back by the same amount. This method, named after Julius Caesar who used it for military communication, is one of the earliest known forms of secret writing and is easy to understand and implement. However, it is also very easy to break, making it unsuitable for serious encryption today. Despite its simplicity, the Caesar Cipher serves as a great introduction to the concepts of encryption and decryption.",
        path: "caesar",
      },
      {
        id: 1,
        name: "Substitution Cipher",
        description: "Letter assigned to another letter",
        longDescription: "The Substitution Cipher is a method of encryption where each letter in the original message is replaced with a different letter according to a fixed, secret alphabet key. Unlike the Caesar Cipher, which shifts letters by a set amount, the Substitution Cipher uses a completely scrambled version of the alphabet, making each letter’s replacement unique and more difficult to guess. To decode the message, the recipient must know the exact substitution pattern used. This cipher offers stronger security than simpler methods and has been used throughout history to hide messages in a more customized way.",
        path: "substitution",
      },
      {
        id: 2,
        name: "One-Time Pad",
        description: "Plaintext combined with a random secret key",
        longDescription: "The One-Time Pad is a highly secure encryption technique that uses a completely random key that is as long as the message itself. Each letter or character of the message is combined with the corresponding character from the key using modular arithmetic (like shifting letters), resulting in a ciphertext that is nearly impossible to crack without the exact key. What makes the One-Time Pad special is that if the key is truly random, used only once, and kept completely secret, the encryption is theoretically unbreakable. However, its practicality is limited due to the difficulty of generating, sharing, and storing large random keys securely.",
        path: "otp",
      },
      {
        id: 3,
        name: "Vigenere Cipher",
        description: "The shift of each letter is determined by the corresponding letter of the key",
        longDescription: 'The Vigenère Cipher is a method of encrypting text by using a keyword to determine how much each letter in the message should be shifted. Instead of using a single shift like the Caesar Cipher, the Vigenère Cipher uses a series of Caesar shifts based on the letters of the keyword, which repeats across the message. For example, if the keyword is "KEY" and the message is "HELLO", each letter in "HELLO" is shifted by the amount corresponding to K, E, and Y in turn. This makes the cipher more secure by introducing multiple shifting patterns, making frequency analysis attacks much harder to perform without the keyword.',
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
        name: "A5-1",
        description: "3 Registers and a key create a keystream to combine with the plaintext",
        longDescription: "The A5/1 Cipher is a stream cipher used to encrypt voice and data in GSM (2G) mobile phone networks. It works by generating a keystream using three linear feedback shift registers (LFSRs) that are clocked in a complex way based on a 64-bit secret key. Each bit of the keystream is combined with the corresponding bit of the voice or data using XOR to produce encrypted output. Designed for speed and simplicity in hardware, A5/1 was once standard in many GSM networks, though it has since been shown to be vulnerable to various cryptographic attacks and replaced by stronger algorithms in newer mobile technologies.",
        path: "a51"
      },
      {
        id: 5,
        name: "RC4",
        description: "256 distinct bytes, a key, and constant permutations to generate a keystream to combine with plaintext",
        longDescription: "RC4 (Rivest Cipher 4) is a fast and simple stream cipher that was widely used for encrypting data in protocols like SSL, TLS, and WEP. It works by initializing a 256-byte array with a secret key and then generating a pseudorandom keystream, which is XORed with the plaintext to produce ciphertext. Its simplicity and speed made it popular for many years, but weaknesses in its key scheduling and keystream generation have led to practical attacks. As a result, RC4 is now considered insecure and is no longer recommended for modern encryption needs.",
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
        longDescription: "DES (Data Encryption Standard) is a symmetric-key block cipher that was once a widely used standard for securing digital data. It encrypts data in 64-bit blocks using a 56-bit key through a series of complex operations involving substitution and permutation over 16 rounds. Designed for hardware efficiency, DES was adopted in the 1970s for government and commercial use. However, due to advances in computing power, its 56-bit key length is now considered too short, making it vulnerable to brute-force attacks. DES has since been replaced by more secure algorithms like AES, but it played a foundational role in the development of modern cryptography.",
        path: "des"
      },
      {
        id: 7,
        name: "AES-128",
        description: "Modern cipher encrypting 128-bit plaintext blocks using a key of 128 bits",
        longDescription: "AES-128 (Advanced Encryption Standard with a 128-bit key) is a symmetric-key block cipher widely used for securing data. It encrypts data in fixed 128-bit blocks using a 128-bit key, performing 10 rounds of substitution, permutation, and key mixing to transform the plaintext into ciphertext. AES-128 is considered secure and efficient, offering a good balance between speed and security. It is widely used in various applications, including secure communications, file encryption, and government standards. While AES supports key sizes of 128, 192, and 256 bits, AES-128 is often chosen for its faster performance while still providing strong encryption.",
        path: "aes"
      },
      {
        id: 8,
        name: "TEA",
        description: "A simpler block cipher using a 128-bit key and a Feistel structure going through substantially higher rounds of encryption",
        longDescription: "TEA (Tiny Encryption Algorithm) is a symmetric-key block cipher designed to be simple, fast, and compact, making it suitable for constrained environments like embedded systems. It operates on 64-bit blocks of data and uses a 128-bit key. TEA employs a series of simple operations, including bitwise shifts, XORs, and additions, repeated over 32 rounds to create strong encryption. Its simplicity and efficiency made it popular for lightweight encryption tasks. However, TEA has known vulnerabilities, such as weak key schedules and susceptibility to related-key attacks. As a result, more secure variants like XTEA (Extended TEA) have been developed.",
        path: "tea"
      },
    ],
  },
];

export default CipherList;
