import AllowanceApi from '@/api/AllowanceApi'
import DataTable from '@/components/Common/DataTable'
import ConfirmModal from '@/components/Common/Modal/ConfirmModal'
import { ClearRounded, EditRounded } from '@mui/icons-material'
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import ModalAddAllowance from './components/ModalAddAllowance'
import ModalUpdateAllowance from './components/ModalUpdateAllowance'

function Allowance() {
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState({})
    const [listAllowance, setListAllowance] = useState([])
    const [isRender, setIsRender] = useState(true)
    const [isEdit, setIsEdit] = useState(true)

    const handleDelete = async () => {
        try {
            await AllowanceApi.deleteAllowance(selectedRow?.row.id)
            toast.success('Xóa thành công !')
            setIsOpenConfirmModal(false)
            setIsRender(true)
        } catch (error) {
            console.log(error)
        }
    }
    const handleEdit = (params) => {
        setIsEdit(true)
        setSelectedRow(params)
        setIsOpenUpdateModal(true)
        console.log(params)
    }

    useEffect(() => {
        const getListAllowance = async () => {
            try {
                const response = await AllowanceApi.getAllowance()
                setListAllowance(response.data)
                console.log(response)
            } catch (error) {
                console.log('fail when getListAllowance', error)
            }
        }
        isRender && getListAllowance()
        setIsRender(false)
    }, [isRender, listAllowance])

    const columns = [
        { field: 'id', headerName: 'MÃ SẢN PHẨM', flex: 1, hide: true },
        { field: 'typeOfAllowance', headerName: 'NỘI DUNG', flex: 1,
            renderCell: (params) => {
                return (
                    <Typography sx={{ fontWeight: 'bold' }}>{
                    params.row.typeOfAllowance }
                    </Typography>
                )
            }
        },
        { 
            field: 'money', 
            headerName: 'SỐ TIỀN', 
            flex: 1, 
            headerAlign: 'center',
            align: 'center',
            valueFormatter: (params) => {
                if (params.value == null) {
                    return ''
                }
                return `${params.value.toLocaleString('vi-VN')} VND`
            }
        },
        { 
            field: 'content', 
            headerName: 'NỘI DUNG CHI TIẾT', 
            flex: 1.5
        },
        {
            field: 'actions',
            headerName: 'TÁC VỤ',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
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
                                <ClearRounded fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Chỉnh sửa">
                            <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={() => handleEdit(params)}>
                                <EditRounded fontSize="inherit" />
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
                <ModalAddAllowance
                    isOpen={isOpenAddModal}
                    title={'Thêm trợ cấp'}
                    handleClose={() => {
                        setIsOpenAddModal(false)
                        setIsRender(true)
                    }}
                    handleConfirm={() => setIsRender(true)}
                    isEdit={isEdit}
                />
            )}

            {isOpenUpdateModal && selectedRow && (
                <ModalUpdateAllowance
                    isOpen={isOpenUpdateModal}
                    title={'Cập nhật trợ cấp'}
                    handleClose={() => {
                        setIsOpenUpdateModal(false)
                        setIsRender(true)
                    }}
                    handleConfirm={() => setIsRender(true)}
                    selectedData={selectedRow.row}
                    isEdit={isEdit}
                />
            )}

            {isOpenConfirmModal && (
                <ConfirmModal
                    isOpen={isOpenConfirmModal}
                    title="Xác nhận"
                    content={`Bạn có muốn xóa phụ cấp ${selectedRow?.row.typeOfAllowance}?`}
                    handleClose={() => setIsOpenConfirmModal(false)}
                    handleConfirm={() => handleDelete()}
                />
            )}
            <h2>Quản lý phụ cấp</h2>
            <Box sx={{ mb: 2, mt: 3, display: 'flex', justifyContent: 'flex-end'}}>
                <Button
                    variant="contained"
                    onClick={() => {
                        setIsOpenAddModal(true)
                    }}>
                    Thêm phụ cấp
                </Button>
            </Box>
            <DataTable columns={columns} rows={listAllowance} />
        </>
    )
}

export default Allowance
