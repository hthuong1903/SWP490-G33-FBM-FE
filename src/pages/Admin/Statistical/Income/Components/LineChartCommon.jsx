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
// const data = [
//     {
//         name: 1,
//         employees: ['Thuong', 'Cuong', 'Hoang', 'Quyet'],
//         Thuong: 1000000,
//         Cuong: 2000000,
//         Hoang: 3000000,
//         Quyet: 4000000
//     },
//     {
//         name: 2,
//         employees: ['Thuong', 'Cuong', 'Hoang', 'Quyet'],
//         Thuong: 1500000,
//         Cuong: 1900000,
//         Hoang: 2500000,
//         Quyet: 1000000
//     },
//     {
//         name: 3,
//         employees: ['Thuong', 'Cuong', 'Hoang', 'Quyet'],
//         Thuong: 5000000,
//         Cuong: 6000000,
//         Hoang: 7000000,
//         Quyet: 3000000
//     },
//     {
//         name: 4,
//         employees: ['Thuong', 'Cuong', 'Hoang', 'Quyet'],

//         Cuong: 2500000,
//         Hoang: 4000000,
//         Quyet: 3200000,
//         Thuong: 3000000
//     }
// ]

const years = [2020, 2021, 2022]

const getColorArray = (num) => {
    var result = []
    for (var i = 0; i < num; i += 1) {
        var letters = '0123456789ABCDEF'.split('')
        var color = '#'
        for (var j = 0; j < 6; j += 1) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        result.push(color)
    }
    return result
}

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

function LineChartCommon({ title, onChangeYear, employee, data }) {
    const [month, setMonth] = useState(2022)
    const color = getColorArray(data.length)
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
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis
                        type="number"
                        tick={{ fontSize: 14, width: 250 }}
                        tickFormatter={DataFormater}
                    />
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                    <Legend />
                    {/* <Line
                        name="Huyen Trinh Lan"
                        type="monotone"
                        dataKey="Huyen Trinh Lan"
                        stroke="#8884d8"
                    />
                    <Line
                        name="Nguyen Hoai Thuong"
                        type="monotone"
                        dataKey="Nguyen Hoai Thuong"
                        stroke="#82ca9d"
                    />
                    <Line
                        name="lan tung minh"
                        type="monotone"
                        dataKey="lan tung minh"
                        stroke="#82ca9d"
                    />
                    <Line
                        name="string string string"
                        type="monotone"
                        dataKey="string string string"
                        stroke="#82ca9d"
                    /> */}
                    {employee.map((item, index) => (
                        <Line
                            key={index}
                            name={item}
                            type="monotone"
                            dataKey={item}
                            stroke={color[index]}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    )
}

export default LineChartCommon
