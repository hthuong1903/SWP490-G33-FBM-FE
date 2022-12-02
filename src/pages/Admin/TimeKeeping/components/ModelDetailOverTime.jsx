import {
    Box, Tooltip, IconButton
} from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DataTable from '@/components/Common/DataTable'
import { useState } from 'react'
import { useEffect } from 'react'
import OvertimeApi from '@/api/OvertimeApi'
import { ClearRounded } from '@mui/icons-material'
import { toast } from 'react-toastify'
import ConfirmModal from '@/components/Common/Modal/ConfirmModal'

export default function ModelDetailOverTime({title, isOpen, handleClose, periodCode, employee}) {
    const [overTimeDetail, setOverTimeDetail] = useState([])
    const [isRender, setIsRender] = useState(true)
    const [selectedRow, setSelectedRow] = useState(null)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

    console.log('employee', employee.item)
    const getOverTimeDetail = async (period_code, employee_id) => {
        try {
            const response = await OvertimeApi.getOvertimeByPeriodCodeAndEmployee(period_code, employee_id)
            console.log(response.data)
            setOverTimeDetail(response.data)

        } catch (error) {
            console.warn('Failed to get detail over time tab')
        }
    }
    const handleDelete = async () => {
        try {
            await OvertimeApi.deleteOvertime(selectedRow?.row.id)
            toast.success('Xóa thành công')
            setIsOpenConfirmModal(false)
            setIsRender(true)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        isRender && getOverTimeDetail(periodCode, employee.item.employee.id)
        setIsRender(false)
    }, [employee, periodCode, isRender, overTimeDetail])

    const columns = [
        { field: 'id', headerName: 'STT', flex: 1, hide: true },
        { field: 'date', headerName: 'Ngày tháng', flex: 1},
        { field: 'totalTime', headerName: 'Số giờ làm thêm', flex: 1},
        { field: 'content', headerName: 'Nội dung', flex: 1},
        { field: 'totalAmount', headerName: 'Số tiền làm thêm', flex: 1},
        {
            field: 'actions',
            headerName: 'Tác vụ',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <Tooltip title="Xóa">
                            <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={() => {
                                    setSelectedRow(params)
                                    setIsOpenConfirmModal(true)
                                }}
                                >
                                <ClearRounded fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </>
                )
            }
        }
    ]
    console.log('overtime detail', overTimeDetail)
    const rows = overTimeDetail.map((item) => {
        const container = {}
        container['id'] = item.id
        container['date'] = item.date
        container['content'] = item.content
        container['totalTime'] = item.hour
        container['totalAmount'] = item.moneyPerHour * item.hour
        return container
    })

    console.log('selectedRow?.row', selectedRow?.row)
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
                <ConfirmModal
                    isOpen={isOpenConfirmModal}
                    title="Xác nhận"
                    content={`Bạn có muốn xóa ${selectedRow?.row.content} ngày ${selectedRow?.row.date} ?`}
                    handleClose={() => setIsOpenConfirmModal(false)}
                    handleConfirm={() => handleDelete()}
                />
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Đóng</Button>
            </DialogActions>
        </Dialog>
    )
}
