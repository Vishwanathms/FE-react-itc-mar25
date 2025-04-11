import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');

  // Fetch /hello when page loads
  useEffect(() => {
    fetch('https://y6od30h9b3.execute-api.us-east-1.amazonaws.com/uat/hello')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => console.error('Error fetching message:', err));
  }, []);

  // Fetch /rds-password only when button is clicked
  const fetchPassword = () => {
    fetch('https://y6od30h9b3.execute-api.us-east-1.amazonaws.com/uat/rds-password')
      .then(res => res.text())
      .then(data => setPassword(data))
      .catch(err => console.error('Error fetching password:', err));
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Spring Boot + React Demo</h1>
      <p>Message from backend: <strong>{message}</strong></p>

      <button onClick={fetchPassword} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
        Get RDS Password
      </button>

      {password && (
        <p style={{ marginTop: '1rem' }}>
          RDS Password: <strong>{password}</strong>
        </p>
      )}
    </div>
  );
}

export default App;
