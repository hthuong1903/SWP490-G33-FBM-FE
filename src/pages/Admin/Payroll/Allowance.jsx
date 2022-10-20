import AllowanceApi from '@/api/AllowanceApi'
import DataTable from '@/components/Common/DataTable'
import { Box, Button, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'

import ModalAllowance from './components/ModalAllowance'

function Allowance({ value, index, periodCode }) {
    const [isOpenSubsidizeModal, setIsOpenSubsidizeModal] = useState(false)
    const [allowance, setAllowance] = useState([])
    const [isRender, setIsRender] = useState(true)
    const [employee, setEmployee] = useState({})
    const [allowanceDetail, setAllowanceDetail] = useState([])

    const handleAction = (params) => {
        console.log(params)
        setEmployee(params)
        setIsOpenSubsidizeModal(true)
    }

    const getAllowance = async () => {
        try {
            const response = await AllowanceApi.getAllowance()
            // console.log('get allowance detail', response.data)
            setAllowanceDetail(response.data)
        } catch (error) {
            console.warn('Failed to get allowance detail', error)
        }
    }

    const getAllowanceByPeriodCode = async (period_code) => {
        try {
            const response = await AllowanceApi.createAllowance(period_code)
            // console.log('Get allowance', response.data)
            setAllowance(response.data)
        } catch (error) {
            console.warn('Failed to get allowance', error)
        }
    }
    useEffect(() => {
        getAllowance()
    }, [])

    useEffect(() => {
        getAllowanceByPeriodCode(periodCode)
    }, [periodCode])

    useEffect(() => {
        isRender && getAllowanceByPeriodCode(periodCode)
        setIsRender(false)
    }, [isRender, allowance])

    const columns = [
        { field: 'employeeName', headerName: 'TÊN', flex: 1 },
        {
            field: 'role',
            headerName: 'VAI TRÒ',
            flex: 1,
            cellClassName: 'roles'
        },
        { field: 'totalMoney', headerName: 'TỔNG TIỀN PHỤ CẤP', flex: 1 },
        {
            field: 'actions',
            headerName: 'TÁC VỤ',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <Tooltip title="Phụ cấp">
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleAction(params.row)}>
                                {/* <EditRounded fontSize="inherit" /> */}
                                Phụ cấp
                            </Button>
                        </Tooltip>
                    </>
                )
            }
        }
    ]
    const rows = allowance.map((item) => {
        const container = {}
        container['id'] = item.employeeId
        container['employeeName'] = item.employeeName
        container['role'] = item.role[0].name
        container['totalMoney'] = item.totalMoney
        return container
    })

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}>
            {isOpenSubsidizeModal && employee && allowanceDetail.length > 0 && (
                <ModalAllowance
                    isOpen={isOpenSubsidizeModal}
                    title={'Thêm phụ cấp'}
                    allowanceDetail={allowanceDetail}
                    employee={employee}
                    handleClose={() => {
                        setIsOpenSubsidizeModal(false)
                        setIsRender(true)
                    }}
                    periodCode={periodCode}
                />
            )}
            <Box
                sx={{
                    height: '65vh',
                    '& .roles .MuiDataGrid-cellContent': {
                        backgroundColor: '#DEE1E6FF',
                        borderRadius: 2,
                        p: 1
                    }
                }}>
                <DataTable columns={columns} rows={rows} />
            </Box>
        </div>
    )
}

export default Allowance
