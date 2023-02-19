import React, { useState } from 'react';
import "../css/login.css"

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the input
    if (!username || !password) {
      setError('Please enter a username and password.');
      return;
    }

    // Authenticate the user
    if (username === 'admin' && password === 'password') {
      // Redirect to the home page
      window.location.replace('/adminPanel');
    } else {
      setError('Incorrect username or password.');
    }
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit}>
        <h1>Owner Login</h1>
        {error && <p className="error">{error}</p>}
        <label>
          <span>Username:</span>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          <span>Password:</span>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;