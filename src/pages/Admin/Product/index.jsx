import productApi from '@/api/productApi'
import DataTable from '@/components/Common/DataTable'
import ConfirmModal from '@/components/Common/Modal/ConfirmModal'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { Avatar, Button, IconButton, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import FilterTable from './components/FilterTable'
import ModalAddProduct from './components/ModalAddProduct'
import ModalUpdateProduct from './components/ModalUpdateProduct'
import useAuth from '../../../hooks/useAuth'
export default function Product() {
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const [listProducts, setListProducts] = useState([])
    const [category, setCategory] = useState(-1)
    const [provider, setProvider] = useState(-1)
    const [isExisted, setIsExisted] = useState(-1)
    const [isUpdated, setIsUpdated] = useState(false)
    const [isEdit, setIsEdit] = useState(true)
    const {auth} = useAuth()
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
    console.log(auth)
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
        {
            field: 'photoMainURl',
            headerName: 'ẢNH',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex' }}>
                        <Avatar src={params.row.photoMainURl} />
                        <Avatar src={params.row.photoOnceURL} />
                        <Avatar src={params.row.photoSecondURL} />
                        <Avatar src={params.row.photoThirdURL} />
                    </Box>
                )
            }
        },
        { field: 'productCode', headerName: 'MÃ SẢN PHẨM', flex: 1 },
        { field: 'name', headerName: 'TÊN', flex: 1 },
        { field: 'quantity', headerName: 'SỐ LƯỢNG', flex: 1 },
        {
            field: 'priceIn',
            headerName: 'GIÁ NHẬP',
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
            field: 'priceOut',
            headerName: 'GIÁ BÁN',
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
            field: 'discount',
            headerName: 'GIẢM GIÁ',
            flex: 1,
            type: 'number',
            valueFormatter: (params) => {
                if (params.value == null) {
                    return ''
                }
                return `${params.value}%`
            }
        },
        {
            field: 'details',
            headerName: 'THÔNG TIN ĐẦY ĐỦ',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setSelectedRow(params)
                                setIsEdit(false)
                                setIsOpenUpdateModal(true)
                            }}>
                            Xem
                        </Button>
                    </Box>
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
                        <Tooltip title="Xóa">
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
                        <Tooltip title="Chỉnh sửa">
                            <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={() => {
                                    setIsEdit(true)
                                    setSelectedRow(params)
                                    setIsOpenUpdateModal(true)
                                    console.log(params)
                                }}>
                                <EditRoundedIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </>
                )
            }
        }

        
    ]

    if (!auth?.roles.includes("MANAGER")) {
        for( var i = 0; i < columns.length; i++){ 
    
            if ( columns[i].field == "priceIn" || columns[i].field == "actions") { 
                
                columns.splice(i, 1); 
            }
        
        }
        
    }
    return (
        <>
            {isOpenAddModal && (
                <ModalAddProduct
                    isOpen={isOpenAddModal}
                    title={'Thêm sản phẩm'}
                    handleClose={() => setIsOpenAddModal(false)}
                    handleConfirm={() => setIsUpdated(true)}
                    isEdit={isEdit}
                />
            )}

            {isOpenUpdateModal && (
                <ModalUpdateProduct
                    isOpen={isOpenUpdateModal}
                    title={'Cập nhật sản phẩm'}
                    handleClose={() => setIsOpenUpdateModal(false)}
                    handleConfirm={() => setIsUpdated(true)}
                    selectedData={selectedRow}
                    isEdit={isEdit}
                />
            )}

            <ConfirmModal
                isOpen={isOpenConfirmModal}
                title="Xác nhận"
                content={`Bạn có muốn xóa ${selectedRow?.row.name}?`}
                handleClose={() => setIsOpenConfirmModal(false)}
                handleConfirm={() => handleDelete()}
            />
            <h2>Quản lý sản phẩm</h2>
            <Box sx={{ mb: 2, mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <FilterTable
                    chooseCategory={(category) => setCategory(category)}
                    chooseProvider={(provider) => setProvider(provider)}
                    chooseIsExisted={(isExisted) => setIsExisted(isExisted)}
                />

                <>
                    {auth?.roles.includes("MANAGER") && <Button
                        variant="contained"
                        onClick={() => {
                            setIsEdit(true)
                            setIsOpenAddModal(true)
                        }}>
                        Thêm sản phẩm
                    </Button>}
                </>
                
            </Box>
            <DataTable columns={columns} rows={listProducts} />
        </>
    )
}
