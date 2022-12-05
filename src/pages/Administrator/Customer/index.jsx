import AccountApi from '@/api/AccountApi'
import DataTable from '@/components/Common/DataTable'
import ConfirmModal from '@/components/Common/Modal/ConfirmModal'
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ModelAddStaffAccount from '../Staff/components/ModelAddStaffAccount'
import ModelUpdateAccount from '../Staff/components/ModelUpdateAccount'
export default function CustomerAccount() {
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const [listCustomerAccount, setlistCustomerAccount] = useState([])
    const [isUpdated, setIsUpdated] = useState(false)
    const [isEdit, setIsEdit] = useState(true)
    const [isOpenConfirmModelReset, setIsOpenConfirmModelReset] = useState(false)

    useEffect(() => {
        const getAllManagerAccount = async () => {
            try {
                const response = await AccountApi.getAllAccountCustomer()
                setlistCustomerAccount(response.data.filter(e => e.roles[0]=="CUSTOMER").map(e => { return {
                    ...e, name: (e.firstName || '') +' '+(e.middleName || '') + ' '+ (e.lastName || ''),
                    updateDate: (e.lastModifiedDate.split('T')[0])}}
                ))
                console.log(response)
            } catch (error) {
                console.log('fail when getAllManagerAccount', error)
            }
        }
        setIsUpdated(false)
        getAllManagerAccount()
    }, [isUpdated])

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
            toast.success('Reset Mật Khẩu Thành Công !')
            setIsOpenConfirmModelReset(false)
            setIsUpdated(true)
        } catch (error) {
            console.log(error)
        }
    }

    const columns = [
        {
            field: 'staffCode',
            headerName: 'UserID',
            flex: 1,
        },
        {
            field: 'name',
            headerName: 'TÊN NHÂN VIÊN',
            flex: 1,
        },
        {
            field: 'username',
            headerName: 'TÊN ĐĂNG NHẬP',
            flex: 1
        },
        { 
            field: 'email', 
            headerName: 'EMAIL', 
            flex: 1 
        },
        { 
            field: 'updateDate', 
            headerName: 'NGÀY CẬP NHẬP', 
            headerAlign: 'center',
            align: 'center',
            flex: 1 
        },
        {
            field: 'details',
            headerName: 'THÔNG TIN CHI TIẾT',
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
            headerName: 'TÁC VỤ', 
            flex: 1,
            headerAlign: 'center',
            align: 'center',
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
                                
                            }}>
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
                title="Xác Nhận"
                content={`Bạn có muốn xóa ${selectedRow?.row?.name}?`}
                handleClose={() => setIsOpenConfirmModal(false)}
                handleConfirm={() => handleDelete()}
            />

            <ConfirmModal 
                isOpen={isOpenConfirmModelReset}
                title="Xác Nhận"
                content={`Bạn có muốn reset mật khẩu cho ${selectedRow?.row.name}?`}
                handleClose={() => setIsOpenConfirmModelReset(false)}
                handleConfirm={() => handleResetPassword()}
            />

            <h2>Quản lý Tài Khoản Khách Hàng</h2>
            <Box sx={{ mb: 2, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button sx={{mr: 2}}
                    variant="contained"
                    onClick={() => {
                        
                    }}>
                    Xóa bản ghi đã chọn
                </Button>
                <Button 
                    variant="contained"
                    onClick={() => {
                        setIsOpenAddModal(true)
                    }}>
                    Tạo tài khoản
                </Button>
            </Box>
            <DataTable columns={columns} rows={listCustomerAccount} />
        </>
    )
}
