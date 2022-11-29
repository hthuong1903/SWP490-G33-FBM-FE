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
import DataCustomerApi from '@/api/DataCustomerApi'
import provincesApi from '@/api/provincesApi'
import schema from '../Validation'

export default function ModelAddCustomer({title, isOpen, handleClose, handleConfirm, isEdit}) {
    
    const [provinceList, setProvinceList] = useState([])
    const [districtList, setDistrictList] = useState([])
    const [wardList, setWardList] = useState([])
    const [selectedProvince, setSelectedProvince] = useState(1)
    const [selectedDistrict, setSelectedDistrict] = useState(1)
    const [selectedWard, setSelectedWard] = useState(1)
    const [gender, setGender] = useState(null)

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

    const onSubmit = async (data) => {
        console.log(data)
        const provinceName = await provincesApi.getProvinceById(Number(data.province))
        const districtName = await provincesApi.getDistrictById(Number(data.district))
        const wardName = await provincesApi.getWardsById(Number(data.ward))

        const dataSubmit = {
            ...data,
            province: { id: Number(data.province), name: provinceName },
            district: { id: Number(data.district), name: districtName },
            ward: { id: Number(data.ward), name: wardName },
            gender: gender,
            roles: ['CUSTOMER']
        }
        DataCustomerApi
            .createDataCustomer(dataSubmit)
            .then((res) => {
                console.log(res)
                toast.success('Thêm Tai Khoan Thanh Cong')
                handleConfirm && handleConfirm(true)
                handleClose && handleClose()
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const {
        register,
        handleSubmit,
        control,
        resetField,
        formState: {errors}
    } = useForm({
        model: 'onChange',
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
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="sm"
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
                    {...register('firstName')}
                    error={errors.firstName ? true : false}
                    helperText={errors.firstName?.message}
                    placeholder='Nhập Họ'
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
                    placeholder='Nhập Tên Đệm'
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
                    placeholder='Nhập Tên'
                />
            </Box>
            <Box sx={{mt:2}}>
                <TextField 
                    fullWidth
                    size="small"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    {...register('email')}
                    error={errors.email ? true : false}
                    helperText={errors.email?.message}
                    placeholder="Email"
                />
            </Box>
            <Box sx={{mt:2, display: 'flex', gap: '20px'}}>
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
                        error={errors.addressDetail ? true : false}
                        helperText={errors.addressDetail?.message}
                    />
                </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Hủy Bỏ</Button>
            <Button onClick={handleSubmit(onSubmit)} autoFocus>Đồng Ý</Button>
        </DialogActions>
        </Dialog>
    )
}