import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', trend1: 30, trend2: 40, trend3: 50, trend4: 20 },
    { name: 'Feb', trend1: 45, trend2: 35, trend3: 60, trend4: 30 },
    { name: 'Mar', trend1: 28, trend2: 50, trend3: 45, trend4: 25 },
    { name: 'Apr', trend1: 50, trend2: 60, trend3: 70, trend4: 40 },
    { name: 'May', trend1: 55, trend2: 65, trend3: 80, trend4: 45 },
    { name: 'Jun', trend1: 70, trend2: 80, trend3: 85, trend4: 50 },
    { name: 'Jul', trend1: 60, trend2: 70, trend3: 90, trend4: 55 },
];

function TrendChart() {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <CartesianGrid vertical={false}
                    horizontal stroke="#b7b5b8" strokeDasharray="0" />
                <XAxis
                    dataKey="name"
                    stroke="white"                 // X-Axis labels
                    tick={{ fill: 'white' }}
                />
                <YAxis
                    stroke="white"                 // Y-Axis labels
                    tick={{ fill: 'white' }}
                />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="trend1"
                    stroke="#FFFF99"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                />
                <Line
                    type="monotone"
                    dataKey="trend2"
                    stroke="#90EE90"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                />
                <Line
                    type="monotone"
                    dataKey="trend3"
                    stroke="orange"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                />
                <Line
                    type="monotone"
                    dataKey="trend4"
                    stroke="#ADD8E6"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default TrendChart;
