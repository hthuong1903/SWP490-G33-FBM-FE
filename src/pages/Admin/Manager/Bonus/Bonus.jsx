import BonusApi from '@/api/BonusApi'
import DataTable from '@/components/Common/DataTable'
import ConfirmModal from '@/components/Common/Modal/ConfirmModal'
import { ClearRounded, EditRounded } from '@mui/icons-material'
import { Box, Button, IconButton, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ModalAddBonus from './components/ModalAddBonus'
import ModalUpdateBonus from './components/ModalUpdateBonus'

function Bonus() {
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState({})
    const [listBonus, setListBonus] = useState([])
    const [isRender, setIsRender] = useState(true)
    const [isEdit, setIsEdit] = useState(true)

    const handleDelete = async () => {
        try {
            await BonusApi.deleteBonus(selectedRow?.row.id)
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
        const getListBonus = async () => {
            try {
                const response = await BonusApi.getBonus()
                setListBonus(response.data)
                console.log(response)
            } catch (error) {
                console.log('fail when getListBonus', error)
            }
        }
        isRender && getListBonus()
        setIsRender(false)
    }, [isRender, listBonus])

    const columns = [
        { field: 'id', headerName: 'MÃ SẢN PHẨM', flex: 1, hide: true },
        { field: 'typeOfBonus', headerName: 'NỘI DUNG', flex: 1 },
        { field: 'money', headerName: 'SỐ TIỀN', flex: 1 },
        { field: 'content', headerName: 'NỘI DUNG', flex: 1 },
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
                <ModalAddBonus
                    isOpen={isOpenAddModal}
                    title={'Thêm thưởng'}
                    handleClose={() => {
                        setIsOpenAddModal(false)
                        setIsRender(true)
                    }}
                    handleConfirm={() => setIsRender(true)}
                    isEdit={isEdit}
                />
            )}

            {isOpenUpdateModal && selectedRow && (
                <ModalUpdateBonus
                    isOpen={isOpenUpdateModal}
                    title={'Cập nhật thưởng'}
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
                    content={`Bạn có muốn xóa thưởng ${selectedRow?.row.typeOfBonus}?`}
                    handleClose={() => setIsOpenConfirmModal(false)}
                    handleConfirm={() => handleDelete()}
                />
            )}
            <h2>Quản lý thưởng</h2>
            <Box sx={{ mb: 2, mt: 3, display: 'flex' }}>
                <Button
                    variant="contained"
                    onClick={() => {
                        setIsOpenAddModal(true)
                    }}>
                    Thêm thưởng
                </Button>
            </Box>
            <DataTable columns={columns} rows={listBonus} />
        </>
    )
}

export default Bonus
