import productApi from '@/api/productApi'
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
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    // const [listProducts, setListProducts] = useState([])
    const [category, setCategory] = useState(-1)
    const [provider, setProvider] = useState(-1)
    const [sortBy, setSortBy] = useState(-1)
    const [isUpdated, setIsUpdated] = useState(false)
    const [isEdit, setIsEdit] = useState(true)
    const navigate = useNavigate()
    const handleDelete = async () => {
        try {
            await productApi.deleteProduct(selectedRow?.row.id)
            toast.success('Xóa thành công !')
            setIsOpenConfirmModal(false)
            setIsUpdated(true)
        } catch (error) {
            console.log(error)
        }
    }
    const listProducts = [
        {
            id: 0,
            customerName: 'Dot',
            phone: '0972536780',
            totalReceipt: 1500000,
            createdOn: '2022-10-26',
            status: 0
        },
        {
            id: 1,
            customerName: 'Ga',
            phone: '0972536780',
            totalReceipt: 1500000,
            createdOn: '2022-10-26',
            status: 1
        },
        {
            id: 2,
            customerName: 'Ngu',
            phone: '0972536780',
            totalReceipt: 1500000,
            createdOn: '2022-10-26',
            status: 2
        },
        {
            id: 3,
            customerName: 'Si',
            phone: '0972536780',
            totalReceipt: 1500000,
            createdOn: '2022-10-26',
            status: 3
        }
    ]

    useEffect(() => {
        console.log(ORDER_STATUS.filter((i) => i.id === 3)[0].name)
    })

    const columns = [
        { field: 'customerName', headerName: 'TÊN KHÁCH HÀNG', flex: 1 },
        { field: 'phone', headerName: 'SỐ ĐIỆN THOẠI', flex: 1 },
        {
            field: 'totalReceipt',
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
            field: 'createdOn',
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
                        key={params.row.id}
                        label={ORDER_STATUS[params.row.id].name}
                        sx={{
                            border: `1px solid ${ORDER_STATUS[params.row.id].color}`,
                            color: `${ORDER_STATUS[params.row.id].color}`
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
                                    navigate(`/admin/orders/details/${params.row.id}`)
                                }}>
                                <VisibilityIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                        {params.row.id ? (
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
                content={`Bạn có muốn xóa ${selectedRow?.row.name}?`}
                handleClose={() => setIsOpenConfirmModal(false)}
                handleConfirm={() => handleDelete()}
            />
            <h2>Danh sách đơn hàng</h2>
            <Box sx={{ mb: 2, mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                    id="outlined-select-currency"
                    select
                    size="small"
                    value={sortBy}
                    onChange={(event) => {
                        setSortBy(event.target.value)
                    }}>
                    <MenuItem value={-1}>Sắp xếp theo mới nhất</MenuItem>
                    <MenuItem value={1}>Chưa hết hạn</MenuItem>
                    <MenuItem value={2}>Hết hạn</MenuItem>
                </TextField>
            </Box>
            <DataTable columns={columns} rows={listProducts} />
        </>
    )
}
