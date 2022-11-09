
import {FormControlLabel, FormControl, FormGroup} from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import {Box, TextField, MenuItem} from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import AccountApi from '@/api/AccountApi'
import provincesApi from '@/api/provincesApi'
import Button from '@mui/material/Button'
import schema from '@/pages/Administrator/Staff/validation'

function CreateAccount() {
    const [role, setRole] = useState(null)
    const [provinceList, setProvinceList] = useState([])
    const [districtList, setDistrictList] = useState([])
    const [wardList, setWardList] = useState([])
    const [selectedProvince, setSelectedProvince] = useState(1)
    const [selectedDistrict, setSelectedDistrict] = useState(1)
    const [selectedWard, setSelectedWard] = useState(1)
    const [gender, setGender] = useState(null)

    const roleList = [
        {
            id: 1,
            name: "CUSTOMER"
        },
        {
            id: 2,
            name: "FIXER"
        },
        {
            id: 3,
            name: "SELLER"
        },
        {
            id: 4,
            name: "MANAGER"
        }
    ]

    const genderList = [
        {
            id: 0,
            name: "Nữ",
            value: true
        },
        {
            id: 1,
            name: "Nam",
            value: false
        }
    ]
    const {
        register,
        handleSubmit,
        control,
        resetField,
        reset,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    const onSubmit = async(data) => {
        console.log(data)
        const provinceName = await provincesApi.getProvinceById(Number(data.province))
        const districtName = await provincesApi.getDistrictById(Number(data.district))
        const wardName = await provincesApi.getWardsById(Number(data.ward))
        const dataSubmit = {
            ...data,
            province: { id: Number(data.province), name: provinceName },
            district: { id: Number(data.district), name: districtName },
            ward: { id: Number(data.ward), name: wardName },
            roles: [role],
            gender: gender
        }
        AccountApi
            .createAccount(dataSubmit)
            .then((res) => {
                console.log(res) 
                toast.success('Thêm Tài Khoản Thành Công')
                handleClearData()
            })
            .catch((error) => {
                console.log(error)
            })
            
    }

    const handleClearData = () => {
        resetField('firstName')
        resetField('middleName')
        resetField('lastName')
        resetField('username')
        resetField('email')
        resetField('phone')
        setRole(null)
        setGender(null)
        resetField('address')
        reset()
    }
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
        <>
            <FormControl sx={{border: 1, borderColor: 'primary.main',  borderRadius: 2,
                gap: 1, color: 'primary.main',  boxShadow: 1, ml: 35, width: "60%", bgcolor: '#fff'
            }}
            >   
                <FormGroup sx={{p: 2}}>
                    <h2>TẠO TÀI KHOẢN</h2>
                    <Box sx={{ mt: 2, display: 'flex', gap: '20px'}}>
                        <TextField
                            fullWidth
                            size="small"
                            id="outlined-basic"
                            label="Họ"
                            variant="outlined"
                            {...register('firstName')}
                            error={errors.name ? true:false}
                            helperText={errors.firstName?.message}
                            placeholder="Nhập Họ"
                        />
                        <TextField
                            fullWidth
                            size="small"
                            id="outlined-basic"
                            label="Tên Đệm"
                            variant="outlined"
                            {...register('middleName')}
                            error={errors.middleName ? true : false}
                            helperText={errors.middleName?.message}
                            placeholder="Nhập Tên Đệm"
                        />
                        <TextField
                            fullWidth
                            size="small"
                            id="outlined-basic"
                            label="Tên"
                            variant="outlined"
                            {...register('lastName')}
                            error={errors.lastName ? true : false}
                            helperText={errors.lastName?.message}
                            placeholder="Nhập Tên"
                        />
                    </Box>
                    <Box sx={{ mt: 2}}>
                        <TextField
                            fullWidth
                            size="small"
                            id="outlined-basic"
                            label="Tên Đăng Nhập"
                            variant="outlined"
                            {...register('username')}
                            error={errors.username ? true : false}
                            helperText={errors.username?.message}
                            placeholder="Tên Đăng Nhập"
                        />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            size="small"
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            {...register('email')}
                            error={errors.email ? true : false}
                            helperText={errors.email?.message}
                            placeholder="Nhập Email"
                        />
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', gap: '20px' }}>
                        <TextField
                            fullWidth
                            size="small"
                            id="outlined-basic"
                            label="Số Điện Thoại"
                            variant="outlined"
                            {...register('phone')}
                            error={errors.phone ? true : false}
                            helperText={errors.phone?.message}
                            placeholder="Nhập Số Điện Thoại"
                        />
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            select
                            size="small"
                            label="Giới Tính"
                            value={gender}
                            onChange={(event) => {
                                console.log(event.target.value)
                                setGender(event.target.value)
                            }}
                        >
                            {genderList.map((gender) => {
                            return (
                                <MenuItem key={gender.id} value={gender.value}>
                                    {gender.name}
                                </MenuItem>
                            )
                        })}
                        </TextField>                
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            select
                            size="small"
                            label="Chức vụ"
                            value={role}
                            onChange={(event) => {
                                console.log(event.target.value)
                                setRole(event.target.value)
                            
                            }}
                        >
                            {roleList.map((role) => {
                                return (
                                    <MenuItem key={role.id} value={role.name}>
                                        {role.name}
                                    </MenuItem>
                                )
                                    })}
                        </TextField>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Controller
                            name="province"
                            variant="outlined"
                            defaultValue=""
                            control={control}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    fullWidth
                                    id="outlined-select-currency"
                                    select
                                    size="small"
                                    label="Tỉnh/Thành phố"
                                    value={value}
                                    onChange={(event) => {
                                        console.log(event.target.value)
                                        setSelectedProvince(event.target.value)
                                        onChange(Number(event.target.value))
                                    }}
                                    sx={{ mr: 2 }}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                >
                                    {provinceList.map((province) => {
                                        return (
                                            <MenuItem key={province.code} value={province.code}>
                                                {province.name}
                                            </MenuItem>
                                        )
                                    })}
                                </TextField>
                            )}
                        />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Controller
                            name="district"
                            variant="outlined"
                            defaultValue=""
                            control={control}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
                                    sx={{ mr: 2 }}
                                    error={!!error}
                                    helperText={error ? error.message : null}>
                                    {districtList.map((district) => {
                                        return (
                                            <MenuItem key={district.code} value={district.code}>
                                                {district.name}
                                            </MenuItem>
                                        )
                                    })}
                                </TextField>
                            )}
                        />
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Controller
                        name="ward"
                        variant="outlined"
                        defaultValue=""
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
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
                                sx={{ mr: 2 }}
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
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            size="small"
                            id="outlined-basic"
                            label="Địa chỉ cụ thể"
                            placeholder="Tòa nhà, tên đường ..."
                            variant="outlined"
                            {...register('address')}
                            error={errors.address ? true : false}
                            helperText={errors.address?.message}
                        />
                </Box>
            </FormGroup>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Button 
                    onClick={handleClearData}>
                    Hủy Bỏ
                </Button>
                <Button sx={{ml: 15}} onClick= {handleSubmit(onSubmit)}
                >
                    Đồng Ý
                </Button>
            </Box>

            </FormControl>
        </>
        
    )
}
export default CreateAccount

