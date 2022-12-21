import categoryApi from '@/api/categoryApi'
import DataTable from '@/components/Common/DataTable'
import ConfirmModal from '@/components/Common/Modal/ConfirmModal'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { Button, IconButton, Tooltip, Typography, Avatar } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ModalAddCategory from './components/ModalAddCategory'
import ModalUpdateCategory from './components/ModalUpdateCategory'

export default function Category() {
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const [listCategory, setListCategory] = useState([])
    const [isUpdated, setIsUpdated] = useState(false)
    const [isEdit, setIsEdit] = useState(true)

    useEffect(() => {
        const getAllCategory = async () => {
            try {
                const response = await categoryApi.getAllCategory()
                setListCategory(response.data)
            } catch (error) {
                console.log('fail at getAllCategory', error)
            }
        }
        getAllCategory()
        setIsUpdated(false)
    }, [isUpdated])

    const handleDelete = async () => {
        try {
            const response = await categoryApi.deleteCategory(selectedRow?.row.id)
            if (response.message == 'Xóa thất bại'){
                toast.error('Danh mục có chứa sản phẩm, không thể xóa !')
            }
            else{
                toast.success('Xóa thành công !')
            }
            setIsOpenConfirmModal(false)
            setIsUpdated(true)
        } catch (error) {
            console.log(error)
        }
    }

    const columns = [
        {
            field: 'urlImage',
            headerName: 'ẢNH SẢN PHẨM',
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <Box>
                        <Avatar sx={{width: 48, height: 48}} src={params.row.urlImage} />
                    </Box>
                )
            }
        },
        {
            field: 'name',
            headerName: 'TÊN DANH MỤC',
            flex: 1,
            // renderCell: (params) => {
            //     return <Typography sx={{ fontWeight: 'bold' }}>{params.value}</Typography>
            // }
            renderCell: (params) => {
                return (
                    <Typography sx={{ fontWeight: 'bold' }}>
                        {params.value}
                    </Typography>
                )
            }
        },
        {
            field: 'description',
            headerName: 'MÔ TẢ DANH MỤC',
            flex: 1
        },
        {
            field: 'quantity',
            headerName: 'SỐ SẢN PHẨM',
            flex: 0.75,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'view',
            headerName: 'THAO TÁC',
            headerAlign: 'center',
            align: 'center',
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
    return (
        <>
            {isOpenAddModal && (
                <ModalAddCategory
                    isOpen={isOpenAddModal}
                    title={'Thêm danh mục'}
                    handleClose={() => setIsOpenAddModal(false)}
                    handleConfirm={() => setIsUpdated(true)}
                    isEdit={isEdit}
                />
            )}

            {isOpenUpdateModal && (
                <ModalUpdateCategory
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
            <h2>Quản lý danh mục</h2>
            <Box sx={{ mb: 2, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    onClick={() => {
                        setIsOpenAddModal(true)
                    }}>
                    Thêm danh mục
                </Button>
            </Box>
            <DataTable columns={columns} rows={listCategory} />
        </>
    )
}
