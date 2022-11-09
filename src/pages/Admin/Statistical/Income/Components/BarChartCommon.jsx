import { Box, MenuItem, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    ResponsiveContainer
} from 'recharts'

// const data = [
//     {
//         month: 'Tháng A',
//         income: 4000,
//         totalIncome: 2400
//     },
//     {
//         month: 'Tháng B',
//         income: 3000,
//         totalIncome: 1398
//     },
//     {
//         month: 'Tháng C',
//         income: 2000,
//         totalIncome: 9800
//     },
//     {
//         month: 'Tháng D',
//         income: 2780,
//         totalIncome: 3908
//     },
//     {
//         month: 'Tháng E',
//         income: 1890,
//         totalIncome: 4800
//     },
//     {
//         month: 'Tháng F',
//         income: 2390,
//         totalIncome: 3800
//     },
//     {
//         month: 'Tháng G',
//         income: 3490,
//         totalIncome: 4300
//     }
// ]

const years = [2020, 2021, 2022]

const DataFormater = (number) => {
    if (number > 1000000000) {
        return (number / 1000000000).toString() + 'B'
    } else if (number > 1000000) {
        return (number / 1000000).toString() + 'M'
    } else if (number > 1000) {
        return (number / 1000).toString() + 'K'
    } else {
        return number.toString()
    }
}

function BarChartCommon({ title, data, onChangeYear }) {
    const [month, setMonth] = useState(2022)

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
                        onChangeYear && onChangeYear(e.target.value)
                    }}>
                    {years.map((month) => (
                        <MenuItem key={month} value={month}>
                            {month}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>

            <ResponsiveContainer width="100%" height={250}>
                <BarChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 15,
                        bottom: 10
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                        type="number"
                        tick={{ fontSize: 14, width: 250 }}
                        tickFormatter={DataFormater}
                    />
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                    <Legend />

                    <Bar name="Doanh thu tháng" dataKey="Doanh thu tháng" fill="#82ca9d" />
                    <Bar
                        name="Tổng doanh thu tháng"
                        dataKey="Tổng doanh thu tháng"
                        fill="#8884d8"
                    />
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    )
}

export default BarChartCommon
