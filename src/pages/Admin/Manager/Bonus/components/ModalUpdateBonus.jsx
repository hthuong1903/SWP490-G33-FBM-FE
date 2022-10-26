import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, InputAdornment, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import schema from '../validation'
import Constants from '@/components/Constants'
import NumberFormat from 'react-number-format'

function ModalUpdateBonus({ title, selectedData, isOpen, handleClose, isEdit }) {
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
        const newObj = {
            ...selectedData,
            content: data.content,
            money: data.money,
            typeOfBonus: data.typeOfBonus
        }
        axios
            .put(Constants.baseAPI + 'api/bonus', newObj)
            .then((res) => {
                toast.success(res.data.message)
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
            maxWidth="lg">
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

            <DialogContent>
                <Grid container sx={{ mt: 1 }} spacing={2}>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                fullWidth
                                size="small"
                                id="outlined-basic"
                                label="Tên"
                                variant="outlined"
                                defaultValue={selectedData.typeOfBonus}
                                {...register('typeOfBonus')}
                                error={errors.typeOfBonus ? true : false}
                                helperText={errors.typeOfBonus?.message}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6} sx={{ '& .MuiTextField-root': { mb: 3 } }}>
                        <Box>
                            <Controller
                                name="money"
                                variant="outlined"
                                defaultValue={selectedData.money}
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <NumberFormat
                                        name="money"
                                        size="small"
                                        customInput={TextField}
                                        label="Số tiền"
                                        thousandSeparator={true}
                                        variant="outlined"
                                        defaultValue={selectedData.money}
                                        value={value}
                                        onValueChange={(v) => {
                                            onChange(Number(v.value))
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">VND</InputAdornment>
                                            )
                                        }}
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        fullWidth
                                    />
                                )}
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
                                size="small"
                                id="outlined-basic"
                                label="Nội dung"
                                variant="outlined"
                                defaultValue={selectedData.content}
                                {...register('content')}
                                error={errors.content ? true : false}
                                helperText={errors.content?.message}
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

export default ModalUpdateBonus
