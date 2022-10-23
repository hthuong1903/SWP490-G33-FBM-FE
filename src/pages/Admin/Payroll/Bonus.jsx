import BonusApi from '@/api/BonusApi'
import DataTable from '@/components/Common/DataTable'
import { Box, Button, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ModalBonus from './components/ModalBonus'

function Bonus({ value, index, periodCode }) {
    const [isOpenBonusModal, setIsOpenBonusModal] = useState(false)
    const [bonus, setBonus] = useState([])
    const [isRender, setIsRender] = useState(true)
    const [employee, setEmployee] = useState({})
    const [bonusDetail, setBonusDetail] = useState([])

    const getBonus = async () => {
        try {
            const response = await BonusApi.getBonus()
            console.log('get bonus detail', response.data)
            setBonusDetail(response.data)
        } catch (error) {
            console.warn('Failed to get bonus detail', error)
        }
    }

    const getBonusByPeriodCode = async (period_code) => {
        try {
            const response = await BonusApi.createBonusDetail(period_code)
            console.log('Get bonus', response.data)
            setBonus(response.data)
        } catch (error) {
            console.warn('Failed to get bonus', error)
        }
    }
    useEffect(() => {
        getBonus()
    }, [])

    useEffect(() => {
        getBonusByPeriodCode(periodCode)
    }, [periodCode])

    useEffect(() => {
        isRender && getBonusByPeriodCode(periodCode)
        setIsRender(false)
    }, [isRender, bonus])

    const handleAction = (params) => {
        console.log(params)
        setEmployee(params)
        setIsOpenBonusModal(true)
    }

    const columns = [
        { field: 'employeeName', headerName: 'TÊN', flex: 1 },
        {
            field: 'role',
            headerName: 'VAI TRÒ',
            flex: 1,
            cellClassName: 'roles'
        },
        { field: 'totalMoney', headerName: 'TỔNG SỐ TIỀN THƯỞNG', flex: 1 },
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
                                onClick={() => handleAction(params.row)}>
                                {/* <EditRounded fontSize="inherit" /> */}
                                Thưởng
                            </Button>
                        </Tooltip>
                    </>
                )
            }
        }
    ]
    const rows = bonus.map((item) => {
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
            {isOpenBonusModal && employee && bonusDetail.length > 0 && (
                <ModalBonus
                    isOpen={isOpenBonusModal}
                    title={'Thêm sản phẩm'}
                    employee={employee}
                    bonusDetail={bonusDetail}
                    periodCode={periodCode}
                    handleClose={() => {
                        setIsOpenBonusModal(false)
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

export default Bonus
