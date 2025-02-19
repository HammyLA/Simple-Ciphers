import React, { useState } from 'react'
import { generateKey, subCipherDecrypt, subCipherEncrypt } from '../../ciphers/SubCipherImp'
import '../../styles/CipherComponent.css'
import { copyToClip } from '../Copy';

function Substitution({ input, onOutputSubmit }: { input: string | undefined; onOutputSubmit: (output: string) => void }) {
    const [key, setKey] = useState('')

    const handleEncrypt = () => {
        if (input) {
            const encrypted = subCipherEncrypt(input, key)
            onOutputSubmit(encrypted)
        }
    }

    const handleDecrypt = () => {
        if (input) {
            const decrypted = subCipherDecrypt(input, key)
            onOutputSubmit(decrypted);
        }
    }

    return (
        <div>
            <div className='ciphercomp'>
                <div>
                    <button id='copy' onClick={() => copyToClip(key)}></button>
                    <input placeholder='KEY' value={key} onChange={(e) => setKey(e.target.value)}></input>
                    <button onClick={() => setKey(generateKey())}>Generate Key</button>
                </div>
                <div>
                    <button onClick={handleEncrypt}>Encrypt</button>
                    <button onClick={handleDecrypt}>Decrypt</button>
                </div>
            </div>
        </div>
    )
}

export default Substitution

