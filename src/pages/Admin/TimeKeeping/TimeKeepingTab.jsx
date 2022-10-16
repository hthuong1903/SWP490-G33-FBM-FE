import DataTable from '@/components/Common/DataTable'
import { Button, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import ModalTimeKeeping from './components/ModalTimeKeeping'

function TimeKeepingTab({ value, index }) {
    const [isOpenTimeKeepingModal, setIsOpenTimeKeepingModal] = useState(false)

    const handleAction = (params) => {
        setIsOpenTimeKeepingModal(true)
    }

    const columns = [
        { field: 'name', headerName: 'TÊN', flex: 1 },
        {
            field: 'roles',
            headerName: 'VAI TRÒ',
            flex: 1,
            cellClassName: 'roles'
        },
        {
            field: 'allowedDay',
            headerName: 'NGHỈ PHÉP',
            flex: 1
        },
        { field: 'absentDay', headerName: 'VẮNG', flex: 1 },
        { field: 'holidaysWorking', headerName: 'CÔNG LỄ', flex: 1 },
        { field: 'weekendWorking', headerName: 'CÔNG CUỐI TUẦN', flex: 1 },
        { field: 'totalDayWorking', headerName: 'TỔNG SỐ NGÀY LÀM VIỆC', flex: 1 },
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
            roles: 'Bán hàng',
            allowedDay: 2,
            absentDay: 0,
            holidaysWorking: 2,
            weekendWorking: 2,
            totalDayWorking: 22,
            actions: 'ok'
        },
        {
            id: 2,
            name: 'Nguyen Van B',
            roles: 'Bán hàng',
            allowedDay: 2,
            absentDay: 0,
            holidaysWorking: 2,
            weekendWorking: 2,
            totalDayWorking: 22,
            actions: 'ok'
        },
        {
            id: 3,
            name: 'Nguyen Van A',
            roles: 'Bán hàng',
            allowedDay: 2,
            absentDay: 0,
            holidaysWorking: 2,
            weekendWorking: 2,
            totalDayWorking: 22,
            actions: 'ok'
        }
    ]

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}>
            {isOpenTimeKeepingModal && (
                <ModalTimeKeeping
                    isOpen={isOpenTimeKeepingModal}
                    title={'Chấm công'}
                    handleClose={() => setIsOpenTimeKeepingModal(false)}
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

export default TimeKeepingTab
