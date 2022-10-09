import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useForm } from 'react-hook-form'
import { InputLabel } from '@mui/material'
import schema from '../validation'
import { toast } from 'react-toastify'
export default function ModalAddProduct({ title, content, isOpen, handleClose, handleConfirm }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const onSubmit = (data) =>{
    toast.success('Tạo sản phẩm thành công')
  }
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="md">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

      <DialogContent>
        <Grid container sx={{ mt: 1 }}>
          <Grid item xs={6}>
            1
          </Grid>
          <Grid item xs={6} sx={{ '& .MuiTextField-root': { mb: 2 } }}>
            <Box>
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                label="Tên"
                variant="outlined"
                {...register('name')}
                error={errors.name ? true : false}
                helperText={errors.name?.message}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                label="Thể loại"
                variant="outlined"
                {...register('category')}
                error={errors.category ? true : false}
                helperText={errors.category?.message}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                label="Nhà cung cấp"
                variant="outlined"
                {...register('supplier')}
                error={errors.supplier ? true : false}
                helperText={errors.supplier?.message}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                label="Số lượng"
                variant="outlined"
                {...register('quantity')}
                error={errors.quantity ? true : false}
                helperText={errors.quantity?.message}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                label="Giá sản phẩm"
                variant="outlined"
                {...register('price')}
                error={errors.price ? true : false}
                helperText={errors.price?.message}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                multiline
                rows={4}
                maxRows={10}
                size="small"
                id="outlined-basic"
                label="Mô tả sản phẩm"
                variant="outlined"
                {...register('description')}
                error={errors.description ? true : false}
                helperText={errors.description?.message}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy bỏ</Button>
        <Button onClick={handleSubmit(onSubmit)} autoFocus>
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  )
}
