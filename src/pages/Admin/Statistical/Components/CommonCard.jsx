import { Box, Card, CardContent, MenuItem, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const monthInSemester = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

function CommonCard({ title }) {
    const [month, setMonth] = useState(1)

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
                        }}>
                        {monthInSemester.map((month) => (
                            <MenuItem key={month} value={month}>
                                Tháng {month}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                <Typography variant="h5" component="div">
                    5.15$
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CommonCard
