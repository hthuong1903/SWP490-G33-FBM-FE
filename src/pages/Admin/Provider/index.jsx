import providerApi from '@/api/providerApi'
import DataTable from '@/components/Common/DataTable'
import ConfirmModal from '@/components/Common/Modal/ConfirmModal'
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ModalAddProvider from './components/ModalAddProvider'
import ModalUpdateProvider from './components/ModalUpdateProvider'

export default function Provider() {
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const [listProvider, setListProvider] = useState([])
    const [isUpdated, setIsUpdated] = useState(false)
    const [isEdit, setIsEdit] = useState(true)

    const handleDelete = async () => {
        try {
            await providerApi.deleteProvider(selectedRow?.row.id)
            toast.success('Xóa thành công !')
            setIsOpenConfirmModal(false)
            setIsUpdated(true)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getAllProvider = async () => {
            try {
                const response = await providerApi.getAllProvider()
                setListProvider(response.data)
                console.log(response)
            } catch (error) {
                console.log('fail when getAllProvider', error)
            }
        }
        setIsUpdated(false)
        getAllProvider()
    }, [isUpdated])

    useEffect(() => {
        console.log('123', isEdit)
    }, [isEdit])

    const columns = [
        {
            field: 'name',
            headerName: 'TÊN NHÀ CUNG CẤP',
            flex: 1,
            renderCell: (params) => {
                return <Typography sx={{ fontWeight: 'bold' }}>{params.value}</Typography>
            }
        },
        {
            field: 'phone',
            headerName: 'SỐ ĐIỆN THOẠI',
            headerAlign: 'center',
            align: 'center',
            flex: 1
        },
        { field: 'email', headerName: 'EMAIL', flex: 1.5, headerAlign: 'center', align: 'center' },
        {
            field: 'content',
            headerName: 'ĐỊA CHỈ',
            headerAlign: 'center',
            flex: 2.5,
            renderCell: (params) => {
                return (
                    <p>
                        {params.row.address}/{params.row.ward.name}/{params.row.district.name}/
                        {params.row.province.name}
                    </p>
                )
            }
        },
        {
            field: 'details',
            headerName: 'CHI TIẾT',
            headerAlign: 'center',
            align: 'center',
            flex: 0.75,
            renderCell: (params) => {
                return (
                    // <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            console.log(params)
                            setSelectedRow(params)
                            setIsOpenUpdateModal(true)
                        }}>
                        Xem
                    </Button>
                    // </Box>
                )
            }
        },
        {
            field: 'delete',
            headerName: 'XÓA NHÀ CUNG CẤP',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Button
                        variant="contained"
                        onClick={() => {
                            setSelectedRow(params)
                            setIsOpenConfirmModal(true)
                        }}>
                        Xóa
                    </Button>
                )
            }
        }
    ]
    return (
        <>
            {isOpenAddModal && (
                <ModalAddProvider
                    isOpen={isOpenAddModal}
                    title={'Thêm nhà cung cấp'}
                    handleClose={() => setIsOpenAddModal(false)}
                    handleConfirm={() => setIsUpdated(true)}
                    isEdit={!isEdit}
                />
            )}

            {isOpenUpdateModal && (
                <ModalUpdateProvider
                    isOpen={isOpenUpdateModal}
                    title={'Cập nhật thông tin nhà cung cấp'}
                    handleClose={() => setIsOpenUpdateModal(false)}
                    handleConfirm={() => setIsUpdated(true)}
                    selectedData={selectedRow.row}
                    isEdit={!isEdit}
                />
            )}

            <ConfirmModal
                isOpen={isOpenConfirmModal}
                title="Xác nhận"
                content={`Bạn có muốn xóa ${selectedRow?.row?.name}?`}
                handleClose={() => setIsOpenConfirmModal(false)}
                handleConfirm={() => handleDelete()}
            />
            <h2>Quản lý nhà cung cấp</h2>
            <Box sx={{ mb: 2, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                {/* <FilterTable
                    chooseCategory={(category) => setCategory(category)}
                    chooseProvider={(provider) => setProvider(provider)}
                /> */}
                <Button
                    variant="contained"
                    onClick={() => {
                        setIsOpenAddModal(true)
                    }}>
                    Thêm nhà cung cấp
                </Button>
            </Box>
            <DataTable columns={columns} rows={listProvider} />
        </>
    )
}
