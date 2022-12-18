import AccountApi from '@/api/AccountApi'
import provincesApi from '@/api/provincesApi'
import uploadApi from '@/api/uploadApi'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, MenuItem, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import schema from '../validation'


export default function ModelUpdateAccount({ title, isOpen, handleClose, handleConfirm, isEdit , selectedData}) {
    const [provinceList, setProvinceList] = useState([])
    const [districtList, setDistrictList] = useState([])
    const [wardList, setWardList] = useState([])
    const [selectedProvince, setSelectedProvince] = useState(selectedData?.province.id)
    const [selectedDistrict, setSelectedDistrict] = useState(selectedData?.district.id)
    const [selectedWard, setSelectedWard] = useState(selectedData?.ward.id)
    const [gender, setGender] = useState(selectedData?.gender.id)
    const [role, setRole] = useState(selectedData?.roles[0])
    const [disabled, setDisabled] = useState(true);
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
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })
    const onSubmit = async (data) => {
        const provinceName = await provincesApi.getProvinceById(Number(data.province))
        const districtName = await provincesApi.getDistrictById(Number(data.district))
        const wardName = await provincesApi.getWardsById(Number(data.ward))
        const dataSubmit = {
            ...data,
            id: selectedData?.id,
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
                toast.success('Cập Nhập Tài Khoản Thành Công !')
                handleConfirm && handleConfirm(true)
                handleClose && handleClose()
            })
            .catch((error) => {
                console.log(error)
            })
        .catch(async () => {
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
                    toast.success('Cập Nhập Tài Khoản Thành Công !')
                })
                .catch((error) => {
                    console.log(error)
                })
        })
        console.log(dataSubmit)
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
        setSelectedProvince(selectedData?.province.id)
        setSelectedDistrict(selectedData?.district.id)
        setSelectedWard(selectedData?.ward.id)
    }, [selectedData])

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
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

            <DialogContent>
                <Box sx={{ mt: 2, display: 'flex', gap: '20px'}}>
                    <TextField
                        fullWidth
                        size="small"
                        id="outlined-basic"
                        label="Họ"
                        variant="outlined"
                        defaultValue={selectedData?.firstName}
                        {...register('firstName')}
                        error={errors.firstName ? true : false}
                        helperText={errors.firstName?.message}
                    />
                    <TextField
                        fullWidth
                        size="small"
                        id="outlined-basic"
                        label="Tên Đệm"
                        variant="outlined"
                        defaultValue={selectedData?.middleName}
                        {...register('middleName')}
                        error={errors.middleName ? true : false}
                        helperText={errors.middleName?.message}
                    />
                    <TextField
                        fullWidth
                        size="small"
                        id="outlined-basic"
                        label="Tên"
                        variant="outlined"
                        defaultValue={selectedData?.lastName}
                        {...register('lastName')}
                        error={errors.lastName ? true : false}
                        helperText={errors.lastName?.message}
                    />
                </Box>
                <Box sx={{ mt: 2}}>
                    <TextField
                        fullWidth
                        size="small"
                        id="outlined-basic"
                        label="Tên Đăng Nhập"
                        variant="outlined"
                        defaultValue={selectedData?.username}
                        // disabled={disabled}
                        {...register('username')}
                        error={errors.username ? true : false}
                        helperText={errors.username?.message}
                        placeholder="Nhập Tên Đăng Nhập"
                    />
                </Box>
                <Box sx={{ mt: 2}}>
                    <TextField
                        fullWidth
                        size="small"
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        defaultValue={selectedData?.email}
                        disabled={disabled}
                        {...register('email')}
                        error={errors.email ? true : false}
                        helperText={errors.email?.message}
                    />
                </Box>

                <Box sx={{ mt: 2, display: 'flex', gap: '20px'}}>
                    <TextField
                        fullWidth
                        size="small"
                        id="outlined-basic"
                        label="Số điện thoại"
                        variant="outlined"
                        defaultValue={selectedData?.phone}
                        {...register('phone')}
                        error={errors.phone ? true : false}
                        helperText={errors.phone?.message}
                    />
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        select
                        size="small"
                        label="Giới Tính"
                        defaultValue={selectedData?.gender}
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
                <Box sx={{ mt: 2}}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        select
                        size="small"
                        label="Chuc vu"                       
                        defaultValue={selectedData?.roles[0]}
                        value={role}
                        onChange={(event) => {
                            console.log(event.target.value)
                            setRole(event.target.value)
                        
                        }}
                    >
                        {roleList.map((role) => {
                            console.log(selectedData?.roles[0])
                            return (
                                <MenuItem key={role.id} value={role.name}>
                                    {role.name}
                                </MenuItem>
                            )
                        })}
                    </TextField>
                </Box>

                <Box sx={{ mt: 2}}>
                    <Controller
                        name="province"
                        variant="outlined"
                        defaultValue={selectedData?.province.id}
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
                                    setSelectedProvince(event.target.value)
                                    onChange(Number(event.target.value))
                                }}
                                sx={{ mr: 2 }}
                                error={!!error}
                                helperText={error ? error.message : null}>
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

                <Box sx={{ mt: 2}}>
                    <Controller
                        name="district"
                        variant="outlined"
                        defaultValue={selectedData?.district.id}
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

                <Box sx={{ mt: 2}}>
                    <Controller
                        name="ward"
                        variant="outlined"
                        defaultValue={selectedData?.ward.id}
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

                <Box sx={{ mt: 2}}>
                    <TextField
                        fullWidth
                        size="small"
                        id="outlined-basic"
                        label="Địa chỉ cụ thể"
                        placeholder="Tòa nhà, tên đường ..."
                        variant="outlined"
                        defaultValue={selectedData?.address}
                        {...register('address')}
                        error={errors.address ? true : false}
                        helperText={errors.address?.message}
                    />
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
