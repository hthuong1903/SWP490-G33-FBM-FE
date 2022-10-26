import { yupResolver } from '@hookform/resolvers/yup'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    TextField,
    Typography
} from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { schemaSubsidize } from '../validation'

function ModalAllowance({
    title,
    content,
    isOpen,
    handleClose,
    handleConfirm,
    allowanceDetail,
    employee,
    periodCode
}) {
    const [type, setType] = useState(1)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schemaSubsidize)
    })
    const onSubmit = (data) => {
        console.log(data)
        const newObj = {
            allowanceId: type,
            content: data.subsidize,
            employeeId: employee.id,
            periodCode: periodCode
        }
        updateAllowanceDetail(newObj)
    }

    const updateAllowanceDetail = async (data) => {
        try {
            await axios
                .put('https://api.dinhtruong.live/api/allowance_detail', data)
                .then((res) => {
                    toast.success(res.data.message)
                })
            handleClose && handleClose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="md">
            <DialogTitle id="alert-dialog-title" sx={{ pt: 0 }}>
                {title}
            </DialogTitle>

            <DialogContent sx={{ pt: 2, mt: 2 }}>
                <Grid container sx={{ pt: 2 }}>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            size="small"
                            label="Chọn phụ cấp"
                            value={type}
                            onChange={(event) => {
                                setType(event.target.value)
                                // getTimeSheetPeriods(event.target.value + '' + year)
                            }}
                            sx={{ mr: 2 }}>
                            {allowanceDetail.map((item, index) => (
                                <MenuItem key={index} value={item.id}>
                                    {item.typeOfAllowance}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                fullWidth
                                size="small"
                                id="outlined-basic"
                                label="Chi tiết"
                                variant="outlined"
                                {...register('subsidize')}
                                error={errors.subsidize ? true : false}
                                helperText={errors.subsidize?.message}
                            />
                        </Box>
                        <Box>
                            <Typography variant="body1">
                                Số tiền:{' '}
                                {allowanceDetail
                                    .find((item) => item.id == type)
                                    .money.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    })}
                            </Typography>
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

export default ModalAllowance
