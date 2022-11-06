import authApi from '@/api/authApi'
import provincesApi from '@/api/provincesApi'
import { yupResolver } from '@hookform/resolvers/yup'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    MenuItem,
    Paper,
    Slide,
    TextField
} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { vi } from 'date-fns/locale'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import schema from './validation'
import LoadingButton from '@mui/lab/LoadingButton'

export default function Registor() {
    const [genderValue, setGenderValue] = useState(true)
    const [selectedProvince, setSelectedProvince] = useState(1)
    const [selectedDistrict, setSelectedDistrict] = useState(1)
    // eslint-disable-next-line no-unused-vars
    const [selectedWard, setSelectedWard] = useState(1)
    const [provinceList, setProvinceList] = useState([])
    const [districtList, setDistrictList] = useState([])
    const [wardList, setWardList] = useState([])
    const [isShowPassword, setIsShowPassword] = useState({ password: false, rePassword: false })
    const [isNextStep, setIsNextStep] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const containerRef = useRef(null)

    let navigate = useNavigate()

    const {
        register,
        handleSubmit,
        resetField,
        control,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })
    const getAllProvince = async () => {
        try {
            const response = await provincesApi.getAllProvince()
            setProvinceList(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getAllDistrictByProvinceId = async (provinceId) => {
        try {
            const response = await provincesApi.getAllDistrictByProvinceId(provinceId)
            setDistrictList(response.data.districts)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllWardsByDistrictId = async (districtId) => {
        try {
            const response = await provincesApi.getAllWardsByDistrictId(districtId)
            setWardList(response.data.wards)
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async (data) => {
        setIsLoading(true)
        const provinceName = await provincesApi.getProvinceById(Number(data.province))
        const districtName = await provincesApi.getDistrictById(Number(data.district))
        const wardName = await provincesApi.getWardsById(Number(data.ward))
        const submitData = {
            ...data,
            province: { id: Number(data.province), name: provinceName },
            district: { id: Number(data.district), name: districtName },
            ward: { id: Number(data.ward), name: wardName },
            gender: genderValue,
            dateOfBirth: moment(data.dateOfBirth).format('YYYY-MM-DD'),
            roles: ['CUSTOMER']
        }
        console.log(submitData)

        authApi
            .signUpCustomer(submitData)
            .then((res) => {
                console.log(res)
                if (res.data.data.length) {
                    toast.success(res.data.message)
                    setIsNextStep(false)
                    setTimeout(
                        () =>
                            navigate({
                                pathname: './confirm',
                                search: `?${new URLSearchParams({ email: data.email })}`
                            }),
                        300
                    )
                } else {
                    setIsLoading(false)
                    toast.error(res.data.message)
                }
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getAllProvince()
    }, [])
    useEffect(() => {
        getAllDistrictByProvinceId(selectedProvince)
        resetField('district')
        resetField('ward')
    }, [selectedProvince])
    useEffect(() => {
        getAllWardsByDistrictId(selectedDistrict)
        resetField('ward')
    }, [selectedDistrict])
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            ref={containerRef}>
            <Slide
                direction="right"
                in={isNextStep}
                container={containerRef.current}
                mountOnEnter
                unmountOnExit
                easing={{
                    enter: 'ease-in-out',
                    exit: 'ease-out'
                }}>
                <Paper
                    sx={{
                        p: 3
                    }}>
                    <h2>Đăng ký tài khoản</h2>
                    <Box>
                        <Box sx={{ display: 'flex', gap: '18px', mt: 3 }}>
                            <TextField
                                sx={{ width: '12rem' }}
                                size="small"
                                id="outlined-basic"
                                label="Họ"
                                variant="outlined"
                                {...register('firstName')}
                                error={errors.firstName ? true : false}
                                helperText={errors.firstName?.message}
                            />
                            <TextField
                                sx={{ width: '12rem' }}
                                size="small"
                                id="outlined-basic"
                                label="Tên đệm"
                                variant="outlined"
                                {...register('middleName')}
                                error={errors.middleName ? true : false}
                                helperText={errors.middleName?.message}
                            />
                            <TextField
                                sx={{ width: '12rem' }}
                                size="small"
                                id="outlined-basic"
                                label="Tên"
                                variant="outlined"
                                {...register('lastName')}
                                error={errors.lastName ? true : false}
                                helperText={errors.lastName?.message}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', gap: '18px', mt: 3 }}>
                            <Box sx={{ mt: -2, width: '100%' }}>
                                <FormControl>
                                    <FormLabel id="demo-controlled-radio-buttons-group">
                                        Giới tính
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="controlled-radio-buttons-group"
                                        value={genderValue}
                                        onChange={(event) => setGenderValue(event.target.value)}
                                        sx={{ flexWrap: 'nowrap' }}>
                                        <FormControlLabel
                                            value={true}
                                            control={<Radio />}
                                            label="Nam"
                                        />
                                        <FormControlLabel
                                            value={false}
                                            control={<Radio />}
                                            label="Nữ"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Box>

                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
                                <Controller
                                    required
                                    name="dateOfBirth"
                                    control={control}
                                    defaultValue=""
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error }
                                    }) => (
                                        <DatePicker
                                            label="Ngày sinh"
                                            disableFuture
                                            ampm={false}
                                            value={value}
                                            onChange={(value) => {
                                                onChange(value)
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    required
                                                    id="outlined-disabled"
                                                    error={!!error}
                                                    helperText={error ? error.message : null}
                                                    // id="startDate"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '20px', mt: 2 }}>
                            <TextField
                                fullWidth
                                size="small"
                                id="outlined-basic"
                                label="Tài khoản"
                                variant="outlined"
                                {...register('username')}
                                error={errors.username ? true : false}
                                helperText={errors.username?.message}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', gap: '20px', mt: 2 }}>
                            <TextField
                                fullWidth
                                size="small"
                                id="outlined-basic"
                                label="Mật khẩu"
                                type={isShowPassword.password ? 'text' : 'password'}
                                variant="outlined"
                                {...register('password')}
                                error={errors.password ? true : false}
                                helperText={errors.password?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() =>
                                                    setIsShowPassword({
                                                        ...isShowPassword,
                                                        password: !isShowPassword.password
                                                    })
                                                }
                                                onMouseDown={(event) => event.preventDefault()}
                                                edge="end">
                                                {isShowPassword.password ? (
                                                    <VisibilityOffIcon />
                                                ) : (
                                                    <VisibilityIcon />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField
                                fullWidth
                                size="small"
                                id="outlined-basic"
                                label="Nhập lại mật khẩu"
                                type={isShowPassword.rePassword ? 'text' : 'password'}
                                variant="outlined"
                                {...register('rePassword')}
                                error={errors.rePassword ? true : false}
                                helperText={errors.rePassword?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() =>
                                                    setIsShowPassword({
                                                        ...isShowPassword,
                                                        rePassword: !isShowPassword.rePassword
                                                    })
                                                }
                                                onMouseDown={(event) => event.preventDefault()}
                                                edge="end">
                                                {isShowPassword.rePassword ? (
                                                    <VisibilityOffIcon />
                                                ) : (
                                                    <VisibilityIcon />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', gap: '20px', mt: 2 }}>
                            <TextField
                                fullWidth
                                size="small"
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                {...register('email')}
                                error={errors.email ? true : false}
                                helperText={errors.email?.message}
                            />
                            <TextField
                                fullWidth
                                size="small"
                                id="outlined-basic"
                                label="Số điện thoại"
                                variant="outlined"
                                {...register('phone')}
                                error={errors.phone ? true : false}
                                helperText={errors.phone?.message}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', gap: '20px', mt: 2 }}>
                            <Box>
                                <Controller
                                    name="province"
                                    variant="outlined"
                                    defaultValue=""
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error }
                                    }) => (
                                        <TextField
                                            fullWidth
                                            id="outlined-select-currency"
                                            select
                                            size="small"
                                            label="Tỉnh/Thành phố"
                                            value={value}
                                            onChange={(event) => {
                                                setSelectedProvince(event.target.value)
                                                onChange(Number(event.target.value))
                                            }}
                                            sx={{ width: '12rem' }}
                                            error={!!error}
                                            helperText={error ? error.message : null}>
                                            {provinceList.map((province) => {
                                                return (
                                                    <MenuItem
                                                        key={province.code}
                                                        value={province.code}>
                                                        {province.name}
                                                    </MenuItem>
                                                )
                                            })}
                                        </TextField>
                                    )}
                                />
                            </Box>

                            <Box>
                                <Controller
                                    name="district"
                                    variant="outlined"
                                    defaultValue=""
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error }
                                    }) => (
                                        <TextField
                                            fullWidth
                                            id="outlined-select-currency"
                                            select
                                            size="small"
                                            label="Quận/Huyện"
                                            value={value}
                                            onChange={(event) => {
                                                setSelectedDistrict(event.target.value)
                                                onChange(Number(event.target.value))
                                            }}
                                            sx={{ width: '12rem' }}
                                            error={!!error}
                                            helperText={error ? error.message : null}>
                                            {districtList.map((district) => {
                                                return (
                                                    <MenuItem
                                                        key={district.code}
                                                        value={district.code}>
                                                        {district.name}
                                                    </MenuItem>
                                                )
                                            })}
                                        </TextField>
                                    )}
                                />
                            </Box>

                            <Box>
                                <Controller
                                    name="ward"
                                    variant="outlined"
                                    defaultValue=""
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error }
                                    }) => (
                                        <TextField
                                            fullWidth
                                            id="outlined-select-currency"
                                            select
                                            size="small"
                                            label="Phường/Xã"
                                            value={value}
                                            onChange={(event) => {
                                                setSelectedWard(event.target.value)
                                                onChange(Number(event.target.value))
                                            }}
                                            sx={{ width: '12rem' }}
                                            error={!!error}
                                            helperText={error ? error.message : null}>
                                            {wardList.map((ward) => {
                                                return (
                                                    <MenuItem key={ward.code} value={ward.code}>
                                                        {ward.name}
                                                    </MenuItem>
                                                )
                                            })}
                                        </TextField>
                                    )}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '20px', mt: 2 }}>
                            <TextField
                                fullWidth
                                size="small"
                                id="outlined-basic"
                                label="Địa chỉ chi tiết"
                                variant="outlined"
                                {...register('address')}
                                error={errors.address ? true : false}
                                helperText={errors.address?.message}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <LoadingButton
                            loading={isLoading}
                            variant="contained"
                            onClick={handleSubmit(onSubmit)}>
                            Đăng ký
                        </LoadingButton>
                    </Box>
                </Paper>
            </Slide>
        </Box>
    )
}
