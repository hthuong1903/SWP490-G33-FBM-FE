import { Grow } from '@mui/material'
import productApi from '@/api/productApi'
import DataTable from '@/components/Common/DataTable'
import ConfirmModal from '@/components/Common/Modal/ConfirmModal'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { Avatar, Button, IconButton, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function Receipt() {
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const [listProducts, setListProducts] = useState([])
    const [category, setCategory] = useState(-1)
    const [provider, setProvider] = useState(-1)
    const [isExisted, setIsExisted] = useState(-1)
    const [isUpdated, setIsUpdated] = useState(false)

    const handleDelete = async () => {
        // try {
        //     await productApi.deleteProduct(selectedRow?.row.id)
        //     toast.success('Xóa thành công !')
        //     setIsOpenConfirmModal(false)
        //     setIsUpdated(true)
        // } catch (error) {
        //     console.log(error)
        // }
    }

    useEffect(() => {
        const getAllProducts = async (categoryId, providerId, isExist) => {
            try {
                const response = await productApi.getAllProduct(categoryId, providerId, isExist)
                setListProducts(response.data)
                console.log(response)
            } catch (error) {
                console.log('fail when getAllProducts', error)
            }
        }
        setIsUpdated(false)
        getAllProducts(category, provider, isExisted)
    }, [isUpdated, category, provider, isExisted])

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1, hide: true },
        { field: 'name', headerName: 'TÊN KHÁCH HÀNG', flex: 1 },
        { field: 'phone', headerName: 'SỐ ĐIỆN THOẠI', flex: 1 },
        { field: 'createdBy', headerName: 'NGƯỜI TẠO', flex: 1 },
        {
            field: 'totalPrice',
            headerName: 'TỔNG HÓA ĐƠN',
            flex: 1,
            type: 'number',
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
            flex: 1
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
                                    setSelectedRow(params)
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
                                <EditRoundedIcon fontSize="inherit" />
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
                <Button variant="contained" sx={{ float: 'right' }} onClick={() => {}}>
                    Thêm hóa đơn
                </Button>
            </Box>
            <DataTable columns={columns} rows={listProducts} />
        </>
    )
}

export default Receipt
