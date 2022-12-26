import authApi from '@/api/authApi'
import useAuth from '@/hooks/useAuth'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import schema from './validation'

export default function Login() {
    const [rememberMe, setRememberMe] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { setAuth } = useAuth()
    let navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    const signIn = async (data) => {
        setIsLoading(true)

        try {
            //call api
            const response = await authApi.signIn(data)

            localStorage.setItem('fbm-user', JSON.stringify(response.data.data[0]))
            localStorage.setItem('TOKEN', JSON.stringify(response.data.data[0].token))

            const username = JSON.parse(localStorage.getItem('fbm-user')).username
            const userId = JSON.parse(localStorage.getItem('fbm-user')).userId
            const pwd = JSON.parse(localStorage.getItem('fbm-user')).pwd
            const roles = [JSON.parse(localStorage.getItem('fbm-user')).roles[0].authority]
            const accessToken = JSON.parse(localStorage.getItem('fbm-user')).token

            setAuth({ username, pwd, roles, accessToken, userId })
            setIsLoading(false)
            if (roles[0] === 'MANAGER') {
                navigate('/manager/admin')
            }
            if (roles[0] === 'SELLER') {
                navigate('/manager/admin/orders')
            }
            if (roles[0] === 'ADMIN') {
                navigate('/manager/administrator')
            }
            if (roles[0] === 'CUSTOMER') {
                toast.error('Sai thông tin đăng nhập!')
            }
            if (roles[0] === 'FIXER') {
                toast.error('Bạn không được phép truy cập vào hệ thống!')
            }
        } catch (error) {
            console.log(error)
            if (error.response.status === 401) {
                toast.error('Sai thông tin đăng nhập!')
                setIsLoading(false)
            }
        }
    }
    return (
        <Container>
            <Paper
                sx={{
                    bgcolor: 'background.paper',
                    width: '58vw',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
                <Grid container>
                    <Grid item xs={6}>
                        <Box sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ fontWeight: 'bold' }}>Nội Thất Hoàng Sơn</Box>
                            </Box>
                            <Box sx={{ textAlign: 'center', mt: 8, mb: 4 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    ĐĂNG NHẬP
                                </Typography>
                            </Box>
                            <Box sx={{ maxWidth: '450px', margin: '0 auto' }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <TextField
                                        label="Tên Đăng Nhập"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        sx={{ mb: 2 }}
                                        {...register('username')}
                                        error={errors.username ? true : false}
                                        helperText={errors.username?.message}
                                    />
                                    <TextField
                                        sx={{ mt: 1.5 }}
                                        label="Mật Khẩu"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        type="password"
                                        {...register('password')}
                                        error={errors.password ? true : false}
                                        helperText={errors.password?.message}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                    <FormControlLabel
                                        sx={{ mt: 2, fontWeight: 'light' }}
                                        label="Lưu đăng nhập"
                                        checked={rememberMe}
                                        control={
                                            <Checkbox
                                                onChange={(event) =>
                                                    setRememberMe(event.target.checked)
                                                }
                                            />
                                        }
                                    />
                                    {/* <Typography
                                        sx={{
                                            mt: 2,
                                            color: 'primary.main',
                                            fontWeight: 'light',
                                            textDecoration: 'none'
                                        }}
                                        component={Link}
                                        to="/manager/admin">
                                        Quên mật khẩu?
                                    </Typography> */}
                                </Box>
                                <Box>
                                    <LoadingButton
                                        fullWidth
                                        loading={isLoading}
                                        variant="contained"
                                        sx={{ mt: 2 }}
                                        onClick={handleSubmit(signIn)}>
                                        Đăng nhập
                                    </LoadingButton>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <img
                            src="https://i.pinimg.com/564x/80/f2/b0/80f2b023247cb3bf83f149b96fa8673c.jpg"
                            alt="login image"
                            width="100%"
                            height="100%"
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}
