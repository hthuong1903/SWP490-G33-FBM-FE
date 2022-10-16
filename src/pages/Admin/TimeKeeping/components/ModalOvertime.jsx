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

function ModalOvertime({ title, content, isOpen, handleClose, handleConfirm }) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schemaOvertime)
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
                        1
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

export default ModalOvertime
