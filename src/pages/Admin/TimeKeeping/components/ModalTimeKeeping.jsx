import { yupResolver } from '@hookform/resolvers/yup'
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField
} from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Controller, useForm } from 'react-hook-form'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { vi } from 'date-fns/locale'
import { toast } from 'react-toastify'
import moment from 'moment'

import { schemaTimeKeeping } from '../validation'
import { useState } from 'react'
import TimeKeepingApi from '@/api/TimeKeepingApi'
// import { toast } from 'react-toastify'

function ModalTimeKeeping({ title, isOpen, handleClose, employee }) {
    const [value, setValue] = useState(1)

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schemaTimeKeeping)
    })

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const updateTimesheetDetailPerEmployee = async (data) => {
        try {
            const response = await TimeKeepingApi.updateTimesheetDetailPerEmployee(data)
            console.log(response)
            toast.success(response.message)
            handleClose && handleClose()
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = (data) => {
        console.log(
            employee.employee.id,
            moment(data.date).format('DD/MM/yyyy'),
            employee.periodCode,
            value
        )
        const obj = {
            employee_id: employee.employee.id,
            date: moment(data.date).format('DD/MM/yyyy'),
            period_code: employee.periodCode,
            case_day: value
        }
        updateTimesheetDetailPerEmployee(obj)
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
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{
                        '& .MuiTextField-root': { mb: 1 },
                        '& .MuiBox-root': { width: '100%', ml: 1, mr: 2 }
                    }}>
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
                                                // disablePast
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
                        <Grid item xs={8}>
                            <FormControl sx={{ width: '100%' }}>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="1"
                                    name="timesheet"
                                    value={value}
                                    onChange={handleChange}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <FormLabel
                                                id="demo-radio-buttons-group-label"
                                                sx={{ display: 'block' }}>
                                                Đi làm
                                            </FormLabel>
                                            <FormControlLabel
                                                value="1"
                                                control={<Radio />}
                                                label="Ngày thường"
                                            />
                                            <FormControlLabel
                                                value="2"
                                                control={<Radio />}
                                                label="Nửa ngày"
                                            />
                                            <FormControlLabel
                                                value="3"
                                                control={<Radio />}
                                                label="Ngày nghỉ lễ"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormLabel
                                                id="demo-radio-buttons-group-label"
                                                sx={{ display: 'block' }}>
                                                Nghỉ
                                            </FormLabel>
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <FormControlLabel
                                                    value="4"
                                                    control={<Radio />}
                                                    label="Có phép"
                                                />
                                                <FormControlLabel
                                                    value="5"
                                                    control={<Radio />}
                                                    label="Không phép"
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
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

export default ModalTimeKeeping
