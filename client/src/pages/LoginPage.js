import React from 'react'
import "./login.css"
export default function LoginPage() {
    const loginwithgoogle = ()=>{
        window.open("http://localhost:6005/auth/google/callback","_self")
    }
  return (
    <>
    <div className="login-page">
        
        <div className="form">
        <h1 style={{textAlign:"center"}}>Welcome</h1>
            {/* <form className='login-form'>
                <input type="text" name="" id="" placeholder='username' />
                <input type="password" name="" id="" placeholder='password'  />
                <button>Login</button>
                <p className='message'>Not Registerd? <a href="#">Create an account</a></p>
            </form> */}
            <button className='login-with-google-btn' onClick={loginwithgoogle}>
                Sign In With Google
            </button>
        </div>
    </div>
</>

  );
}
