import React, { useState, useEffect } from 'react';
import transactionService from '../services/transactionService';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const result = await transactionService.getTransaction(page, query, filter);
                setTransactions(result.data || []);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [page, query, filter]);

    if (!Array.isArray(transactions)) {
        return <div>No transactions found</div>;
    }

    return (
        <div>
            <h2>Transactions</h2>
            <input 
                type="text" 
                placeholder="Search..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
            />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction.id}>
                        {transaction.description}: ${transaction.amount}
                    </li>
                ))}
            </ul>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    );
};

export default TransactionList;
