import React, { useState } from 'react'
import { generateKey, OTPdecrypt, OTPencrypt } from '../../ciphers/OTPImp';
import { copyToClip } from '../Helper';

function OneTime({input, onOutputSubmit}: {input: string | undefined; onOutputSubmit: (output: string) => void }) {
  const [key, setKey] = useState('')

  const handleEncrypt = () => {
    if (input) {
      try {
        const encrypted = OTPencrypt(input, key)
        onOutputSubmit(encrypted)
      } catch {
        alert("Enter a key as long or longer than the message")
      }
    }
  }

  const handleDecrypt = () => {
    if (input) {
      try {
        const decrypted = OTPdecrypt(input, key)
        onOutputSubmit(decrypted)
      } catch {
        alert("Enter an input encoded in the One-Time-Pad")
      }
    }
  }

  return (
    <div>
      <div className='ciphercomp'>
        <div>
          <button id='copy' onClick={() => copyToClip(key)}></button>
          <input placeholder='KEY' value={key} onChange={(e) => setKey(e.target.value)}></input>
          <button onClick={() => setKey(generateKey(input || ''))}>Generate Key</button>
        </div>
        <div>
          <button onClick={handleEncrypt}>Encrypt</button>
          <button onClick={handleDecrypt}>Decrypt</button>
        </div>
      </div>
    </div>
  )
}

export default OneTime
