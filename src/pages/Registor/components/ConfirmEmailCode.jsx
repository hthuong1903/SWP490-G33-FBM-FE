import authApi from '@/api/authApi'
import { Button, Paper, Slide, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

function ConfirmEmailCode() {
    const [confirmCodeValue, setConfirmCodeValue] = useState('')
    const [searchParams] = useSearchParams()
    let navigate = useNavigate()
    const email = searchParams.get('email')

    const verifyEmail = async (verifyCode, email) => {
        try {
            const response = await authApi.verifyEmail(verifyCode, email)
            console.log('verifyEmail', response)
            if (response.data.length) {
                toast.success(response.message)
                navigate('/')
            } else {
                toast.error(response.message)
            }
        } catch (error) {
            console.log('fail at verifyEmail', error)
        }
    }

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Slide
                direction="left"
                in={true}
                mountOnEnter
                unmountOnExit
                easing={{
                    enter: 'ease-in-out',
                    exit: 'ease-out'
                }}>
                <div>
                    <Paper
                        sx={{
                            p: 3,
                            width: '500px'
                        }}>
                        <h2>Nhập mã xác minh</h2>

                        <Typography variant="body2" mt={1}>
                            Một mã xác minh đã được gửi vào email của bạn, vui lòng kiểm tra email
                            để lấy mã
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            sx={{ mt: 2 }}
                            value={confirmCodeValue}
                            onChange={(event) => setConfirmCodeValue(event.target.value)}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button
                                // component={Link}
                                // to="/registor"
                                disabled={confirmCodeValue.length < 5}
                                variant="contained"
                                onClick={() => {
                                    verifyEmail(confirmCodeValue, email)
                                }}>
                                Xác nhận
                            </Button>
                        </Box>
                    </Paper>
                </div>
            </Slide>
        </Box>
    )
}

export default ConfirmEmailCode
