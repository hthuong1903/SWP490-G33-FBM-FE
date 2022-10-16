import DataTable from '@/components/Common/DataTable'
import ConfirmModal from '@/components/Common/Modal/ConfirmModal'
import {
    Avatar,
    Box,
    Button,
    Divider,
    IconButton,
    MenuItem,
    Tab,
    Tabs,
    TextField,
    Tooltip
} from '@mui/material'
import React, { useState } from 'react'
import ModalAddProduct from '../Product/components/ModalAddProduct'
import ModalOvertime from './components/ModalOvertime'
import ModalTimeKeeping from './components/ModalTimeKeeping'
import OvertimeTab from './OvertimeTab'
import TimeKeepingTab from './TimeKeepingTab'

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    }
}

function TimeKeeping() {
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [month, setMonth] = useState(1)
    const [year, setYear] = useState(1)
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleDelete = () => {
        toast.success('Xóa thành công !')
        setIsOpenConfirmModal(false)
    }

    return (
        <>
            <ConfirmModal
                isOpen={isOpenConfirmModal}
                title="Xác nhận"
                content={`Bạn có muốn xóa kì công?`}
                handleClose={() => setIsOpenConfirmModal(false)}
                handleConfirm={() => handleDelete()}
            />
            <h2>Chấm công</h2>
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
                        }}>
                        <MenuItem value={1}>2021</MenuItem>
                        <MenuItem value={2}>2022</MenuItem>
                    </TextField>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        onClick={() => {
                            // setIsOpenAddModal(true)
                        }}
                        sx={{ mr: 2 }}>
                        Tạo kì công
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            // setIsOpenAddModal(true)
                        }}>
                        Xóa kì công
                    </Button>
                </Box>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mb: 1 }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    centered>
                    <Tab
                        label="Chấm công"
                        {...a11yProps(0)}
                        sx={{ backgroundColor: 'white', mr: 2 }}
                    />
                    <Tab label="Làm thêm" {...a11yProps(1)} sx={{ backgroundColor: 'white' }} />
                </Tabs>
            </Box>
            <TimeKeepingTab value={value} index={0} />
            <OvertimeTab value={value} index={1} />
        </>
    )
}

export default TimeKeeping
