import '../styles/Auth.css'
import TextScramble from '../components/TextScramble'
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

function checkValidPassword(password: string) {
  var validExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  if (password.length < 8 || password.length > 16) {
    throw new Error("Password must be between 8-16 characters")
  }
  if (!validExpression.test(password)) {
    throw new Error("Password should contain atleast one number and one special character")
  }
}

function checkFormIsFilled(formData: FormData) {
  for (const pair of formData.entries()) {
    if (!pair[1]) {
      throw new Error("All fields must be filled")
    }
  }

}

function Authorization() {
  const [register, setRegister] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('authToken') != undefined)



  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    console.log(formData.get("username"))

    try {
      checkValidPassword(formData.get("password") as string)
      checkFormIsFilled(formData)

      const username = formData.get("username")
      const password = formData.get("password")

      // Register user
      if (register) {
        if (formData.get("password") != formData.get("confirmPassword")) {
          throw new Error("Passwords don't match")
        }
        const email = formData.get("email")
        const response = await fetch(import.meta.env.VITE_API_BASE + '/auth/register', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password, email: email })
        })
        const data = await response.json()
        const token = data.token
        console.log(token)
        setLoggedIn(true)
        localStorage.setItem('authToken', token)
      }
      // Login user
      else {
        const response = await fetch(import.meta.env.VITE_API_BASE + '/auth/login', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username: username, password: password })
        })
        const data = await response.json()
        const token = data.token
        console.log(token)
        setLoggedIn(true)
        localStorage.setItem('authToken', token)
      }

    } catch (err: any) {
      console.log(err.message)
      setErrorMessage(err.message)
    }


  }

  if (loggedIn) {
    return <Navigate to='/'></Navigate>
  }
  else {
    return (
      <div className='auth'>
        <div className='authabout'>
          <h1><TextScramble text="Simple Ciphers" /></h1>
          <p>Sign up to save your keys and ciphers as well as keep track of your user statistics</p>
        </div>
        <div className='authbox'>
          <div id='box'>
            <form onSubmit={handleSubmit}><h1>{register ? "Sign up" : "Login"}</h1>
              {errorMessage ? <p id='error'>{errorMessage}</p> : ''}
              <p>Username</p>
              <input type='username' name='username' placeholder='username'></input>
              {register ? <><p>Email</p><input type='email' name='email' placeholder='email'></input></> : ''}
              <p>Password</p>
              <input type='password' name='password' placeholder='password'></input>
              {register ? <><p>Confirm password</p>
                <input type='password' name='confirmPassword' placeholder='confirm password'></input></> : ''}
              <div id='button'>
                <button type='submit'>{register ? "Sign up" : "Login"}</button>
                <a onClick={() => register ? setRegister(false) : setRegister(true)}>{register ? "Have an account? Login here" : "Register an account"}</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Authorization

