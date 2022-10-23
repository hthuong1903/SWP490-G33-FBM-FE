import categoryApi from '@/api/categoryApi'
import contractApi from '@/api/contractApi'
import DataTable from '@/components/Common/DataTable'
import ConfirmModal from '@/components/Common/Modal/ConfirmModal'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { Button, Chip, IconButton, MenuItem, TextField, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment/moment'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ModalAddContract from './components/ModalAddContract'
import ModalUpdateContract from './components/ModalUpdateContract'

export default function Contract() {
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const [listContract, setContractList] = useState([])
    const [isUpdated, setIsUpdated] = useState(false)
    const [isEdit, setIsEdit] = useState(true)
    const [expired, setExpired] = useState(-1)

    useEffect(() => {
        const getAllContracts = async (expired) => {
            try {
                const response = await contractApi.getAllContracts(expired)
                setContractList(response.data)
            } catch (error) {
                console.log('fail at getAllContracts', error)
            }
        }
        getAllContracts(expired)
        setIsUpdated(false)
    }, [isUpdated, expired])

    const handleDelete = async () => {
        try {
            await contractApi.deleteContract(selectedRow?.row.id)
            toast.success('Xóa thành công !')
            setIsOpenConfirmModal(false)
            setIsUpdated(true)
        } catch (error) {
            console.log(error)
        }
    }

    const columns = [
        {
            field: 'content',
            headerName: 'TÊN',
            flex: 1,
            renderCell: (params) => {
                return <Typography sx={{ fontWeight: 'bold' }}>{params.value}</Typography>
            }
        },
        {
            field: 'role',
            headerName: 'VAI TRÒ',
            flex: 1,
            renderCell: (params) => {
                return <Chip label={params.row.employee.roles[0].name} color="primary" />
            }
        },
        {
            field: 'startDate',
            headerName: 'NGÀY BẮT ĐẦU',
            flex: 1,
            renderCell: (params) => {
                return moment(params.row.startDate).format('DD/MM/YYYY')
            }
        },
        {
            field: 'endDate',
            headerName: 'NGÀY KẾT THÚC',
            flex: 1,
            renderCell: (params) => {
                return moment(params.row.endDate).format('DD/MM/YYYY')
            }
        },
        {
            field: 'contractTerm',
            headerName: 'THỜI HẠN',
            flex: 1,
            valueFormatter: (params) => {
                if (params.value == null) {
                    return ''
                }
                return `${params.value} năm`
            }
        },
        {
            field: 'signTimes',
            headerName: 'SỐ LẦN KÝ',
            flex: 1,
            type: 'number'
        },
        {
            field: 'salary',
            headerName: 'LƯƠNG CƠ BẢN',
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
            field: 'action',
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
                                    console.log(params)
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
                <ModalAddContract
                    isOpen={isOpenAddModal}
                    title={'Thêm hợp đồng'}
                    handleClose={() => setIsOpenAddModal(false)}
                    handleConfirm={() => setIsUpdated(true)}
                    isEdit={isEdit}
                />
            )}
            {isOpenUpdateModal && (
                <ModalUpdateContract
                    isOpen={isOpenUpdateModal}
                    title={'Cập nhật hợp đồng'}
                    handleClose={() => setIsOpenUpdateModal(false)}
                    handleConfirm={() => setIsUpdated(true)}
                    selectedData={selectedRow}
                    isEdit={isEdit}
                />
            )}
            <ConfirmModal
                isOpen={isOpenConfirmModal}
                title="Xác nhận"
                content={`Bạn có muốn xóa ${selectedRow?.row.content}?`}
                handleClose={() => setIsOpenConfirmModal(false)}
                handleConfirm={() => handleDelete()}
            />
            <h2>Quản lý hợp đồng</h2>
            <Box sx={{ mb: 2, mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                    id="outlined-select-currency"
                    select
                    size="small"
                    label="Tình trạng"
                    value={expired}
                    onChange={(event) => {
                        setExpired(event.target.value)
                    }}>
                    <MenuItem value={-1}>Tất cả</MenuItem>
                    <MenuItem value={1}>Chưa hết hạn</MenuItem>
                    <MenuItem value={2}>Hết hạn</MenuItem>
                </TextField>
                <Button
                    variant="contained"
                    onClick={() => {
                        setIsOpenAddModal(true)
                    }}>
                    Thêm hợp đồng
                </Button>
            </Box>
            <DataTable columns={columns} rows={listContract} />
        </>
    )
}
