import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:8000/api/auth/login/", { username, password });
    localStorage.setItem("token", res.data.access);
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Login</h2>
      <input onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
