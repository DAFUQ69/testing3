import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Balance = ({ userId }) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/api/balance/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching balance', error);
      }
    };

    fetchBalance();
  }, [userId]);

  return (
    <div>
      <h2>Balance</h2>
      <p>{balance}</p>
    </div>
  );
};

export default Balance;
