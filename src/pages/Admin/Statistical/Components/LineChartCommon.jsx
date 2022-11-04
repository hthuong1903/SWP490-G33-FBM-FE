import React, { useState } from 'react'
import { Box, MenuItem, Paper, TextField, Typography } from '@mui/material'
import {
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line
} from 'recharts'
const data = [
    {
        month: 'Tháng A',
        income: 4000,
        totalIncome: 2400
    },
    {
        month: 'Tháng B',
        income: 3000,
        totalIncome: 1398
    },
    {
        month: 'Tháng C',
        income: 2000,
        totalIncome: 9800
    },
    {
        month: 'Tháng D',
        income: 2780,
        totalIncome: 3908
    },
    {
        month: 'Tháng E',
        income: 1890,
        totalIncome: 4800
    },
    {
        month: 'Tháng F',
        income: 2390,
        totalIncome: 3800
    },
    {
        month: 'Tháng G',
        income: 3490,
        totalIncome: 4300
    }
]

const monthInSemester = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

function LineChartCommon({ title }) {
    const [month, setMonth] = useState(1)

    return (
        <Paper>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2
                }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {title}
                </Typography>
                <TextField
                    size="small"
                    variant="standard"
                    id="standard-select"
                    select
                    value={month}
                    onChange={(e) => {
                        setMonth(e.target.value)
                    }}>
                    {monthInSemester.map((month) => (
                        <MenuItem key={month} value={month}>
                            Tháng {month}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>

            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line name="Hứa Đức Sầu" type="monotone" dataKey="income" stroke="#8884d8" />
                    <Line
                        name="Hứa Đức Cường"
                        type="monotone"
                        dataKey="totalIncome"
                        stroke="#82ca9d"
                    />
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    )
}

export default LineChartCommon
