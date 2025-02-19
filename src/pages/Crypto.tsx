import React, { JSX, useEffect, useState } from 'react'
import TextBox from '../components/TextBox'
import { useLocation } from 'react-router-dom';
import Substitution from '../components/ciphercomps/Substitution';
import Caesar from '../components/ciphercomps/Caesar';
import OneTime from '../components/ciphercomps/OneTime';

const cipherComponents: { [key: string]: ({ input, onOutputSubmit }: { input: string | undefined; onOutputSubmit: (output: string) => void; }) => JSX.Element; } = {
  'Substitution Cipher': Substitution,
  'Caesar Cipher': Caesar,
  'One-Time Pad': OneTime,
}

function Crypto() {
  const location = useLocation();
  const cipher = location.state?.cipher;
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
