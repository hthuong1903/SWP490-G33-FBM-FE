import { Box, Card, CardContent, MenuItem, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const years = [2020, 2021, 2022]

function CommonCard({ title, data, onChangeYear }) {
    const [month, setMonth] = useState(2022)

    return (
        <Card sx={{ minWidth: 275, mr: 5 }}>
            <CardContent>
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

                <Typography variant="h5" component="div">
                    {data}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CommonCard
