import React, { useState } from 'react'
import { Button, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import DataTable from '@/components/Common/DataTable'
import ModalOvertime from './components/ModalOvertime'

function OvertimeTab({ value, index }) {
    const [isOpenOvertimeModal, setIsOpenOvertimeModal] = useState(false)

    const handleAction = (params) => {
        console.log(params)
        setIsOpenOvertimeModal(true)
    }

    const columns = [
        { field: 'name', headerName: 'TÊN', flex: 1 },
        {
            field: 'role',
            headerName: 'VAI TRÒ',
            flex: 1,
            cellClassName: 'roles'
        },
        { field: 'totalTime', headerName: 'TỔNG SỐ GIỜ', flex: 1 },
        { field: 'details', headerName: 'NỘI DUNG', flex: 1 },
        { field: 'totalAmount', headerName: 'TỔNG SỐ TIỀN', flex: 1 },
        {
            field: 'actions',
            headerName: 'TÁC VỤ',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <Tooltip title="Làm thêm">
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleAction(params)}>
                                {/* <EditRounded fontSize="inherit" /> */}
                                Chấm công
                            </Button>
                        </Tooltip>
                    </>
                )
            }
        }
    ]
    const rows = [
        {
            id: 1,
            name: 'Le Anh Tuan',
            role: 'Bán hàng',
            totalAmount: 20000,
            details: 'hehe',
            totalTime: 22,
            actions: 'ok'
        },
        {
            id: 2,
            name: 'Nguyen Van A',
            role: 'Bán hàng',
            totalAmount: 20000,
            details: 'hehe',
            totalTime: 22,
            actions: 'ok'
        },
        {
            id: 3,
            name: 'Nguyen Van A',
            role: 'Bán hàng',
            totalAmount: 20000,
            details: 'hehe',
            totalTime: 22,
            actions: 'ok'
        }
    ]

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}>
            {isOpenOvertimeModal && (
                <ModalOvertime
                    isOpen={isOpenOvertimeModal}
                    title={'Thêm sản phẩm'}
                    handleClose={() => setIsOpenOvertimeModal(false)}
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

export default OvertimeTab
