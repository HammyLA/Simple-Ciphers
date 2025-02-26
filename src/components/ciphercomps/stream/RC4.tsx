import { useState } from 'react'
import { copyToClip, errorMessage } from '../../Helper'
import { generateKey, RC4Decrypt, RC4Encrypt } from '../../../ciphers/stream/RC4Imp';

function RC4({ input, onOutputSubmit }: { input: string | undefined; onOutputSubmit: (output: string) => void }) {
    const [key, setKey] = useState('')

    const handleEncrypt = () => {
        if (input) {
            try {
                const encrypted = RC4Encrypt(input, key)
                onOutputSubmit(encrypted)
            } catch (error) {
                alert(errorMessage(error))
            }
        }
    }

    const handleDecrypt = () => {
        if (input) {
            try {
                const decrypted = RC4Decrypt(input, key)
                onOutputSubmit(decrypted)
            } catch (error) {
                alert(errorMessage(error))
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

export default RC4
