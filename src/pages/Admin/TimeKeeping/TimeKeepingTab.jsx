import TimeKeepingApi from '@/api/TimeKeepingApi'
import DataTable from '@/components/Common/DataTable'
import { Button, Tooltip, Chip } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ModalTimeKeeping from './components/ModalTimeKeeping'
import ModelDetailTimeKeeping from './components/ModelDetailTimeKeeping'
function TimeKeepingTab({ value, index, periodCode }) {
    const [isOpenTimeKeepingModal, setIsOpenTimeKeepingModal] = useState(false)
    const [timeSheetDetail, setTimeSheetDetail] = useState([])
    const [employee, setEmployee] = useState({})
    const [isRender, setIsRender] = useState(true)
    const [isDetail, setIsDetail] = useState(false)

    const ROLES = [
        { id: 1, name: 'Nhân Viên Sửa Chữa', color:'#decd59' },
        { id: 2, name: 'Nhân Viên Bán Hàng', color:'#7cd992' }
    ]

    const getTimeSheetDetail = async (period_code) => {
        try {
            const response = await TimeKeepingApi.getTimeSheetDetails(period_code)
            console.log(response)
            if (response.data.length > 0) {
                console.log('getTimeSheetDetail - ', response.data)
                setTimeSheetDetail(response.data)
            } else {
                const res = await TimeKeepingApi.createTimeSheetDetails(period_code)
                console.log('createTimeSheetDetails - ', res.data)
                setTimeSheetDetail(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const sendEmail = async (periodCode) => {
        try {
            const response = await TimeKeepingApi.sendEmailTimeSheetDetail(periodCode)
            toast.success(response.message)
        } catch (error) {
            console.log('Failed when send email')
        }
    }

    const handleSendEmail = () => {
        sendEmail(periodCode)
    }

    useEffect(() => {
        getTimeSheetDetail(periodCode)
    }, [periodCode])

    useEffect(() => {
        isRender && getTimeSheetDetail(periodCode)
        setIsRender(false)
    }, [timeSheetDetail, isRender])

    const handleAction = (params) => {
        setEmployee(params)
        setIsOpenTimeKeepingModal(true)
    }

    const handleActionDetail = (params) => {
        setEmployee(params)
        setIsDetail(true)
    }

    const columns = [
        { field: 'employee', headerName: 'Số thứ tự', flex: 0.5, hide: true },
        { field: 'id', headerName: 'SỐ THỨ TỰ', flex: 0.75, align: 'center', hide: true},
        { field: 'name', headerName: 'TÊN NHÂN VIÊN', flex: 1},
        {
            field: 'roles',
            headerName: 'VAI TRÒ',
            flex: 1.25,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return <Chip label={ROLES[params.row.employee.roles[0].id - 2].name}
                    sx={{color: `${ROLES[params.row.employee.roles[0].id - 2].color}`,
                    border: `1px solid ${ROLES[params.row.employee.roles[0].id - 2].color}`
                }}
                />
            }
        },
        {
            field: 'allowedDay',
            headerName: 'NGHỈ PHÉP',
            flex: 0.75,
            align: 'center'
        },
        { field: 'absentDay', headerName: 'VẮNG', flex: 0.5, headerAlign: 'center', align: 'center' },
        { field: 'holidaysWorking', headerName: 'CÔNG LỄ', flex: 0.65 , headerAlign: 'center', align: 'center'},
        { field: 'haftDayWorking', headerName: 'CÔNG NỬA NGÀY', flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'totalDayWorking', headerName: 'TỔNG SỐ NGÀY LÀM VIỆC', headerAlign: 'center', flex: 1.4, align: 'center' },
        { field: 'workingDay', headerName: 'NGÀY THƯỜNG', flex: 1, headerAlign: 'center', align: 'center' },
        {
            field: 'actions',
            headerName: 'TÁC VỤ',
            flex: 1.5,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <>
                        <Tooltip title="Làm thêm">
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleAction(params.row)}>
                                Chấm công
                            </Button>

                        </Tooltip>
                        <Tooltip title="Làm thêm" sx={{ml: 1.5}}>
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
    const rows = timeSheetDetail.map((item, index) => {
        const container = {}
        container['id'] = index + 1
        container['absentDay'] = item.allowedAbsentDay
        container['allowedDay'] = item.absentDay
        container['holidaysWorking'] = item.holidaysWorking
        container['periodCode'] = item.periodCode
        container['totalDayWorking'] = item.totalDayWorking
        container['haftDayWorking'] = item.haftDayWorking
        container['workingDay'] = item.workingDay
        container['employee'] = item.employee
        container['name'] =
            (item.employee.firstName  || '') +' '+(item.employee.middleName || '') + ' '+ (item.employee.lastName || '')
        container['roles'] = item.employee.roles[0].name
        return container
    })

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}>
            {isOpenTimeKeepingModal && employee && (
                <ModalTimeKeeping
                    isOpen={isOpenTimeKeepingModal}
                    title={`Chấm công cho ${employee.employee.employeeCode} - ${employee.name}`}
                    handleClose={() => {
                        setIsOpenTimeKeepingModal(false)
                        setIsRender(true)
                    }}
                    employee={employee}
                    timeSheetDetail={timeSheetDetail}
                />
            )}

            {isDetail && employee && (
                <ModelDetailTimeKeeping 
                    isOpen={isDetail}
                    title={`Xem chi tiết chấm công của ${employee.employee.employeeCode} - ${employee.name}`}
                    handleClose={() => {
                        setIsDetail(false)
                        setIsRender(true)
                    }}
                    employee={employee}
                    periodCode={periodCode}
                    timeSheetDetail={timeSheetDetail}
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
                }}
                >
                <Button 
                    sx={{mb: 2, ml: 165}}
                variant="contained" onClick={() => handleSendEmail()} autoFocus>
                    Gửi chấm công
                </Button>
                <DataTable columns={columns} rows={rows} />
            </Box>
        </div>
    )
}

export default TimeKeepingTab
