import React from 'react'
import '../styles/Login.css'


function Login() {
return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
            <h2>Login Page</h2>
            <form>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Email:</strong></label>
                    <input type="email" autoComplete='off' placeholder="Enter Email" name="email" />
                </div>
                <div className='mb-3'>
                    <label htmlFor="password"><strong>Password:</strong></label>
                    <input type="password" placeholder="Enter Password" name="password" />
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Log In </button>
                
            </form>
        </div>

      
    </div>
  )
}

export default Login