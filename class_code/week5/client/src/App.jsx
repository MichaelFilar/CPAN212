import { useState, useEffect } from "react";

const App = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchData = async() => {
    try {
      const response = await fetch(`http://localhost:8000/data`)
      const data = await response.json();

      setMessage(JSON.stringify(data));

    } catch (err) {
console.log(err)
    }
  }

  const loginForm = async(e) => {
    e.preventDefault();
    const submission = {email, password};
    try {
      const response = await fetch(`http://localhost:8000/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(submission)
    });
      const data = await response.json();
      setMessage(JSON.stringify(data));
    } catch(err) {console.log(err)}
  }

  return(
  <div>
    {message}

    <button onClick={fetchData}>Click me for data.</button>
    <form onSubmit={loginForm}>
      <input 
        type="email"
        placeholder="email"
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
        required
      />
      <input 
        type="password"
        placeholder="password"
        value={password}
        onChange={(e)=>{setPassword(e.target.value)}}
        required
      />
      <button type="submit">Login</button>
    </form>
  </div>
  )
}

export default App;