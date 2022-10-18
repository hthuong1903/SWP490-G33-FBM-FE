import { yupResolver } from '@hookform/resolvers/yup'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    TextField
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { schemaBonus } from '../validation'

function ModalBonus({ title, content, isOpen, handleClose, handleConfirm }) {
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
        toast.success('Overtime')
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
                <Grid container>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                id="outlined-select-currency"
                                select
                                size="small"
                                label="Tháng"
                                value={type}
                                onChange={(event) => {
                                    setType(event.target.value)
                                    // getTimeSheetPeriods(event.target.value + '' + year)
                                }}
                                sx={{ mr: 2 }}>
                                <MenuItem value={1}>Doanh thu</MenuItem>
                                <MenuItem value={2}>Chăm chỉ</MenuItem>
                                <MenuItem value={3}>Doanh số</MenuItem>
                                <MenuItem value={4}>Đi làm đúng giờ</MenuItem>
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
