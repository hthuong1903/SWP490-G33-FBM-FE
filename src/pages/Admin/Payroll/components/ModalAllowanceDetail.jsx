import AllowanceApi from '@/api/AllowanceApi'
import DataTable from '@/components/Common/DataTable'
import ConfirmModal from '@/components/Common/Modal/ConfirmModal'
import { ClearRounded } from '@mui/icons-material'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip
} from '@mui/material'
import { Box } from '@mui/system'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Context } from '../contexts/contexts'

function ModalAllowanceDetail({ title, isOpen, handleClose, employee, periodCode }) {
    const [allowanceDetail, setAllowanceDetail] = useState([])
    const [isRender, setIsRender] = useState(true)
    const [selectedRow, setSelectedRow] = useState(null)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [state, dispatch] = useContext(Context)

    const getAllowanceDetail = async (period_code, employeeId) => {
        try {
            const response = await AllowanceApi.getAllowanceDetailByPeriodCodeAndEmployee(
                period_code,
                employeeId
            )
            console.log(response.data)
            setAllowanceDetail(response.data)
        } catch (error) {
            console.warn('Failed to get allowance detail', error)
        }
    }

    useEffect(() => {
        isRender && getAllowanceDetail(periodCode, employee.id)
        setIsRender(false)
    }, [employee, periodCode, isRender, allowanceDetail])

    const handleDelete = async () => {
        try {
            await AllowanceApi.deleteAllowanceDetail(selectedRow?.row.id)
            toast.success('Xóa thành công !')
            setIsOpenConfirmModal(false)
            setIsRender(true)
            dispatch({ type: 'render' })
        } catch (error) {
            console.log(error)
        }
    }

    const columns = [
        { field: 'id', headerName: 'STT', flex: 1, hide: true },
        { field: 'name', headerName: 'TÊN LOẠI THƯỞNG', flex: 1 },
        {
            field: 'quantity',
            headerName: 'SỐ TIỀN',
            flex: 1,
            type: 'number',
            valueFormatter: (params) => {
                if (params.value == null) {
                    return ''
                }
                return `${params.value.toLocaleString('vi-VN')} VND`
            }
        },
        { field: 'date', headerName: 'NGÀY THƯỞNG', flex: 1 },
        {
            field: 'content',
            headerName: 'NỘI DUNG',
            flex: 1
        },

        {
            field: 'actions',
            headerName: 'TÁC VỤ',
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
                                }}>
                                <ClearRounded fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </>
                )
            }
        }
    ]

    const rows = allowanceDetail.map((item) => {
        const container = {}
        container['id'] = item.id
        container['name'] = item.allowance.typeOfAllowance
        container['quantity'] = item.allowance.money
        container['content'] = item.content
        container['date'] = item.date
        return container
    })

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="md">
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

            <DialogContent>
                <ConfirmModal
                    isOpen={isOpenConfirmModal}
                    title="Xác nhận"
                    content={`Bạn có muốn xóa ${selectedRow?.row.name}?`}
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

export default ModalAllowanceDetail
