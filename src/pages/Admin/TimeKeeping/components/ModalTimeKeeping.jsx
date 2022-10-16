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

import { schemaTimeKeeping } from '../validation'
import { useState } from 'react'
import TimeKeepingApi from '@/api/TimeKeepingApi'
// import { toast } from 'react-toastify'

function ModalTimeKeeping({
    title,
    content,
    isOpen,
    handleClose,
    handleConfirm,
    employee,
    timeSheetDetail
}) {
    const [value, setValue] = useState(0)

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
        const objEmp = timeSheetDetail.find((item) => item.id == employee.id)
        const date = data.date.getDate()
        var newObj
        if (value < 4) {
            switch (date) {
                case 1:
                    newObj = {
                        ...objEmp,
                        day1: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 2:
                    newObj = {
                        ...objEmp,
                        day2: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 3:
                    newObj = {
                        ...objEmp,
                        day3: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 4:
                    newObj = {
                        ...objEmp,
                        day4: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 5:
                    newObj = {
                        ...objEmp,
                        day5: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 6:
                    newObj = {
                        ...objEmp,
                        day6: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 7:
                    newObj = {
                        ...objEmp,
                        day7: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 8:
                    newObj = {
                        ...objEmp,
                        day8: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 9:
                    newObj = {
                        ...objEmp,
                        day9: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 10:
                    newObj = {
                        ...objEmp,
                        day10: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 11:
                    newObj = {
                        ...objEmp,
                        day11: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 12:
                    newObj = {
                        ...objEmp,
                        day12: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 13:
                    newObj = {
                        ...objEmp,
                        day13: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 14:
                    newObj = {
                        ...objEmp,
                        day14: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 15:
                    newObj = {
                        ...objEmp,
                        day15: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 16:
                    newObj = {
                        ...objEmp,
                        day16: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 17:
                    newObj = {
                        ...objEmp,
                        day17: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 18:
                    newObj = {
                        ...objEmp,
                        day18: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 19:
                    newObj = {
                        ...objEmp,
                        day19: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 20:
                    newObj = {
                        ...objEmp,
                        day20: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 21:
                    newObj = {
                        ...objEmp,
                        day21: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 22:
                    newObj = {
                        ...objEmp,
                        day22: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 23:
                    newObj = {
                        ...objEmp,
                        day23: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 24:
                    newObj = {
                        ...objEmp,
                        day24: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 25:
                    newObj = {
                        ...objEmp,
                        day25: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 26:
                    newObj = {
                        ...objEmp,
                        day26: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 27:
                    newObj = {
                        ...objEmp,
                        day27: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 28:
                    newObj = {
                        ...objEmp,
                        day28: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 29:
                    newObj = {
                        ...objEmp,
                        day29: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 30:
                    newObj = {
                        ...objEmp,
                        day30: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                case 31:
                    newObj = {
                        ...objEmp,
                        day31: 1,
                        totalDayWorking: objEmp.totalDayWorking + 1,
                        weekendWorking:
                            value == 2 ? objEmp.weekendWorking + 1 : objEmp.weekendWorking,
                        holidaysWorking:
                            value == 3 ? objEmp.holidaysWorking + 1 : objEmp.holidaysWorking
                    }
                    break
                default:
                    newObj = objEmp
                    break
            }
        } else {
            value == 4
                ? (newObj = {
                      ...objEmp,
                      allowedDay: objEmp.allowedDay + 1
                  })
                : (newObj = objEmp)
        }
        console.log(newObj)
        updateTimesheetDetailPerEmployee(newObj)
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
                                                label="Ngày cuối tuần"
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
                                        </Grid>
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
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

export default ModalTimeKeeping
