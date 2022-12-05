import React, { useEffect, useState } from 'react'
import { Button, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import DataTable from '@/components/Common/DataTable'
import ModalOvertime from './components/ModalOvertime'
import OvertimeApi from '@/api/OvertimeApi'
import ModelDetailOverTime from './components/ModelDetailOverTime'
function OvertimeTab({ value, index, periodCode }) {
    const [isOpenOvertimeModal, setIsOpenOvertimeModal] = useState(false)
    const [employee, setEmployee] = useState({})
    const [listOvertime, setListOvertime] = useState([])
    const [isRender, setIsRender] = useState(true)
    const [isDetail, setIsDetail] = useState(false)
    const handleAction = (params) => {
        setEmployee(params)
        setIsOpenOvertimeModal(true)
    }

    const handleActionDetail = (params) => {
        setEmployee(params)
        setIsDetail(true)
    }

    const getOvertimeByPeriodCode = async (period_code) => {
        try {
            const response = await OvertimeApi.getOvertimeByPeriodCode(period_code)
            console.log("employee", response.data)
            setListOvertime(response.data)
        } catch (error) {
            console.warn('Failed to get overtime by periodCode ', error)
        }
    }

    useEffect(() => {
        getOvertimeByPeriodCode(periodCode)
    }, [periodCode])

    useEffect(() => {
        isRender && getOvertimeByPeriodCode(periodCode)
        setIsRender(false)
    }, [listOvertime, isRender])

    const columns = [
        { field: 'item', headerName: 'TÊN', flex: 1, hide: true },
        { field: 'name', headerName: 'TÊN NHÂN VIÊN', flex: 1},
        {
            field: 'roles',
            headerName: 'VAI TRÒ',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            cellClassName: 'roles'
        },
        { field: 'totalTime', headerName: 'TỔNG SỐ GIỜ LÀM THÊM', flex: 1, headerAlign: 'center',
        align: 'center' },
        { field: 'totalAmount', headerName: 'TỔNG SỐ TIỀN', flex: 1, headerAlign: 'center',
        align: 'center' },
        {
            field: 'actions',
            headerName: 'TÁC VỤ',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <>
                        <Tooltip title="Làm thêm">
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleAction(params.row.item)}>
                                Làm thêm
                            </Button>
                        </Tooltip>

                        <Tooltip title="Làm thêm" sx={{ml: 3}}>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleActionDetail(params.row)}
                                >
                                Xem chi tiết
                            </Button>
                        </Tooltip>
                    </>
                )
            }
        }
    ]
    const rows = listOvertime.map((item, index) => {
        const container = {}
        container['item'] = item
        container['id'] = index + 1
        container['name'] =
            (item.employee.firstName  || '') +' '+(item.employee.middleName || '') + ' '+ (item.employee.lastName || '')
        container['totalTime'] = item.hour
        container['totalAmount'] = item.moneyPerHour * item.hour
        container['roles'] = item.employee.roles[0].name
        return container
    })

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}>
            {isOpenOvertimeModal && employee && (
                <ModalOvertime
                    isOpen={isOpenOvertimeModal}
                    title={`Thêm giờ làm thêm `}
                    handleClose={() => {
                        setIsOpenOvertimeModal(false)
                        setIsRender(true)
                    }}
                    employee={employee}
                />
            )}
            {isDetail && employee && (
                <ModelDetailOverTime 
                    isOpen={isDetail}
                    title={'Xem chi tiết thời gian làm thêm giờ'}
                    handleClose={() => {
                        setIsDetail(false)
                        setIsRender(true)
                    }}
                    employee={employee}
                    periodCode={periodCode}
                    listOvertime={listOvertime}
                />
            )}
            <Box
                sx={{
                    height: '76vh',
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
