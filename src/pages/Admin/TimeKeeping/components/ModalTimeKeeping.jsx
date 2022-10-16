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
import { DatePicker, DateTimePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { vi } from 'date-fns/locale'
import { InputLabel } from '@mui/material'

import { schemaTimeKeeping } from '../validation'
// import { toast } from 'react-toastify'

function ModalTimeKeeping({ title, content, isOpen, handleClose, handleConfirm }) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schemaTimeKeeping)
    })
    const onSubmit = (data) => {
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
                                        fieldState: { error, invalid }
                                    }) => (
                                        <DatePicker
                                            label="Chọn ngày công"
                                            disablePast
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
                                name="radio-buttons-group">
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
                                            label="Ngày thường"
                                        />
                                        <FormControlLabel
                                            value="5"
                                            control={<Radio />}
                                            label="Ngày cuối tuần"
                                        />
                                        <FormControlLabel
                                            value="6"
                                            control={<Radio />}
                                            label="Ngày nghỉ lễ"
                                        />
                                    </Grid>
                                </Grid>
                            </RadioGroup>
                        </FormControl>
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

export default ModalTimeKeeping
