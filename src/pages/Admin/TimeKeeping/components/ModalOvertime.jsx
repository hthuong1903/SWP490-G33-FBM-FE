import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useForm } from 'react-hook-form'
import { schemaOvertime } from '../validation'
import { toast } from 'react-toastify'
import axios from 'axios'
import Constants from '@/components/Constants'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { vi } from 'date-fns/locale'
// import { toast } from 'react-toastify'
import moment from 'moment'
import { useState } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Controller } from 'react-hook-form'

function disablePrevDates(startDate) {
    const startSeconds = Date.parse(startDate)
    return (date) => {
        return Date.parse(date) < startSeconds
    }
}

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1)
}

function ModalOvertime({ title, content, isOpen, handleClose, handleConfirm, employee }) {
    const [value, setValue] = useState(1)
    var today = new Date()
    const firstDayCurrentMonth = getFirstDayOfMonth(today.getFullYear(), today.getMonth())
    const {
        control,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schemaOvertime)
    })

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const updateOvertime = async (data) => {
        try {
            await axios.put(Constants.baseAPI + 'api/overtime', data).then((res) => {
                console.log(res)
                toast.success(res.message)
                handleClose && handleClose()
            })
            handleClose && handleClose()
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = (data) => {
        //+ employee.hour
        const dataSubmit = { ...employee, hour: data.hour, content: data.content, date: moment(data.date).format('yyyy-MM-DD')}
        updateOvertime(dataSubmit)
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
                <Grid container sx={{ mt: 1 }} spacing={4}>
                    <Grid item xs={4} sx={{ '& .MuiTextField-root': { mb: 2 } }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
                            <Box>
                                <Controller
                                    required
                                    name="date"
                                    control={control}
                                    defaultValue={new Date()}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error }
                                    }) => (
                                        <DatePicker
                                            label="Chọn ngày công"
                                            disableFuture
                                            shouldDisableDate={disablePrevDates(
                                                firstDayCurrentMonth
                                            )}
                                            ampm={false}
                                            value={value}
                                            // onChange={(value) => onChange(value)}
                                            // value={new Date(datePlayerDeadline)}
                                            onChange={(value) => {
                                                onChange(value)
                                                // setDatePlayerDeadline(value)
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    sx={{
                                                        marginTop: '0px !important',
                                                        marginBottom: '16px !important'
                                                    }}
                                                    {...params}
                                                    required
                                                    id="outlined-disabled"
                                                    error={!!error}
                                                    helperText={error ? error.message : null}
                                                    // id="startDate"
                                                    variant="outlined"
                                                    margin="dense"
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    )}
                                />
                            </Box>
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid container sx={{ mt: 1 }} spacing={2}>
                    <Grid item xs={6} sx={{ '& .MuiTextField-root': { mb: 2 } }}>
                        <Box>
                            <TextField
                                fullWidth
                                size="small"
                                id="outlined-basic"
                                label="Số giờ làm thêm"
                                variant="outlined"
                                {...register('hour')}
                                error={errors.hour ? true : false}
                                helperText={errors.hour?.message}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Nội dung"
                            multiline
                            rows={2}
                            defaultValue=""
                            {...register('content')}
                            error={errors.content ? true : false}
                            helperText={errors.content?.message}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>
                    Hủy bỏ
                </Button>
                <Button variant="contained" onClick={handleSubmit(onSubmit)} autoFocus>
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalOvertime
