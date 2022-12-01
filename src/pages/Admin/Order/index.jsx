import orderApi from '@/api/orderApi'
import DataTable from '@/components/Common/DataTable'
import ConfirmModal from '@/components/Common/Modal/ConfirmModal'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Chip, IconButton, MenuItem, TextField, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment/moment'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ORDER_STATUS } from './constant'

export default function Order() {
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const [listProducts, setListProducts] = useState([])
    const [status, setStatus] = useState(-1)
    const [isUpdated, setIsUpdated] = useState(false)
    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            await orderApi.deleteOrder(selectedRow?.row.id)
            toast.success('Xóa thành công !')
            setIsOpenConfirmModal(false)
            setIsUpdated(true)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getAllProduct = async (status) => {
            try {
                const response = await orderApi.getAllOrder(status)
                setListProducts(response.data)
            } catch (error) {
                console.log('fail when getAllProduct', error)
            }
        }
        getAllProduct(status)
        setIsUpdated(false)
    }, [isUpdated, status])

    const columns = [
        {
            field: 'customerName',
            headerName: 'TÊN KHÁCH HÀNG',
            flex: 1,
            renderCell: (params) => {
                return (
                    params.row.customer.firstName +
                    ' ' +
                    params.row.customer.middleName +
                    ' ' +
                    params.row.customer.lastName
                )
            }
        },
        {
            field: 'phone',
            headerName: 'SỐ ĐIỆN THOẠI',
            flex: 1,
            renderCell: (params) => {
                return params.row.customer.phone
            }
        },
        {
            field: 'totalOrderPrice',
            headerName: 'TỔNG HÓA ĐƠN',
            flex: 1,
            valueFormatter: (params) => {
                if (params.value == null) {
                    return ''
                }
                return `${params.value.toLocaleString('vi-VN')} VND`
            }
        },
        {
            field: 'dateCreated',
            headerName: 'NGÀY TẠO',
            flex: 1,
            type: 'number',
            valueFormatter: (params) => {
                if (params.value == null) {
                    return ''
                }
                return moment(params.value).format('DD/MM/YYYY HH:MM')
            }
        },
        {
            field: 'status',
            headerName: 'TRẠNG THÁI',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Chip
                        label={ORDER_STATUS[params.row.status - 1].name}
                        sx={{
                            border: `1px solid ${ORDER_STATUS[params.row.status - 1].color}`,
                            color: `${ORDER_STATUS[params.row.status - 1].color}`
                        }}
                    />
                )
            }
        },
        {
            field: 'actions',
            headerName: 'TÁC VỤ',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <Tooltip title="Xem chi tiết" placement="left">
                            <IconButton
                                aria-label="view"
                                size="small"
                                onClick={() => {
                                    navigate(`/mamager/admin/orders/details/${params.row.id}`)
                                }}>
                                <VisibilityIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                        {params.row.status !== 4 ? (
                            <Tooltip title="Xóa" placement="right">
                                <IconButton
                                    aria-label="delete"
                                    size="small"
                                    onClick={() => {
                                        setSelectedRow(params)
                                        setIsOpenConfirmModal(true)
                                    }}>
                                    <ClearRoundedIcon fontSize="inherit" />
                                </IconButton>
                            </Tooltip>
                        ) : null}
                    </>
                )
            }
        }
    ]
    return (
        <>
            <ConfirmModal
                isOpen={isOpenConfirmModal}
                title="Xác nhận"
                content={`Bạn có muốn xóa đơn hàng này?`}
                handleClose={() => setIsOpenConfirmModal(false)}
                handleConfirm={() => handleDelete()}
            />
            <h2>Danh sách đơn hàng</h2>
            <Box sx={{ mb: 2, mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                    id="outlined-select-currency"
                    select
                    size="small"
                    label="Trạng thái đơn hàng"
                    value={status}
                    onChange={(event) => {
                        setStatus(event.target.value)
                    }}
                    sx={{ width: '200px' }}>
                    <MenuItem value={-1}>Tất cả</MenuItem>
                    {ORDER_STATUS.map((i) => {
                        return (
                            <MenuItem value={i.id} key={i.id}>
                                {i.name}
                            </MenuItem>
                        )
                    })}
                </TextField>
            </Box>
            <DataTable columns={columns} rows={listProducts} />
        </>
    )
}
