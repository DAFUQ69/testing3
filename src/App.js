import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const App = () => {
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div>
      {!user ? (
        <div>
          {isRegistering ? (
            <Register setUser={setUser} />
          ) : (
            <Login setUser={setUser} />
          )}
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Already have an account? Login' : 'Register'}
          </button>
        </div>
      ) : (
        <div>
          <Dashboard/>
        </div>
      )}
    </div>
  );
};

export default App;
