import React from 'react'
import '../styles/Auth.css'
import TextScramble from '../components/TextScramble'

function Authorization() {
  return (
    <div className='auth'>
      <div className='authabout'>
        <h1><TextScramble text="Simple Ciphers" /></h1>
        <p>Sign up to save your keys and ciphers as well as keep track of your user statistics</p>
      </div>
      <div className='authbox'>
        Testing
      </div>
    </div>
  )
}

export default Authorization
