import authApi from '@/api/authApi'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Paper,
    TextField,
    Typography
} from '@mui/material'
import Grow from '@mui/material/Grow'
import { Container } from '@mui/system'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import schema from './validation'
import LoadingButton from '@mui/lab/LoadingButton'
import useAuth from '@/hooks/useAuth'

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
            const response = await authApi.signIn(data)
            console.log(response.data.data[0])
            localStorage.setItem('fbm-user', JSON.stringify(response.data.data[0]))
            const username = JSON.parse(localStorage.getItem('fbm-user')).username
            const pwd = JSON.parse(localStorage.getItem('fbm-user')).pwd
            const roles = [JSON.parse(localStorage.getItem('fbm-user')).roles[0].authority]
            const accessToken = JSON.parse(localStorage.getItem('fbm-user')).token
            console.log(roles)

            setAuth({ username, pwd, roles, accessToken })
            setIsLoading(false)
            if (roles[0] === 'MANAGER') {
                navigate('/admin')
            }
            if (roles[0] === 'SELLER') {
                navigate('/admin/orders')
            }
            if (roles[0] === 'ADMIN') {
                navigate('/administrator')
            }
            if (roles[0] === 'CUSTOMER') {
                toast.error('Sai thông tin đăng nhập!')
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
                    width: '70vw',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
                <Grid container>
                    <Grid item xs={6}>
                        <Box sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box>LOGO</Box>
                                <Box>
                                    Bạn không có tài khoản?{' '}
                                    <Typography component={Link} to="/registor">
                                        Đăng ký
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ textAlign: 'center', mt: 8, mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    ĐĂNG NHẬP
                                </Typography>
                            </Box>
                            <Box sx={{ maxWidth: '450px', margin: '0 auto' }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        sx={{ mb: 2 }}
                                        {...register('username')}
                                        error={errors.username ? true : false}
                                        helperText={errors.username?.message}
                                    />
                                    <TextField
                                        label="Password"
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
                                    <Typography component={Link} to="/admin">
                                        Quên mật khẩu?
                                    </Typography>
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
                            src="https://static01.nyt.com/images/2016/09/28/us/28xp-pepefrog/28xp-pepefrog-superJumbo.jpg"
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
