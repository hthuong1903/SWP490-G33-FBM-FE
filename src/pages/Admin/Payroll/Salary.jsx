import React, { useContext, useEffect, useState } from 'react'
import DataTable from '@/components/Common/DataTable'
import { Box, Button, Tooltip, Typography } from '@mui/material'
import SalaryApi from '@/api/SalaryApi'
import { toast } from 'react-toastify'

import { Context } from './contexts/contexts'

function Salary({ value, index, periodCode }) {
    const [salary, setSalary] = useState([])
    const [isRender, setIsRender] = useState(true)
    const [state, dispatch] = useContext(Context)
    const [disabled, setDisabled] = useState(true);

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

    const sendEmailToEmployee = async (data) => {
        try {
            const response = await SalaryApi.sendEmailSalaryEmployee(data)
            toast.success(response.data.message)
        } catch (error) {
            console.log('Failed when send email')
        }
    }

    const handleSendEmail = () => {
        sendEmail(periodCode)
    }

    const handleAction = (params) => {
        const data = { id: [params.id], periodCode: periodCode }
        console.log(data)
        sendEmailToEmployee(data)
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
        {
            field: 'employeeName',
            headerName: 'TÊN NHÂN VIÊN',
            flex: 1.5,
            renderCell: (params) => {
                return (
                    <Typography sx={{ fontWeight: 'bold' }}>{params.row.employeeName}</Typography>
                )
            }
        },
        {
            field: 'allowedDay',
            headerName: 'NGHỈ PHÉP',
            flex: 0.75,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'absentDay',
            headerName: 'VẮNG',
            flex: 0.75,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'holidaysWorking',
            headerName: 'CÔNG LỄ',
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'haftDayWorking',
            headerName: 'CÔNG NỬA NGÀY',
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'totalDayWorking',
            headerName: 'TỔNG SỐ NGÀY LÀM VIỆC',
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'totalOvertimeMoney',
            headerName: 'TỔNG TIỀN LÀM THÊM',
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'totalAllowanceMoney',
            headerName: 'TỔNG PHỤ CẤP',
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'totalBonusMoney',
            headerName: 'TỔNG THƯỞNG',
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'basicSalary',
            headerName: 'LƯƠNG CƠ BẢN',
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'totalSalary',
            headerName: 'TỔNG THỰC LÃNH',
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'actions',
            headerName: 'TÁC VỤ',
            flex: 1.5,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <>
                        <Tooltip title="Gửi mail">
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleAction(params.row)}>
                                Gửi lương
                            </Button>
                        </Tooltip>
                    </>
                )
            }
        }
    ]
    const rows = salary.map((item) => {
        const container = {}
        container['id'] = item.employeeId
        container['absentDay'] = item.absentDay
        container['allowedDay'] = item.allowedDay
        container['holidaysWorking'] = item.holidaysWorking
        container['totalDayWorking'] = item.totalDayWorking
        container['totalSalary'] = item.totalSalary
        container['haftDayWorking'] = item.haftDayWorking
        container['totalOvertimeMoney'] = item.totalOvertimeMoney
        container['totalBonusMoney'] = item.totalBonusMoney
        container['employeeName'] = item.employeeName
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
                {salary.length > 0 ?
                    <Button
                        sx={{ mb: 2, ml: 170 }}
                        variant="contained"
                        onClick={() => handleSendEmail()}
                        autoFocus>
                        Gửi lương
                    </Button>
                    : <Button sx={{ mb: 2, ml: 170 }}
                        variant="contained" 
                        disabled>Gửi lương
                    </Button>
                }
                
                <DataTable columns={columns} rows={rows} />
            </Box>
        </div>
    )
}

export default Salary
