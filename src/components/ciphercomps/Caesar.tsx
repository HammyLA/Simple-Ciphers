import React, { useState } from 'react'
import { caesarDecrypt, caesarEncrypt } from '../../ciphers/CaesarImp';

function Caesar({ input, onOutputSubmit }: { input: string | undefined; onOutputSubmit: (output: string) => void }) {
  const [shift, setShift] = useState(0)

  const handleEncrypt = () => {
    if (input) {
      try {
        const encrypted = caesarEncrypt(input, shift)
        onOutputSubmit(encrypted)
      } catch {
        alert("Please use letters only in your input")
      }

    }
  }

  const handleDecrypt = () => {
    if (input) {
      try {
        const decrypted = caesarDecrypt(input, shift)
        onOutputSubmit(decrypted)
      } catch {
        alert("Please use letters only in your input")
      }
    }
  }

  return (
    <div>
      <div className='ciphercomp'>
        <div>
          <button onClick={() => setShift(shift - 1)}>-</button>
          <input type="number" placeholder='SHIFT' value={shift} onChange={(e) => setShift(e.target.valueAsNumber)}></input>
          <button onClick={() => setShift(shift + 1)}>+</button>
        </div>
        <div>
          <button onClick={handleEncrypt}>Encrypt</button>
          <button onClick={handleDecrypt}>Decrypt</button>
        </div>
      </div>
    </div>
  )
}

export default Caesar
