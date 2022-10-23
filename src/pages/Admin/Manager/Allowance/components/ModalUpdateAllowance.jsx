import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import schema from '../validation'

function ModalUpdateAllowance(title, selectedData, isOpen, handleClose, handleConfirm, isEdit) {
    useEffect(() => {
        console.log(selectedData)
    }, [selectedData])

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

        // axios
        //     .post(
        //         'http://20.205.46.182:8081/api/storage_server/upload/product_image_by_update',
        //         formData
        //     )
        //     .then((res) => {
        //         console.log('up anh thanh cong', res.data.data[0])
        //         const dataSubmit = {
        //             ...data,
        //             provider: { id: provider },
        //             category: { id: category },
        //             discount: discountValue,
        //             productPhoto: {
        //                 photoMainName: res.data.data[0].photoMainName,
        //                 photoOnceName: res.data.data[0].photoOnceName,
        //                 photoSecondName: res.data.data[0].photoSecondName,
        //                 photoThirdName: res.data.data[0].photoThirdName
        //             }
        //         }
        //         axios
        //             .put('http://20.205.46.182:8081/api/products', dataSubmit)
        //             .then((res) => {
        //                 console.log(res)
        //                 toast.success('Cập nhật sản phẩm thành công')
        //                 handleConfirm && handleConfirm(true)
        //             })
        //             .catch((error) => console.log(error))

        //         console.log(dataSubmit)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
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
                        <Box>
                            <TextField
                                fullWidth
                                size="small"
                                id="outlined-basic"
                                label="Tên"
                                variant="outlined"
                                value={selectedData?.row.typeOfAllowance}
                                disabled={!isEdit}
                                {...register('name')}
                                error={errors.name ? true : false}
                                helperText={errors.name?.message}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6} sx={{ '& .MuiTextField-root': { mb: 3 } }}>
                        <Box>
                            <TextField
                                fullWidth
                                id="outlined-select-currency"
                                select
                                size="small"
                                label="Số tiền"
                                value={selectedData?.row.money}
                                sx={{ mr: 2 }}
                                disabled={!isEdit}
                                {...register('money')}
                                error={errors.money ? true : false}
                                helperText={errors.money?.message}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
                            <TextField
                                disabled={!isEdit}
                                fullWidth
                                multiline
                                rows={6}
                                maxRows={10}
                                size="small"
                                id="outlined-basic"
                                label="Nội dung"
                                variant="outlined"
                                value={selectedData?.row.description}
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

export default ModalUpdateAllowance
