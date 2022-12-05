import {
    Box
} from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DataTable from '@/components/Common/DataTable'
import { useState } from 'react'
import TimeKeepingApi from '@/api/TimeKeepingApi'
import { useEffect } from 'react'

export default function ModelDetailTimeKeeping({title, isOpen, handleClose, periodCode, employee}) {
    console.log("employee", employee.employee.id)
    const [timeSheetDetail, setTimeSheetDetail] = useState([])
    const [isRender, setIsRender] = useState(true)
    const getTimeSheetDetail = async (period_code, employee_id) => {
        try {
            const response = await TimeKeepingApi.getTimeSheetDetail(period_code, employee_id)
            console.log("response", response.data)
            setTimeSheetDetail(response.data)
        } catch (error) {
            console.warn('Failed to get detail time keeping')
        }
    }

    useEffect(() => {
        isRender && getTimeSheetDetail(periodCode, employee.employee.id)
        setIsRender(false)
    }, [employee, periodCode, isRender, timeSheetDetail])

    const columns = [
        { field: 'id', headerName: 'STT', flex: 1, hide: true },
        { field: 'date', headerName: 'Ngày tháng năm', flex: 1, headerAlign: 'center',align: 'center'},
        { field: 'allowedDay', headerName: 'Nghỉ phép', flex: 0.65, headerAlign: 'center',align: 'center'},
        { field: 'absentDay', headerName: 'Nghỉ không phép', flex: 1, headerAlign: 'center',align: 'center'},
        { field: 'holidaysWorking', headerName: 'Công lễ', flex: 0.65, headerAlign: 'center',align: 'center'},
        { field: 'haftDayWorking', headerName: 'Công nửa ngày', flex: 1, headerAlign: 'center',align: 'center'},
        { field: 'workingDay', headerName: 'Công ngày bình thường', flex: 1.25, headerAlign: 'center',align: 'center'}
    ]

    console.log("time sheet detail", timeSheetDetail)
    const rows = timeSheetDetail.map((item, index) => {
        const container = {}
        container["id"] = index + 1
        container["date"] = item.date
        container['absentDay'] = item.absentDay
        container['allowedDay'] = item.allowedAbsentDay
        container['holidaysWorking'] = item.holidaysWorking
        container['haftDayWorking'] = item.haftDayWorking
        container['workingDay'] = item.workingDay
        return container
    })
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="md"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
            <Box
                sx={{
                    height: '65vh',
                    // width: '100vh',
                    '& .roles .MuiDataGrid-cellContent': {
                        backgroundColor: '#DEE1E6FF',
                        borderRadius: 2,
                        p: 1
                    }
                }}>
                <DataTable columns={columns} rows={rows} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Đóng</Button>
            </DialogActions>

        </Dialog>
    )
}

