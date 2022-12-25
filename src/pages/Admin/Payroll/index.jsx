import { Box, Divider, MenuItem, Tab, Tabs, TextField } from '@mui/material'
import React, { useState } from 'react'
import Bonus from './Bonus'
import Salary from './Salary'
import Allowance from './Allowance'
import { Provider } from './contexts/contexts'

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    }
}

const _month = new Date().getMonth() + 1
const _year = new Date().getFullYear()

function Payroll() {
    const [month, setMonth] = useState(_month)
    const [year, setYear] = useState(_year)
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <>
            <Box sx={{ mb: 2, mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <TextField
                        id="outlined-select-currency"
                        select
                        size="small"
                        label="Tháng"
                        value={month}
                        onChange={(event) => {
                            setMonth(event.target.value)
                            // getTimeSheetPeriods(event.target.value + '' + year)
                        }}
                        sx={{ mr: 2 }}>
                        <MenuItem value={1}>Tháng 1</MenuItem>
                        <MenuItem value={2}>Tháng 2</MenuItem>
                        <MenuItem value={3}>Tháng 3</MenuItem>
                        <MenuItem value={4}>Tháng 4</MenuItem>
                        <MenuItem value={5}>Tháng 5</MenuItem>
                        <MenuItem value={6}>Tháng 6</MenuItem>
                        <MenuItem value={7}>Tháng 7</MenuItem>
                        <MenuItem value={8}>Tháng 8</MenuItem>
                        <MenuItem value={9}>Tháng 9</MenuItem>
                        <MenuItem value={10}>Tháng 10</MenuItem>
                        <MenuItem value={11}>Tháng 11</MenuItem>
                        <MenuItem value={12}>Tháng 12</MenuItem>
                    </TextField>
                    <TextField
                        id="outlined-select-currency"
                        select
                        size="small"
                        label="Năm"
                        value={year}
                        onChange={(event) => {
                            setYear(event.target.value)
                            // getTimeSheetPeriods(month + '' + event.target.value)
                        }}>
                        <MenuItem value={2021}>2021</MenuItem>
                        <MenuItem value={2022}>2022</MenuItem>
                        <MenuItem value={2023}>2023</MenuItem>
                    </TextField>
                </Box>
            </Box>
            <Divider sx={{ mb: 2 }} />

            {/* {timeSheetPeriods.length > 0 && ( */}
            <Provider>
                <Box sx={{ mb: 1 }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        centered>
                        <Tab
                            label="Lương"
                            {...a11yProps(0)}
                            sx={{ backgroundColor: 'white', mr: 2 }}
                        />
                        <Tab
                            label="Phụ cấp"
                            {...a11yProps(1)}
                            sx={{ backgroundColor: 'white', mr: 2 }}
                        />
                        <Tab label="Thưởng" {...a11yProps(2)} sx={{ backgroundColor: 'white' }} />
                    </Tabs>
                </Box>
                <Salary value={value} index={0} periodCode={month + '' + year} />
                <Allowance value={value} index={1} periodCode={month + '' + year} />
                <Bonus value={value} index={2} periodCode={month + '' + year} />
            </Provider>
            {/* )} */}
        </>
    )
}

export default Payroll
