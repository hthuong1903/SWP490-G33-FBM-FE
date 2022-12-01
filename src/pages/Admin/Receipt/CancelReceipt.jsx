import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
import {FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextareaAutosize, Grid} from '@mui/material'
import { useForm } from 'react-hook-form'
import orderApi from '@/api/orderApi'
import { toast } from 'react-toastify'

export default function CancelReceipt({title, isOpen, handleClose, handleConfirm, isEdit, orderId}) {
    const [reason, setReason] = useState(null)
    
    const [value, setValue] = useState(1)

    const [selectedRow, setSelectedRow] = useState(null)

    const {
        register,
        handleSubmit,
        control,
        formState: {errors}
    } = useForm({
        mode: 'onChange'
    })

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const onSubmit = async (data) => {
        console.log(data)
        const dataSubmit = {
            ...data,
            orderId: orderId,
            contentCancelType: value
        }
        orderApi
            .createCancelOrder(dataSubmit)
            .then((res) => {
                console.log(res)
                toast.success('Thêm Tai Khoan Thanh Cong')
                handleConfirm && handleConfirm(true)
                handleClose && handleClose()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
            <FormControl>
                <Grid container>
                    <Grid item sx={6}>
                        <FormLabel 
                            id="demo-radio-buttons-group-label"
                            sx={{ display: 'block' }}
                        >
                            Lí do hủy hóa đơn
                        </FormLabel>
                        <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                        >
                        <FormControlLabel value="1" control={<Radio />} label="Sản phẩm lỗi do vận chuyển" />
                        <FormControlLabel value="2" control={<Radio />} label="Sản phẩm lỗi kho" />
                        <FormControlLabel value="3" control={<Radio />} label="Đổi trả" />
                        <FormControlLabel value="4" control={<Radio />} label="Lí do khác" />
                        </RadioGroup>
                    </Grid>
                    <Grid item sx={6}>
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={3}
                            placeholder="Nhập lí do chi tiết"
                            style={{ width: 190, height: 200 }}
                            {...register('content')}
                        />
                    </Grid>
                </Grid>
            </FormControl>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy bỏ</Button>
                <Button variant="contained" onClick={handleSubmit(onSubmit)} autoFocus>
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
    )
}