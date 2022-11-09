import AccountApi from '@/api/AccountApi'
import DataTable from '@/components/Common/DataTable'
import ConfirmModal from '@/components/Common/Modal/ConfirmModal'
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ModelAddStaffAccount from './components/ModelAddStaffAccount'
import ModelUpdateAccount from './components/ModelUpdateAccount'

export default function StaffAccount() {
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [isOpenConfirmModelReset, setIsOpenConfirmModelReset] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const [listStaffAccount, setlistStaffAccount] = useState([])
    const [isUpdated, setIsUpdated] = useState(false)
    const [isEdit, setIsEdit] = useState(true)

    const handleDelete = async () => {
        try {
            await AccountApi.deleteAccount(selectedRow?.row.id)
            toast.success('Xóa Thành Công !')
            setIsOpenConfirmModal(false)
            setIsUpdated(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleResetPassword = async () => {
        try {
            await AccountApi.resetPassword(selectedRow?.row.id)
            toast.success('Reset Mật Khẩu Thành Công!')
            setIsOpenConfirmModelReset(false)
            setIsUpdated(true)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getAllStaffAccount = async () => {
            try {
                const response = await AccountApi.getAllAccount()
                setlistStaffAccount(response.data.filter(e => e.roles[0]=="SELLER").map(e => { return {
                    ...e, name: (e.firstName || '') +' '+(e.middleName || '') + ' '+ (e.lastName || ''),
                    updateDate: (e.lastModifiedDate.split('T')[0])
                
                }}
                ))
                console.log(response)
            } catch (error) {
                console.log('fail when getAllStaffAccount', error)
            }
        }
        setIsUpdated(false)
        getAllStaffAccount()
    }, [isUpdated])

    const columns = [
        {
            field: 'staffCode',
            headerName: 'UserID',
            flex: 1,
        },
        {
            field: 'name',
            headerName: 'Họ và Tên',
            flex: 1,
        },
        {
            field: 'username',
            headerName: 'Tên Đăng Nhập',
            flex: 1
        },
        { 
            field: 'email', 
            headerName: 'Email', 
            flex: 1 
        },
        {  
            field: 'updateDate', 
            headerName: 'Ngày Cập Nhập', 
            flex: 1 
        },
        {
            field: 'details',
            headerName: 'Thông Tin Chi Tiết',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '80%' }}>
                        <Button
                            variant="outlined"
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
            field: 'action', 
            headerName: 'Tác Vụ', 
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setIsEdit(true)
                                setSelectedRow(params)
                                setIsOpenUpdateModal(true)
                                console.log(params)
                            }}>
                            Edit
                        </Button>
                        <Button sx={{ml: 0.25}}
                            variant="outlined"
                            onClick={() => {
                                setSelectedRow(params)
                                setIsEdit(false)
                                setIsOpenConfirmModal(true)
                                
                            }}
                            >
                            Xóa
                        </Button>
                        <Button sx={{ml: 0.25}}
                            variant="outlined"
                            onClick={() => {
                                setSelectedRow(params)
                                setIsEdit(false)
                                setIsOpenConfirmModelReset(true)
                            }}
                            >
                            Reset
                        </Button>
                    </>
                )

            }
        },

    ]
    return (
        <>
            {isOpenAddModal && (
                <ModelAddStaffAccount
                    isOpen={isOpenAddModal}
                    title={'Tạo Tài Khoản'}
                    handleClose={() => setIsOpenAddModal(false)}
                    handleConfirm={() => setIsUpdated(true)}
                    isEdit={isEdit}
                />
            )}
            {isOpenUpdateModal && (
                <ModelUpdateAccount
                    isOpen={isOpenUpdateModal}
                    title={'Cập Nhập Tài Khoản'}
                    handleClose={() => setIsOpenUpdateModal(false)}
                    handleConfirm={() => setIsUpdated(true)}
                    selectedData={selectedRow.row}
                    isEdit={isEdit}
                />
            )}
            <ConfirmModal
                isOpen={isOpenConfirmModal}
                title="Xác nhận Xóa"
                content={`Bạn có muốn xóa ${selectedRow?.row?.name}?`}
                handleClose={() => setIsOpenConfirmModal(false)}
                handleConfirm={() => handleDelete()}
            />
            <ConfirmModal 
                isOpen={isOpenConfirmModelReset}
                title="Xác Nhận Reset"
                content={`Bạn có muốn reset mật khẩu cho ${selectedRow?.row.name}?`}
                handleClose={() => setIsOpenConfirmModelReset(false)}
                handleConfirm={() => handleResetPassword()}
            />

            <h2>Quản lý Tài Khoản Nhân Viên Bán Hàng</h2>
            <Box sx={{ mb: 2, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button sx={{mr: 2}}
                    variant="contained"
                    onClick={() => {
                        
                    }}>
                    Xóa Bản Ghi Đã Chọn
                </Button>
                <Button 
                    variant="contained"
                    onClick={() => {
                        setIsOpenAddModal(true)
                    }}>
                    Tạo Tài Khoản
                </Button>
            </Box>
            <DataTable columns={columns} rows={listStaffAccount} />
        </>
    )
}
