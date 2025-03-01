import { useState } from 'react'
import { A51Decrypt, A51Encrypt, generateKey } from '../../../ciphers/stream/A51Imp';
import { copyToClip, getError } from '../../Helper';

function A51({ input, onOutputSubmit }: { input: string | undefined; onOutputSubmit: (output: string) => void }) {
    const [key, setKey] = useState('')

    const handleEncrypt = () => {
        if (input) {
            try {
                const encrypted = A51Encrypt(input, key)
                onOutputSubmit(encrypted)
            } catch (error) {
                alert(getError(error))
            }
        }
    }

    const handleDecrypt = () => {
        if (input) {
            try {
                const decrypted = A51Decrypt(input, key)
                onOutputSubmit(decrypted)
            } catch (error) {
                alert(getError(error))
            }
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

export default A51
