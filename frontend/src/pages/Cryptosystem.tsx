// Parent Component: Crypto
import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import PageNotFound from './PageNotFound';
import CryptoWithKey from '../components/cipherComponents/CryptoWithKey'
import TextBox from '../components/TextBox';
import Caesar from '../components/cipherComponents/Caesar';



function Crypto() {

  const location = useLocation();
  if (location.state === null) {
    return <PageNotFound />;
  }
  const cipher = location.state.cipher;
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>{cipher.name}</h1>
      <p style={{width: '70%', fontSize: '20px', textAlign: 'center'}}>{cipher.longDescription}</p>
      <TextBox type="input" text={input} setText={setInput} />

      {/* Every cipher but the Caesar cipher has a key, so generate that separately. */}
      {/* The components call the logic of the cipher which may bloat this file, so I'll keep these separate */}
      {cipher.id === 0 ? <Caesar input={input} onOutputSubmit={setOutput} cipherName={cipher.name}/> : <CryptoWithKey
        input={input}
        onOutputSubmit={setOutput}
        cipherId={cipher.id}
        cipherName={cipher.name}
      />}
      <TextBox type="output" text={output} />
    </div>
  );
}

export default Crypto;
