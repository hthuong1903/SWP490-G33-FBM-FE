import { Avatar, Button, IconButton, MenuItem, TextField, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import ModalAddProduct from './components/ModalAddProduct'
import DataTable from '@/components/Common/DataTable'
import ConfirmModal from '@/components/Common/Modal/ConfirmModal'
import { toast } from 'react-toastify'
export default function Product() {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [category, setCategory] = useState(1)
  const [provider, setProvider] = useState(1)

  const handleDelete = () => {
    toast.success('Xóa thành công !')
    setIsOpenConfirmModal(false)
  }
  const handleEdit = (params) => {}
  const columns = [
    {
      field: 'img',
      headerName: 'ẢNH',
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <Avatar src={params.row.img} />
          </div>
        )
      }
    },
    { field: 'name', headerName: 'TÊN', flex: 1 },
    { field: 'quantity', headerName: 'SỐ LƯỢNG', flex: 1 },
    { field: 'totalAmount', headerName: 'TỔNG GIÁ TIỀN', flex: 1 },
    { field: 'details', headerName: 'THÔNG TIN ĐẦY ĐỦ', flex: 1 },
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
              <IconButton aria-label="delete" size="small" onClick={() => handleEdit(params)}>
                <EditRoundedIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </>
        )
      }
    }
  ]
  const rows = [
    {
      id: 1,
      img: 'https://letsenhance.io/static/334225cab5be263aad8e3894809594ce/75c5a/MainAfter.jpg',
      name: 'Le Anh Tuan',
      quantity: 12,
      totalAmount: 20000,
      details: 'hehe',
      actions: 'ok'
    },
    {
      id: 2,
      img: 'https://letsenhance.io/static/334225cab5be263aad8e3894809594ce/75c5a/MainAfter.jpg',
      name: 'Nguyen Van A',
      quantity: 12,
      totalAmount: 20000,
      details: 'hehe',
      actions: 'ok'
    },
    {
      id: 3,
      img: 'https://letsenhance.io/static/334225cab5be263aad8e3894809594ce/75c5a/MainAfter.jpg',
      name: 'Nguyen Van A',
      quantity: 12,
      totalAmount: 20000,
      details: 'hehe',
      actions: 'ok'
    }
  ]
  return (
    <>
      {isOpenAddModal && (
        <ModalAddProduct
          isOpen={isOpenAddModal}
          title={'Thêm sản phẩm'}
          handleClose={() => setIsOpenAddModal(false)}
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
        <Box>
          <TextField
            id="outlined-select-currency"
            select
            size="small"
            label="Nhà cung cấp"
            value={provider}
            onChange={(event) => {
              setProvider(event.target.value)
            }}
            sx={{ mr: 2 }}>
            <MenuItem value={1}>Le Anh Tuan</MenuItem>
            <MenuItem value={2}>Twenty</MenuItem>
            <MenuItem value={3}>Thirty</MenuItem>
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            size="small"
            label="Category"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value)
            }}>
            <MenuItem value={1}>Le Anh Tuan</MenuItem>
            <MenuItem value={2}>Twenty</MenuItem>
            <MenuItem value={3}>Thirty</MenuItem>
          </TextField>
        </Box>
        <Button
          variant="contained"
          onClick={() => {
            setIsOpenAddModal(true)
          }}>
          Thêm sản phẩm
        </Button>
      </Box>
      <DataTable columns={columns} rows={rows} />
    </>
  )
}
