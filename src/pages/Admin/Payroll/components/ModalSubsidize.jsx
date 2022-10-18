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
import { schemaSubsidize } from '../validation'

function ModalSubsidize({ title, content, isOpen, handleClose, handleConfirm }) {
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
                            <MenuItem value={1}>Ăn trưa</MenuItem>
                            <MenuItem value={2}>Thất nghiệp</MenuItem>
                            <MenuItem value={3}>Hoàn cảnh</MenuItem>
                            <MenuItem value={4}>Tai nạn</MenuItem>
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

export default ModalSubsidize
