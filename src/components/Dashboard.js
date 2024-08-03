import React from 'react';
import TransactionChart from './TransactionChart';
import TransactionList from './TransactionList';

const Dashboard = () => {
  return (
    <div>
        <div>
          <h1>Dashboard</h1>
          <TransactionList />
          <TransactionChart />
        </div>

    </div>
  );
};

export default Dashboard;
