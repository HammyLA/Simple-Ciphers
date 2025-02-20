import React, { JSX, useEffect, useState } from 'react'
import TextBox from '../components/TextBox'
import { useLocation } from 'react-router-dom';
import Substitution from '../components/ciphercomps/classic/Substitution';
import Caesar from '../components/ciphercomps/classic/Caesar';
import OneTime from '../components/ciphercomps/classic/OneTime';
import Vigenere from '../components/ciphercomps/classic/Vigenere';
import PageNotFound from './PageNotFound';
import A51 from '../components/ciphercomps/stream/A51';
import RC4 from '../components/ciphercomps/stream/RC4';

const cipherComponents: { [key: string]: ({ input, onOutputSubmit }: { input: string | undefined; onOutputSubmit: (output: string) => void; }) => JSX.Element; } = {
  'Substitution Cipher': Substitution,
  'Caesar Cipher': Caesar,
  'One-Time Pad': OneTime,
  'Vigenere Cipher': Vigenere,
  'A5/1': A51,
  'RC4': RC4,
}

function Crypto() {
  const location = useLocation()
  if (location.state === null) {
    return (
      <PageNotFound />
    )
  }
  const cipher = location.state.cipher
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('')

  

  const CipherComponent = cipherComponents[cipher.name]
  if (CipherComponent == undefined) {
    console.log('hi')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>{cipher.name}</h1>
      <TextBox type="input" text={input} setText={setInput} />
      {CipherComponent === undefined ? <div>Sorry, not done yet</div>: <CipherComponent input={input} onOutputSubmit={setOutput} />}
      <TextBox type="output" text={output} />
    </div>
  )
}

export default Crypto
