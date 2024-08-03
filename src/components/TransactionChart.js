import React, { useEffect, useState } from 'react';
import transactionService from '../services/transactionService';
import { Line } from 'react-chartjs-2';

const TransactionChart = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const result = await transactionService.getTransaction();
                const data = result.data;

                const dates = data.map(transaction => transaction.date);
                const amounts = data.map(transaction => transaction.amount);

                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Transactions',
                            data: amounts,
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 2,
                            fill: false,
                        }
                    ]
                });
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        fetchChartData();
    }, []);

    return (
        <div>
            <h2>Transaction Chart</h2>
            <Line data={chartData} />
        </div>
    );
};

export default TransactionChart;
