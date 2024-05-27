import React from 'react'
import './style.css'

const Login = () => {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
            <h2>Login Page</h2>
            <form>
                <div>
                    <label htmlFor="email"><strong>Email:</strong></label>
                    <input type="email" autoComplete='off' placeholder="Enter Email" name="email" 
                    className='form-control rounded-0' />
                </div>
                <div>
                    <label htmlFor="password"><strong>Password:</strong></label>
                    <input type="password" placeholder="Enter Password" name="password" 
                    className='form-control rounded-0' />
                </div>
                <button className='btn btn-success w-100 rounded-0'>Submit</button>
                
            </form>
        </div>

      
    </div>
  )
}

export default Login
