import categoryApi from '@/api/categoryApi'
import uploadApi from '@/api/uploadApi'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import ImageUpload from '../../Provider/components/ImageUpload'
import schema from '../validation'

export default function ModalUpdateCategory({
    title,
    isOpen,
    handleClose,
    handleConfirm,
    isEdit,
    selectedData
}) {
    const [imageData, setImageData] = useState(selectedData?.row.urlImage)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })
    const onSubmit = (data) => {
        console.log('imageData', imageData)
        const formData = new FormData()
        imageData?.photoMainName
            ? formData.append('file', imageData?.photoMainName)
            : formData.append('file', selectedData?.row.urlImage)

        uploadApi
            .uploadImage(formData)
            .then((res) => {
                console.log('Tải ảnh thành công', res.data.data[0])
                const dataSubmit = {
                    ...data,
                    id: selectedData?.row.id,
                    urlImage: res.data.data[0]
                }
                categoryApi
                    .updateCategory(dataSubmit)
                    .then((res) => {
                        console.log(res)
                        toast.success('Cập nhật thành công danh mục')
                        handleConfirm && handleConfirm(true)
                        handleClose && handleClose()
                    })
                    .catch((error) => {
                        toast.success('Cập nhật thất bại')
                        console.log(error)
                    })
            })
            .catch(() => {
                const dataSubmit = {
                    ...data,
                    id: selectedData?.row.id,
                    urlImage: selectedData?.row.image
                }
                categoryApi
                    .updateCategory(dataSubmit)
                    .then((res) => {
                        console.log(res)
                        toast.success('Cập nhật thành công danh mục')
                        handleConfirm && handleConfirm(true)
                        handleClose && handleClose()
                    })
                    .catch((error) => {
                        toast.success('Cập nhật thất bại')
                        console.log(error)
                    })
            })
    }

    useEffect(() => {
        console.log('selectedData', selectedData.row)
    }, [selectedData])

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
                        {isOpen && (
                            <ImageUpload
                                onSubmit={(images) => setImageData(images)}
                                selectedData={selectedData.row}
                                isEdit={isEdit}
                            />
                        )}
                    </Grid>
                    <Grid item xs={6} sx={{ '& .MuiTextField-root': { mb: 3 } }}>
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                fullWidth
                                size="small"
                                id="outlined-basic"
                                label="Tên"
                                defaultValue={selectedData?.row.name}
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
                                defaultValue={selectedData?.row.description}
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
