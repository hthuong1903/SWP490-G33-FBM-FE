import orderApi from '@/api/orderApi'
import productApi from '@/api/productApi'
import DataTable from '@/components/Common/DataTable'
import ConfirmModal from '@/components/Common/Modal/ConfirmModal'
import { EditRounded } from '@mui/icons-material'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import { Button, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import moment from 'moment/moment'

function Receipt() {
    const navigate = useNavigate()
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const [listProducts, setListProducts] = useState([])
    const [isRender, setIsRender] = useState(true)

    const handleDelete = async () => {
        try {
            await productApi.deleteProduct(selectedRow?.row.id)
            toast.success('Xóa thành công !')
            setIsOpenConfirmModal(false)
            setIsRender(true)
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
        isRender && getAllProduct(3)
        setIsRender(false)
    }, [listProducts, isRender])

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1, hide: true },
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
            field: 'createdBy',
            headerName: 'NGƯỜI TẠO',
            flex: 1,
            renderCell: (params) => {
                return params.row.employeeSale.username
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
            field: 'actions',
            headerName: 'TÁC VỤ',
            flex: 1.5,
            renderCell: (params) => {
                return (
                    <>
                        <Tooltip title="Xem">
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => {
                                    navigate(`/admin/receipts/details/${params.row.id}`)
                                }}>
                                Xem
                            </Button>
                        </Tooltip>
                        <Tooltip title="Xóa" sx={{ m: 1 }}>
                            <Button
                                aria-label="delete"
                                variant="contained"
                                size="small"
                                onClick={() => {
                                    setSelectedRow(params)
                                    setIsOpenConfirmModal(true)
                                }}>
                                XÓA
                                <ClearRoundedIcon fontSize="inherit" />
                            </Button>
                        </Tooltip>
                        <Tooltip title="XUẤT">
                            <Button
                                aria-label="delete"
                                variant="contained"
                                size="small"
                                onClick={() => {
                                    setSelectedRow(params)
                                    console.log(params)
                                }}>
                                Xuất
                                <EditRounded fontSize="inherit" />
                            </Button>
                        </Tooltip>
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
            <h2>Quản lý hóa đơn</h2>
            <Box
                sx={{
                    mb: 2,
                    mt: 3,
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                <Button
                    variant="contained"
                    sx={{ float: 'right' }}
                    onClick={() => navigate('../receipts/createReceipt')}>
                    Thêm hóa đơn
                </Button>
            </Box>

            <DataTable columns={columns} rows={listProducts} />
        </>
    )
}

export default Receipt
