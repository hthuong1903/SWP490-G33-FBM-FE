import categoryApi from '@/api/categoryApi'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, TextField, Grid } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import schema from '../validation'
import ImageUpload from '../../Provider/components/ImageUpload'
import { useEffect, useState } from 'react'

export default function ModalAddCategory({ title, isOpen, handleClose, handleConfirm, isEdit }) {
    const [imageData, setImageData] = useState(null)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })
    const onSubmit = (data) => {
        console.log(data)
        console.log("imaeData", imageData)
        const formData = new FormData()
        formData.append('photo_main', imageData?.photoMainName)
        categoryApi
            .uploadImage(formData)
            .then((res) => {
                console.log('up anh thanh cong', res)
                const dataSubmit = {
                    ...data,
                    urlImage: res.data.data[0].photoMainName
                }        
            categoryApi
            .createCategory(dataSubmit)
            .then((res) => {
                console.log('data', res.data.data)
                if (res.data.data.length) {
                    toast.success(res.data.message)
                    handleConfirm && handleConfirm(true)
                    handleClose && handleClose()
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        })
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
                        {/* Upload image */}
                        <ImageUpload onSubmit={(images) => setImageData(images)} isEdit={isEdit} />
                    </Grid>
                    <Grid item xs={6} sx={{ '& .MuiTextField-root': { mb: 3 } }}>
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                fullWidth
                                size="small"
                                id="outlined-basic"
                                label="Tên"
                                variant="outlined"
                                placeholder="Nhập tên thể loại"
                                {...register('name')}
                                error={errors.name ? true : false}
                                helperText={errors.name?.message}
                            />
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={6}
                                maxRows={10}
                                size="small"
                                id="outlined-basic"
                                label="Mô tả"
                                variant="outlined"
                                placeholder="Nhập nội dung"
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
