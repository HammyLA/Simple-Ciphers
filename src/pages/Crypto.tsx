import React from 'react'
import InputBox from '../components/InputBox'
import OutputBox from '../components/OutputBox'

function Crypto() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <InputBox />
      <button style={{alignSelf: "center"}}>Encrypt</button>
      <OutputBox />
    </div>
  )
}

export default Crypto
