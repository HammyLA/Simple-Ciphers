// Child Component: CryptoWithKey
import { useState } from 'react';
import { copyToClip, getError } from '../Helper';
import { ToastContainer } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';
import { cipherFunctions } from './CipherFunctions';

// Updates encrypts and decrypts when users use the cipher. This is for the global stats page.
async function incrementCipher(mode: 'encrypt' | 'decrypt', ciphername: string) {
    try {
        await fetch(import.meta.env.VITE_API_BASE + `/globalstats/${mode}/${ciphername}`, {
            method: "POST"
        })
    } catch (err) {
        console.log(getError(err))
    }
}

// This is a lot of parameters, but the cryptosystem file provides input and cipher and the ciphersystem file submits the resulting output from the logic
// to the cryptosystem file to show.
function CryptoWithKey({ input, onOutputSubmit, cipherId, cipherName }: { input: string | undefined; onOutputSubmit: (output: string) => void; cipherId: number; cipherName: string }) {
    const [key, setKey] = useState('');
    const { isAuthenticated } = useAuth0()

    const handleEncrypt = () => {
        if (input && key) {
            try {
                // Uses the encryption function from the corresponding cipherId. This allows for modular use of this file.
                const encrypted = cipherFunctions[cipherId].encrypt(input, key);
                incrementCipher('encrypt', cipherName)
                onOutputSubmit(encrypted);
            } catch (error) {
                alert(getError(error));
            }
        }
        else {
            alert("Key / input cannot be empty")
        }
    };

    const handleDecrypt = () => {
        if (input && key) {
            try {
                // Uses the decryption function from the corresponding cipherId. This allows for modular use of this file.
                const decrypted = cipherFunctions[cipherId].decrypt(input, key);
                incrementCipher('decrypt', cipherName)
                onOutputSubmit(decrypted);
            } catch (error) {
                alert(getError(error));
            }
        }
        else {
            alert("Key / input cannot be empty")
        }
    };

    // Saves the key to the user if they are signed in. This will be shown in the profile page.
    // If the server isn't awake this could be a problem though. Will fix.
    const saveKey = async (key: string) => {
        if (key && localStorage.getItem('JWTauthToken') && isAuthenticated) {
            try {
                const response = await fetch(import.meta.env.VITE_API_BASE + '/keys', {
                    method: "POST",
                    headers: { 'Authorization': localStorage.getItem('JWTauthToken') as string, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ key: key, cipher: cipherName })
                })
                console.log(await response.json())
            } catch (err) {
                alert(getError(err))
            }
        }
        else {
            alert("Please Enter a Key")
        }
    }

    return (
        <>
            <ToastContainer />
            <div>
                <div className='ciphercomp'>
                    <div>
                        <button disabled={!localStorage.getItem('JWTauthToken') && isAuthenticated} onClick={() => saveKey(key)}>Save</button>
                        <button id='copy' onClick={() => copyToClip(key)}></button>
                        <input placeholder='KEY' value={key} onChange={(e) => setKey(e.target.value)}></input>
                        <button onClick={() => setKey(cipherFunctions[cipherId].generateKey)}>Generate Key</button>
                    </div>
                    <div>
                        <button onClick={handleEncrypt}>Encrypt</button>
                        <button onClick={handleDecrypt}>Decrypt</button>
                    </div>
                </div>
            </div>
        </>

    );
}

export default CryptoWithKey
