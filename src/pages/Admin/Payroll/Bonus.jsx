import DataTable from '@/components/Common/DataTable'
import { Box, Button, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import ModalBonus from './components/ModalBonus'

function Bonus({ value, index }) {
    const [isOpenBonusModal, setIsOpenBonusModal] = useState(false)

    const handleAction = (params) => {
        console.log(params)
        setIsOpenBonusModal(true)
    }
    const columns = [
        { field: 'name', headerName: 'TÊN', flex: 1 },
        {
            field: 'role',
            headerName: 'VAI TRÒ',
            flex: 1,
            cellClassName: 'roles'
        },
        { field: 'totalBonus', headerName: 'TỔNG SỐ TIỀN THƯỞNG', flex: 1 },
        {
            field: 'actions',
            headerName: 'TÁC VỤ',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <Tooltip title="Thưởng">
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleAction(params)}>
                                {/* <EditRounded fontSize="inherit" /> */}
                                Thưởng
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
            totalBonus: 20000,
            actions: 'ok'
        },
        {
            id: 2,
            name: 'Nguyen Van A',
            role: 'Bán hàng',
            totalBonus: 20000,
            actions: 'ok'
        },
        {
            id: 3,
            name: 'Nguyen Van A',
            role: 'Bán hàng',
            totalBonus: 20000,
            actions: 'ok'
        }
    ]
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}>
            {isOpenBonusModal && (
                <ModalBonus
                    isOpen={isOpenBonusModal}
                    title={'Thêm sản phẩm'}
                    handleClose={() => setIsOpenBonusModal(false)}
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

export default Bonus
