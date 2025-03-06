interface Cipher {
    Encrypt(input: string, key: string): string
    Decrypt(input: string, key: string): string
}

export default Cipher