import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Controller, useForm } from 'react-hook-form'
import { InputLabel, InputAdornment } from '@mui/material'
import schema from '../validation'
import { toast } from 'react-toastify'
import NumberFormat from 'react-number-format'
import ImageUpload from './ImageUpload'

export default function ModalAddProduct({ title, content, isOpen, handleClose, handleConfirm }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const onSubmit = (data) => {
    console.log(data)
    toast.success('Tạo sản phẩm thành công')
  }
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="lg">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

      <DialogContent>
        <Grid container sx={{ mt: 1 }}>
          <Grid item xs={6}>
            {/* Upload image */}
          <ImageUpload />
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

            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Controller
                name="importPrice"
                variant="outlined"
                defaultValue=""
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <NumberFormat
                    name="importPrice"
                    size="small"
                    customInput={TextField}
                    label="Giá nhập"
                    thousandSeparator={true}
                    variant="outlined"
                    defaultValue=""
                    value={value}
                    onValueChange={(v) => {
                      onChange(Number(v.value))
                      // setTotalAmountEstimated(Number(v.value));
                    }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">VND</InputAdornment>
                    }}
                    error={!!error}
                    helperText={error ? error.message : null}
                    fullWidth
                  />
                )}
              />
              <Controller
                name="price"
                variant="outlined"
                defaultValue=""
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <NumberFormat
                    name="price"
                    size="small"
                    customInput={TextField}
                    label="Giá bán"
                    thousandSeparator={true}
                    variant="outlined"
                    defaultValue=""
                    value={value}
                    onValueChange={(v) => {
                      onChange(Number(v.value))
                      // setTotalAmountEstimated(Number(v.value));
                    }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">VND</InputAdornment>
                    }}
                    error={!!error}
                    helperText={error ? error.message : null}
                    fullWidth
                  />
                )}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: '20px' }}>
              <TextField
                fullWidth
                type="number"
                size="small"
                id="outlined-basic"
                label="Số lượng"
                variant="outlined"
                {...register('quantity')}
                error={errors.quantity ? true : false}
                helperText={errors.quantity?.message}
              />
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                label="Màu sắc"
                variant="outlined"
                {...register('color')}
                error={errors.color ? true : false}
                helperText={errors.color?.message}
              />
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                label="Chất liệu"
                variant="outlined"
                {...register('material')}
                error={errors.material ? true : false}
                helperText={errors.material?.message}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: '20px' }}>
              <TextField
                fullWidth
                type="number"
                size="small"
                id="outlined-basic"
                label="Chiều rộng"
                variant="outlined"
                {...register('width')}
                error={errors.width ? true : false}
                helperText={errors.width?.message}
                InputProps={{
                  endAdornment: <InputAdornment position="start">cm</InputAdornment>
                }}
              />
              <TextField
                fullWidth
                type="number"
                size="small"
                id="outlined-basic"
                label="Chiều dài"
                variant="outlined"
                {...register('length')}
                error={errors.length ? true : false}
                helperText={errors.length?.message}
                InputProps={{
                  endAdornment: <InputAdornment position="start">cm</InputAdornment>
                }}
              />
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                label="Chiều cao"
                variant="outlined"
                {...register('height')}
                error={errors.height ? true : false}
                helperText={errors.height?.message}
                InputProps={{
                  endAdornment: <InputAdornment position="start">cm</InputAdornment>
                }}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                multiline
                rows={6}
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
