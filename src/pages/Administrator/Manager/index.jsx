import AccountApi from '@/api/AccountApi'
import DataTable from '@/components/Common/DataTable'
import ConfirmModal from '@/components/Common/Modal/ConfirmModal'
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ModelAddStaffAccount from '../Staff/components/ModelAddStaffAccount'
import ModelUpdateAccount from '../Staff/components/ModelUpdateAccount'
export default function ManagerAccount() {
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const [listManagerAccount, setlistManagerAccount] = useState([])
    const [isUpdated, setIsUpdated] = useState(false)
    const [isEdit, setIsEdit] = useState(true)
    const [isOpenConfirmModelReset, setIsOpenConfirmModelReset] = useState(false)

    useEffect(() => {
        const getAllManagerAccount = async () => {
            try {
                const response = await AccountApi.getAllAccount()
                setlistManagerAccount(response.data.filter(e => e.roles[0]=="MANAGER").map(e => { return {
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
            toast.success('Xóa thành công !')
            setIsOpenConfirmModal(false)
            setIsUpdated(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleResetPassword = async () => {
        try {
            await AccountApi.resetPassword(selectedRow?.row.id)
            toast.success('Reset Mat Khau Thanh cong !')
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
            headerName: 'Ho va ten',
            flex: 1,
        },
        {
            field: 'username',
            headerName: 'Ten dang nhap',
            flex: 1
        },
        { 
            field: 'email', 
            headerName: 'Email', 
            flex: 1 
        },
        { 
            field: 'updateDate', 
            headerName: 'Ngay cap nhap', 
            flex: 1 
        },
        {
            field: 'details',
            headerName: 'THÔNG TIN ĐẦY ĐỦ',
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
            headerName: '', 
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
                                
                            }}>
                            Xóa
                        </Button>
                        <Button sx={{m: 0.25}}
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
                    title={'Tao Tai khoan'}
                    handleClose={() => setIsOpenAddModal(false)}
                    handleConfirm={() => setIsUpdated(true)}
                    isEdit={isEdit}
                />
            )}
            {isOpenUpdateModal && (
                <ModelUpdateAccount
                    isOpen={isOpenUpdateModal}
                    title={'Cập nhật Tai Khoan'}
                    handleClose={() => setIsOpenUpdateModal(false)}
                    handleConfirm={() => setIsUpdated(true)}
                    selectedData={selectedRow.row}
                    isEdit={isEdit}
                />
            )}
            <ConfirmModal
                isOpen={isOpenConfirmModal}
                title="Xác nhận"
                content={`Bạn có muốn xóa ${selectedRow?.row?.name}?`}
                handleClose={() => setIsOpenConfirmModal(false)}
                handleConfirm={() => handleDelete()}
            />
            <ConfirmModal 
                isOpen={isOpenConfirmModelReset}
                title="Xac Nhan"
                content={`Ban co muon reset mat khau cho ${selectedRow?.row.name}?`}
                handleClose={() => setIsOpenConfirmModelReset(false)}
                handleConfirm={() => handleResetPassword()}
            />
            <h2>Quản lý Tai Khoan Nhan Vien Quan li</h2>
            <Box sx={{ mb: 2, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button sx={{mr: 2}}
                    variant="contained"
                    onClick={() => {
                        
                    }}>
                    Xoa ban ghi da chon
                </Button>
                <Button 
                    variant="contained"
                    onClick={() => {
                        setIsOpenAddModal(true)
                    }}>
                    Tao tai khoan
                </Button>
            </Box>
            <DataTable columns={columns} rows={listManagerAccount} />
        </>
    )
}
// {/* <DataTable columns={columns} rows={rows} /> */}