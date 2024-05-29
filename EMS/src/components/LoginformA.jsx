import React from 'react';
import '../styles/Login.css';

function LoginformA() {
return (
    <>
    <div id="header">
        <nav>
          <div id="logo-img">
            <img src="../Images/mainlogo.png" alt="logo" />
          </div>
          <ul>
            <li>
              <a href="/login">BACK</a>
            </li>
          </ul>
        </nav>
      </div>
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
        <form>
        
        <h2 className="center-align">Admin</h2>
  <div className='mb-3'>
    <label htmlFor="uid"><strong>Unique Id</strong></label><br />
    <input type="uid" autoComplete='off' placeholder="Enter UID" name="uid" className='form-control' id="uid" />
  </div>
  <div className='mb-3'>
    <label htmlFor="password"><strong>Password</strong></label><br />
    <input type="password" placeholder="Enter Password" name="password" className='form-control' id="password" />
  </div>
  <button className='btn btn-primary w-100 rounded-0 mb-2'>Log In</button>
</form>

        </div>

      
    </div>
    </>
  )
};

export default LoginformA;