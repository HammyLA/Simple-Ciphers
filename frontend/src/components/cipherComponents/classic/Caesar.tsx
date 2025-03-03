import { useState } from 'react'
import { caesarDecrypt, caesarEncrypt } from '../../../ciphers/classic/CaesarImplementation';
import { getError } from '../../Helper';

function Caesar({ input, onOutputSubmit }: { input: string | undefined; onOutputSubmit: (output: string) => void }) {
  const [shift, setShift] = useState(0)

  const handleEncrypt = () => {
    if (input) {
      try {
        const encrypted = caesarEncrypt(input, shift)
        onOutputSubmit(encrypted)
      } catch (error) {
        alert(getError(error))
      }

    }
  }

  const handleDecrypt = () => {
    if (input) {
      try {
        const decrypted = caesarDecrypt(input, shift)
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
          <button disabled={shift <= 0} onClick={() => setShift(shift - 1)}>-</button>
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
