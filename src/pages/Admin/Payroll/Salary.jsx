import React, { useContext, useEffect, useState } from 'react'
import DataTable from '@/components/Common/DataTable'
import { Box, Button } from '@mui/material'
import SalaryApi from '@/api/SalaryApi'
import { toast } from 'react-toastify'

import { Context } from './contexts/contexts'

function Salary({ value, index, periodCode }) {
    const [salary, setSalary] = useState([])
    const [isRender, setIsRender] = useState(true)
    const [state, dispatch] = useContext(Context)

    const getSalary = async (period_code) => {
        try {
            const response = await SalaryApi.getSalary(period_code)
            console.log(response)
            setSalary(response.data)
        } catch (error) {
            console.warn('Failed to get salary ', error)
        }
    }

    const sendEmail = async (periodCode) => {
        try {
            const response = await SalaryApi.sendEmailSalary(periodCode)
            toast.success(response.message)
        } catch (error) {
            console.log('Failed when send email')
        }
    }

    const handleSendEmail = () => {
        sendEmail(periodCode)
    }

    console.log(state)
    useEffect(() => {
        getSalary(periodCode)
    }, [state])

    useEffect(() => {
        getSalary(periodCode)
    }, [periodCode, state])

    useEffect(() => {
        isRender && getSalary(periodCode)
        setIsRender(false)
    }, [salary, isRender, state])

    const columns = [
        { field: 'employeeName', headerName: 'TÊN', flex: 1 },
        // {
        //     field: 'roles',
        //     headerName: 'VAI TRÒ',
        //     flex: 1,
        //     cellClassName: 'roles'
        // },
        { field: 'allowedDay', headerName: 'NGHỈ PHÉP', flex: 1 },
        { field: 'absentDay', headerName: 'VẮNG', flex: 1 },
        { field: 'holidaysWorking', headerName: 'CÔNG LỄ', flex: 1 },
        { field: 'weekendWorking', headerName: 'CÔNG CUỐI TUẦN', flex: 1 },
        { field: 'totalDayWorking', headerName: 'TỔNG SỐ NGÀY LÀM VIỆC', flex: 1 },
        { field: 'totalOvertimeMoney', headerName: 'TỔNG TIỀN LÀM THÊM', flex: 1 },
        { field: 'totalAllowanceMoney', headerName: 'TỔNG PHỤ CẤP', flex: 1 },
        { field: 'totalBonusMoney', headerName: 'TỔNG THƯỞNG', flex: 1 },
        { field: 'basicSalary', headerName: 'LƯƠNG CƠ BẢN', flex: 1 },
        { field: 'totalSalary', headerName: 'TỔNG THỰC LÃNH', flex: 1 }
    ]
    const rows = salary.map((item, index) => {
        const container = {}
        container['id'] = index + 1
        container['absentDay'] = item.absentDay
        container['allowedDay'] = item.allowedDay
        container['holidaysWorking'] = item.holidaysWorking
        container['totalDayWorking'] = item.totalDayWorking
        container['totalSalary'] = item.totalSalary
        container['weekendWorking'] = item.weekendWorking
        container['totalOvertimeMoney'] = item.totalOvertimeMoney
        container['totalBonusMoney'] = item.totalBonusMoney
        container['employeeName'] = item.employeeName
        // container['roles'] = item.overTime.employee.roles[0].name
        container['totalAllowanceMoney'] = item.totalAllowanceMoney
        container['basicSalary'] = item.basicSalary
        return container
    })
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}>
            <Box
                sx={{
                    height: '65vh',
                    '& .roles .MuiDataGrid-cellContent': {
                        backgroundColor: '#DEE1E6FF',
                        borderRadius: 2,
                        p: 1
                    }
                }}>
                <Button variant="contained" onClick={() => handleSendEmail()} autoFocus>
                    Gửi lương
                </Button>
                <DataTable columns={columns} rows={rows} />
            </Box>
        </div>
    )
}

export default Salary
