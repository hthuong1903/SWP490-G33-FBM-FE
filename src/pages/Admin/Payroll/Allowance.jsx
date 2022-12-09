import AllowanceApi from '@/api/AllowanceApi'
import DataTable from '@/components/Common/DataTable'
import { Box, Button, Tooltip, Chip } from '@mui/material'
import React, { useEffect, useState } from 'react'

import ModalAllowance from './components/ModalAllowance'
import ModalAllowanceDetail from './components/ModalAllowanceDetail'

function Allowance({ value, index, periodCode }) {
    const [isOpenSubsidizeModal, setIsOpenSubsidizeModal] = useState(false)
    const [isOpenViewAllowanceModal, setIsOpenViewAllowanceModal] = useState(false)
    const [allowance, setAllowance] = useState([])
    const [isRender, setIsRender] = useState(true)
    const [employee, setEmployee] = useState({})
    const [allowanceDetail, setAllowanceDetail] = useState([])

    const ROLES = [
        { id: 1, name: 'Nhân Viên Sửa Chữa', color:'#decd59' },
        { id: 2, name: 'Nhân Viên Bán Hàng', color:'#7cd992' }
    ]

    const handleAction = (params) => {
        console.log(params)
        setEmployee(params)
        setIsOpenSubsidizeModal(true)
    }

    const handleView = (params) => {
        console.log(params)
        setEmployee(params)
        setIsOpenViewAllowanceModal(true)
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
        { field: 'employeeName', headerName: 'TÊN NHÂN VIÊN', flex: 1},
        {
            field: 'role',
            headerName: 'VAI TRÒ',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return <Chip label={ROLES[params.row.item.role[0].id - 2].name}
                    sx={{color: `${ROLES[params.row.item.role[0].id - 2].color}`,
                    border: `1px solid ${ROLES[params.row.item.role[0].id - 2].color}`
                }}
                />
            }
        },
        { field: 'totalMoney', headerName: 'TỔNG TIỀN PHỤ CẤP', flex: 1, headerAlign: 'center',align: 'center' },
        {
            field: 'actions',
            headerName: 'TÁC VỤ',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <Tooltip title="Phụ cấp" sx={{ mr: 2 }}>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleAction(params.row)}>
                                {/* <EditRounded fontSize="inherit" /> */}
                                Phụ cấp
                            </Button>
                        </Tooltip>
                        <Tooltip title="Phụ cấp">
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleView(params.row)}>
                                {/* <EditRounded fontSize="inherit" /> */}
                                Xem
                            </Button>
                        </Tooltip>
                    </>
                )
            }
        }
    ]
    const rows = allowance.map((item) => {
        const container = {}
        container['item'] = item
        container['id'] = item.employeeId
        container['employeeName'] = item.employeeName
        container['role'] = item.role[0].name
        container['totalMoney'] = item.totalMoney
        return container
    })

    console.log("rows", rows)
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

            {isOpenViewAllowanceModal && employee && (
                <ModalAllowanceDetail
                    isOpen={isOpenViewAllowanceModal}
                    title={'Xem chi phụ cấp'}
                    employee={employee}
                    periodCode={periodCode}
                    handleClose={() => {
                        setIsOpenViewAllowanceModal(false)
                        setIsRender(true)
                    }}
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
