import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Category B', value: 350 },
    { name: 'Category A', value: 500 },
    { name: 'Category C', value: 150 },
];

const COLORS = ['#0056D2', '#D4A700', '#009A77'];


function PiChart() {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Tooltip />
                <Legend />
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    fill="#8884d8"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}

export default PiChart;
