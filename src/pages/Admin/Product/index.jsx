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

export default function Product() {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [listProducts, setListProducts] = useState([])
  const [category, setCategory] = useState(-1)
  const [provider, setProvider] = useState(-1)

  const handleDelete = () => {
    toast.success('Xóa thành công !')
    setIsOpenConfirmModal(false)
  }
  const handleEdit = (params) => {
    console.log(params)
  }

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await productApi.getAllProduct()
        setListProducts(response.data)
        console.log(response)
      } catch (error) {
        console.log('fail when getAllProducts', error)
      }
    }
    getAllProducts()
  }, [])

  useEffect(() => {
    console.log(provider, category)
  }, [category, provider])
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
        return `${params.value} VND`
      }
    },
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
        <FilterTable
          chooseCategory={(category) => setCategory(category)}
          chooseProvider={(provider) => setProvider(provider)}
        />
        <Button
          variant="contained"
          onClick={() => {
            setIsOpenAddModal(true)
          }}>
          Thêm sản phẩm
        </Button>
      </Box>
      <DataTable columns={columns} rows={listProducts} />
    </>
  )
}
