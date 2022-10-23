import Constants from '@/components/Constants'
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
import { schemaBonus } from '../validation'

function ModalBonus({
    title,
    content,
    isOpen,
    handleClose,
    handleConfirm,
    bonusDetail,
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
        resolver: yupResolver(schemaBonus)
    })
    const onSubmit = (data) => {
        console.log(data)
        const newObj = {
            bonusId: type,
            content: data.bonus,
            employeeId: employee.id,
            periodCode: periodCode
        }
        updateAllowanceDetail(newObj)
    }

    const updateAllowanceDetail = async (data) => {
        try {
            await axios.put(Constants.baseAPI + 'api/bonus_detail', data).then((res) => {
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
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

            <DialogContent>
                <Grid container sx={{ pt: 2 }}>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                id="outlined-select-currency"
                                select
                                size="small"
                                label="Chọn loại thưởng"
                                value={type}
                                onChange={(event) => {
                                    setType(event.target.value)
                                    // getTimeSheetPeriods(event.target.value + '' + year)
                                }}
                                sx={{ mr: 2 }}>
                                {bonusDetail.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                        {item.typeOfBonus}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                fullWidth
                                size="small"
                                id="outlined-basic"
                                label="Chi tiết"
                                variant="outlined"
                                {...register('bonus')}
                                error={errors.bonus ? true : false}
                                helperText={errors.bonus?.message}
                            />
                        </Box>
                        <Box>
                            <Typography variant="body1">
                                Số tiền:{' '}
                                {bonusDetail
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

export default ModalBonus
