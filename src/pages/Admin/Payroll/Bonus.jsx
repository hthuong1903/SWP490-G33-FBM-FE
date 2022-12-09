import BonusApi from '@/api/BonusApi'
import DataTable from '@/components/Common/DataTable'
import { Box, Button, Tooltip, Chip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ModalBonus from './components/ModalBonus'
import ModalBonusDetail from './components/ModalBonusDetail'

function Bonus({ value, index, periodCode }) {
    const [isOpenBonusModal, setIsOpenBonusModal] = useState(false)
    const [isOpenViewBonusModal, setIsOpenViewBonusModal] = useState(false)
    const [bonus, setBonus] = useState([])
    const [isRender, setIsRender] = useState(true)
    const [employee, setEmployee] = useState({})
    const [bonusDetail, setBonusDetail] = useState([])

    const ROLES = [
        { id: 1, name: 'Nhân Viên Sửa Chữa', color:'#decd59' },
        { id: 2, name: 'Nhân Viên Bán Hàng', color:'#7cd992' }
    ]

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

    const handleView = (params) => {
        console.log(params)
        setEmployee(params)
        setIsOpenViewBonusModal(true)
    }

    const columns = [
        { field: 'employeeName', headerName: 'TÊN NHÂN VIÊN', flex: 1 },
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
        { field: 'totalMoney', headerName: 'TỔNG SỐ TIỀN THƯỞNG', flex: 1, headerAlign: 'center',
        align: 'center'},
        {
            field: 'actions',
            headerName: 'TÁC VỤ',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <Tooltip title="Thưởng" sx={{ mr: 2 }}>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleAction(params.row)}>
                                {/* <EditRounded fontSize="inherit" /> */}
                                Thưởng
                            </Button>
                        </Tooltip>
                        <Tooltip title="Thưởng">
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
    const rows = bonus.map((item) => {
        const container = {}
        container['item'] = item
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
                    title={'Thêm thưởng'}
                    employee={employee}
                    bonusDetail={bonusDetail}
                    periodCode={periodCode}
                    handleClose={() => {
                        setIsOpenBonusModal(false)
                        setIsRender(true)
                    }}
                />
            )}
            {isOpenViewBonusModal && employee && (
                <ModalBonusDetail
                    isOpen={isOpenViewBonusModal}
                    title={'Xem chi tiết thưởng'}
                    employee={employee}
                    periodCode={periodCode}
                    handleClose={() => {
                        setIsOpenViewBonusModal(false)
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
