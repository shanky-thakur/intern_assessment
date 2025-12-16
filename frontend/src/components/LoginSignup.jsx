import React from 'react';

import SignUp from './SignUp';
import LogIn from './LogIn';

const LoginSignup = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>

      {/* Sign Up */}
      <div style={{ width: "50%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <SignUp />
      </div>

      {/* Login */}
      <div style={{ width: "50%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <LogIn />
      </div>

    </div>
  )
}

export default LoginSignup
