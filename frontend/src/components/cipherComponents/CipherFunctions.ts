// Importing all necessary cipher functions
import { TEADecrypt, TEAEncrypt, TEAGenerateKey } from '../../ciphers/block/TEAImplementation';
import { AESDecrypt, AESEncrypt, AESGenerateKey } from '../../ciphers/block/AESImplementation';
import { DESDecrypt, DESEncrypt, DESGenerateKey } from '../../ciphers/block/DESImplementation';
import { RC4Decrypt, RC4Encrypt, RC4GenerateKey } from '../../ciphers/stream/RC4Implementation';
import { A51Decrypt, A51Encrypt, A51GenerateKey } from '../../ciphers/stream/A51Implementation';
import { vigenereDecrypt, vigenereEncrypt, vigenereGenerateKey } from '../../ciphers/classic/VigenereImplementation';
import { OTPdecrypt, OTPencrypt, OTPGenerateKey } from '../../ciphers/classic/OTPImplementation';
import { subCipherDecrypt, subCipherEncrypt, substitutionGenerateKey } from '../../ciphers/classic/SubCipherImplementation';


// Every time we add a new cipher, we need to add it here and in the CipherList.ts file, ill try to unify them in the future
export const cipherFunctions: {
    [key: number]: {
        encrypt: (message: string, key: string) => string;
        decrypt: (message: string, key: string) => string;
        generateKey: (message?: string) => string;
    }
} = {
    1: {
        encrypt: subCipherEncrypt,
        decrypt: subCipherDecrypt,
        generateKey: substitutionGenerateKey, // Example: Substitution key
    },
    2: {
        encrypt: OTPencrypt,
        decrypt: OTPdecrypt,
        generateKey: OTPGenerateKey, // Example: One-time pad
    },
    3: {
        encrypt: vigenereEncrypt,
        decrypt: vigenereDecrypt,
        generateKey: vigenereGenerateKey, // Example: Vigenere key
    },
    4: {
        encrypt: A51Encrypt,
        decrypt: A51Decrypt,
        generateKey: A51GenerateKey, // Example: A5/1 key
    },
    5: {
        encrypt: RC4Encrypt,
        decrypt: RC4Decrypt,
        generateKey: RC4GenerateKey, // Example: RC4 key
    },
    6: {
        encrypt: DESEncrypt,
        decrypt: DESDecrypt,
        generateKey: DESGenerateKey, // Example: 8-byte DES key
    },
    7: {
        encrypt: AESEncrypt,
        decrypt: AESDecrypt,
        generateKey: AESGenerateKey, // Example: 16-byte AES key
    },
    8: {
        encrypt: TEAEncrypt,
        decrypt: TEADecrypt,
        generateKey: TEAGenerateKey, // Example: TEA key
    },
};