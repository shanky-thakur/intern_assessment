import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const [message, setMessage] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // send login request
  const handleSend = async () => {
    try {
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate('/home');
      }
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    // outer div
    <div style={{ width: "80%", height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
      {/* form div */}
      <div style={{ width: "100%", height: "85%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
        {/* heading log in */}
        <div style={{ height: "22%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "2rem" }}>
          Log In Form
        </div>

        {/* username heading */}
        <div style={{ width: "100%", height: "10%", display: "flex", alignItems: "center", fontSize: "1.5rem" }}>
          username
        </div>

        {/* username textarea */}
        <div style={{ width: "100%", height: "10%", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid" }}>
          <textarea onChange={(e) => setUserName(e.target.value)} placeholder='username' style={{ width: "100%", height: "100%", resize: "none", border: "none", fontSize: "1.5rem" }}></textarea>
        </div>

        {/* password heading */}
        <div style={{ width: "100%", height: "10%", display: "flex", alignItems: "center", fontSize: "1.5rem" }}>
          password
        </div>

        {/* password textarea */}
        <div style={{ width: "100%", height: "10%", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid" }}>
          <textarea onChange={(e) => setPassword(e.target.value)} placeholder='password' style={{ width: "100%", height: "100%", resize: "none", border: "none", fontSize: "1.5rem" }}></textarea>
        </div>

        {/* button div */}
        <div style={{ height: "22%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div onClick={handleSend} style={{ width: "30%", height: "40%", background: "#4b5cecff", borderRadius: "20px", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1rem", cursor: "default" }}>
            Log In
          </div>
        </div>
      </div>

      {/* message div */}
      <div style={{ width: "100%", height: "10%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {message}
      </div>
    </div>
  )
}

export default LogIn
