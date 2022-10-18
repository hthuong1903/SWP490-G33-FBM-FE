import { Box, Button, Divider, MenuItem, Tab, Tabs, TextField } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Bonus from './Bonus'
import Subsidize from './Subsidize'

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    }
}

const _month = new Date().getMonth() + 1
const _year = new Date().getFullYear()

function Payroll() {
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [month, setMonth] = useState(_month)
    const [year, setYear] = useState(_year)
    const [value, setValue] = useState(0)
    const [timeSheetPeriods, setTimeSheetPeriods] = useState([])

    // const getTimeSheetPeriods = async (period_code) => {
    //     try {
    //         const response = await TimeKeepingApi.getTimeSheetPeriods(period_code)
    //         console.log(response)
    //         setTimeSheetPeriods(response.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // const createTimeSheetPeriods = async (month, year) => {
    //     try {
    //         const data = { month: month, periodCode: month + '' + year, year: year }
    //         const response = await TimeKeepingApi.createTimeSheetPeriods(data)
    //         console.log('createTimeSheetPeriods ' + response)
    //         setTimeSheetPeriods(response.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     getTimeSheetPeriods(month + '' + year)
    // }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <>
            {/* <ConfirmModal
                isOpen={isOpenConfirmModal}
                title="Xác nhận"
                content={`Bạn có muốn xóa kì công?`}
                handleClose={() => setIsOpenConfirmModal(false)}
                handleConfirm={() => handleDelete()}
            /> */}
            <h2>Bảng lương</h2>
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
                    </TextField>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        onClick={() => {
                            // createTimeSheetPeriods(month, year)
                        }}
                        disabled={timeSheetPeriods.length > 0}
                        sx={{ mr: 2 }}>
                        Xem bảng lương
                    </Button>
                </Box>
            </Box>
            <Divider sx={{ mb: 2 }} />

            {/* {timeSheetPeriods.length > 0 && ( */}
            <>
                <Box sx={{ mb: 1 }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        centered>
                        <Tab
                            label="Phụ cấp"
                            {...a11yProps(0)}
                            sx={{ backgroundColor: 'white', mr: 2 }}
                        />
                        <Tab label="Thưởng" {...a11yProps(1)} sx={{ backgroundColor: 'white' }} />
                    </Tabs>
                </Box>
                <Subsidize value={value} index={0} periodCode={month + '' + year} />
                <Bonus value={value} index={1} />
            </>
            {/* )} */}
        </>
    )
}

export default Payroll
