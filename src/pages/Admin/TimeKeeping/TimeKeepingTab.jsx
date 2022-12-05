import TimeKeepingApi from '@/api/TimeKeepingApi'
import DataTable from '@/components/Common/DataTable'
import { Button, Tooltip } from '@mui/material'
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
        { field: 'id', headerName: 'SỐ THỨ TỰ', flex: 0.75, align: 'center'},
        { field: 'name', headerName: 'TÊN NHÂN VIÊN', flex: 1, headerAlign: 'center'},
        {
            field: 'roles',
            headerName: 'VAI TRÒ',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            cellClassName: 'roles'
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
        container['absentDay'] = item.absentDay
        container['allowedDay'] = item.allowedAbsentDay
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
                    title={'Chấm công'}
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
                    title={'Xem chi tiết chấm công'}
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
                }}>
                <Button variant="contained" onClick={() => handleSendEmail()} autoFocus>
                    Gửi chấm công
                </Button>
                <DataTable columns={columns} rows={rows} />
            </Box>
        </div>
    )
}

export default TimeKeepingTab
