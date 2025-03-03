import { useState } from 'react'
import { generateKey, vigenereDecrypt, vigenereEncrypt } from '../../../ciphers/classic/VigenereImplementation';
import { copyToClip, getError } from '../../Helper';

function Vigenere({ input, onOutputSubmit }: { input: string | undefined; onOutputSubmit: (output: string) => void }) {
  const [key, setKey] = useState('')
  
      const handleEncrypt = () => {
          if (input) {
              try {
                  const encrypted = vigenereEncrypt(input, key)
                  onOutputSubmit(encrypted)
              } catch (error) {
                  alert(getError(error))
              }
          }
      }
  
      const handleDecrypt = () => {
          if (input) {
              try {
                  const decrypted = vigenereDecrypt(input, key)
                  onOutputSubmit(decrypted);
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

export default Vigenere
