import authApi from '@/api/authApi'
import orderApi from '@/api/orderApi'
import productApi from '@/api/productApi'
import StyledTableCell from '@/components/Common/Table/StyledTableCell'
import StyledTableRow from '@/components/Common/Table/StyledTableRow'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveIcon from '@mui/icons-material/Remove'
import {
    Autocomplete,
    Button,
    Collapse,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Box } from '@mui/system'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './style.css'
import moment from 'moment/moment'
import useAuth from '@/hooks/useAuth'

function CreateReceipt() {
    const [checkedProduct, setCheckedProduct] = useState(false)
    const [checkedCustomer, setCheckedCustomer] = useState(false)
    const [userList, setUserList] = useState([])
    const [productList, setProductList] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState([])
    const [rows, setRows] = useState([])
    const [value, setValue] = useState(1)
    const { auth } = useAuth()
    const [errorChangedPrice, setErrorChangedPrice] = useState('')
    let navigate = useNavigate()

    const handleSelect = (event) => {
        setValue(event.target.value)
    }

    const addressDetails = (selectedEmployee) =>
        selectedEmployee.address
            ? `${selectedEmployee.address}, ${selectedEmployee.district.name}, ${selectedEmployee.ward.name}, ${selectedEmployee.province.name}`
            : 'Khách hàng chưa có địa chỉ'

    const handleChange = (event, value) => setSelectedEmployee(value)

    const min = 1
    const max = 10

    useEffect(() => {
        const getAllProduct = async () => {
            try {
                const response = await productApi.getAllProduct(-1, -1, -1)
                setProductList(response.data)
            } catch (error) {
                console.log('fail at getAllUser', error)
            }
        }

        const getAllUser = async () => {
            try {
                const response = await authApi.getAllCustomer()
                console.log(response.data)
                setUserList(response.data)
            } catch (error) {
                console.log('fail at getAllUser', error)
            }
        }

        getAllUser()
        getAllProduct()
        // setRows([...location.state[0].orderProductDtos])
    }, [location])

    const formatProductList = productList.map((i) => {
        return {
            productId: i.id,
            product: {
                photoMain: i.productPhoto.photoMainName,
                name: i.name,
                productCode: i.productCode,
                priceOut: i.priceOut
            },
            quantity: i.quantity,
            changedPrice: i.discount
        }
    })

    useEffect(() => {
        console.log('rows', rows)
    }, [rows])

    const handleSelectedProduct = (event, value) => {
        console.log(value)
        const quantity = { ...value, quantity: 1 }
        setSelectedProduct(quantity)
        if (value) {
            setRows([quantity, ...rows])
            setProductList((prev) => prev.filter((item) => item.id !== value.productId))
        }
    }

    const totalDiscount = useMemo(
        () => rows.reduce((result, value) => result + value.changedPrice, 0),
        [rows]
    )

    const totalPriceOut = useMemo(
        () => rows.reduce((result, value) => result + value.product.priceOut, 0),
        [rows]
    )
    const totalQuantity = useMemo(
        () => rows.reduce((result, value) => result + value.quantity, 0),
        [rows]
    )

    const totalAmount = rows.reduce(
        (result, value) => result + value.quantity * value.product.priceOut,
        0
    )
    const totalAmountAfter = rows.reduce(
        (result, value) => result + value.quantity * value.product.priceOut - value.changedPrice,
        0
    )
    // const resultDiscount = () => rows.reduce((result, value) => result + value.discount, 0)
    const handleCreate = async () => {
        const dataSubmit = {
            customerId: selectedEmployee.id,
            dateCreated: moment(new Date()).format('YYYY-MM-DD'),
            dateRequired: moment(new Date()).format('YYYY-MM-DD'),
            employeeSaleId: auth.userId,
            id: null,
            numberOfProducts: rows.length,
            orderProductDtos: rows,
            status: 3,
            totalOrderPrice: totalPriceOut * totalQuantity,
            totalOrderPriceAfter: totalPriceOut * totalQuantity - totalDiscount,
            typeOfPay: value
        }
        try {
            const response = await orderApi.createOrderT(dataSubmit)
            if (response.data.data) {
                orderApi
                    .createQuoteT(selectedEmployee.id, dataSubmit)
                    .then((res) => console.log(res))
                    .catch((error) => console.log(error))
                toast.success(response.data.message)
                navigate(-1)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
        console.log(dataSubmit)
    }
    return (
        <>
            <h2>Tạo hóa đơn</h2>
            <Box
                sx={{
                    my: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}></Box>
            <Collapse in={Boolean(rows)}>
                <TableContainer component={Paper} sx={{ maxHeight: '380px' }}>
                    <Table sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Tên sản phẩm</StyledTableCell>
                                <StyledTableCell align="left">Giá bán</StyledTableCell>
                                <StyledTableCell align="center">Số lượng</StyledTableCell>
                                <StyledTableCell align="left">Chiết khấu</StyledTableCell>
                                <StyledTableCell align="left">Thành tiền</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows &&
                                rows.map((row) => (
                                    <StyledTableRow key={row.productId}>
                                        <StyledTableCell align="left">
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    gap: '15px',
                                                    alignItems: 'center'
                                                }}>
                                                <Box
                                                    sx={{
                                                        width: '200px',
                                                        height: '150px',
                                                        aspectRatio: '3/2'
                                                    }}>
                                                    <img
                                                        src={`http://api.dinhtruong.live/api/storage_server/download/${row?.product.photoMain}`}
                                                        alt="123"
                                                        width="200px"
                                                    />
                                                </Box>
                                                <Box>
                                                    <Typography sx={{ fontWeight: 'bold' }}>
                                                        {row.product.name}
                                                    </Typography>
                                                    <Typography variant="button">
                                                        Mã Sản Phẩm: {row.product.productCode}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {row?.product.priceOut.toLocaleString('vi-vn')} VND
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Box sx={{ display: 'flex' }}>
                                                <IconButton
                                                    onClick={() => {
                                                        let newQuantity = Number(row.quantity) - 1
                                                        if (newQuantity < 0) return
                                                        setRows((oldRow) => {
                                                            return oldRow.map((item) => {
                                                                if (
                                                                    item.productId === row.productId
                                                                ) {
                                                                    return {
                                                                        ...item,
                                                                        quantity: newQuantity
                                                                    }
                                                                }
                                                                return item
                                                            })
                                                        })
                                                    }}>
                                                    <RemoveIcon />
                                                </IconButton>

                                                <TextField
                                                    type="number"
                                                    size="small"
                                                    id="outlined-basic"
                                                    variant="outlined"
                                                    inputProps={{ min, max }}
                                                    value={row?.quantity}
                                                    onChange={(event) => {
                                                        setRows((oldRow) => {
                                                            return oldRow.map((item) => {
                                                                if (
                                                                    item.productId === row.productId
                                                                ) {
                                                                    return {
                                                                        ...item,
                                                                        quantity: Number(
                                                                            event.target.value
                                                                        )
                                                                    }
                                                                }
                                                                return item
                                                            })
                                                        })
                                                    }}
                                                    sx={{ width: '80px' }}
                                                />

                                                <IconButton
                                                    onClick={() => {
                                                        let newQuantity = Number(row.quantity) + 1
                                                        setRows((oldRow) => {
                                                            return oldRow.map((item) => {
                                                                if (
                                                                    item.productId === row.productId
                                                                ) {
                                                                    return {
                                                                        ...item,
                                                                        quantity: newQuantity
                                                                    }
                                                                }
                                                                return item
                                                            })
                                                        })
                                                    }}>
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            <TextField
                                                error
                                                type="number"
                                                size="small"
                                                // id="outlined-error-helper-text"
                                                id="outlined-basic"
                                                variant="outlined"
                                                helperText={errorChangedPrice}
                                                defaultValue={row?.changedPrice}
                                                // helperText={errorChangedPrice}
                                                sx={{ width: '250px' }}
                                                onChange={(event) => {
                                                    if (event.target.value < 0 || event.target.value >= row.product.priceOut) { setErrorChangedPrice('Chiết khấu không được < 0 hoặc >= giá bán')}
                                                    else {
                                                        row.changedPrice = event.target.value
                                                        setErrorChangedPrice('')
                                                    }
                                                    // let newQuantity = Number(row.changedPrice)aoh
                                                    // setRows((oldRow) => {
                                                    //     return oldRow.map((item) => {
                                                    //         if (item.id === row.id) {
                                                    //             return {
                                                    //                 ...item,
                                                    //                 changedPrice: newQuantity
                                                    //             }
                                                    //         }
                                                    //         return item
                                                    //     })
                                                    // })
                                                }}
                                                onBlur={() => {
                                                    let newQuantity = Number(row.changedPrice)
                                                    setRows((oldRow) => {
                                                        return oldRow.map((item) => {
                                                            if (item.productId === row.productId) {
                                                                return {
                                                                    ...item,
                                                                    changedPrice: newQuantity
                                                                }
                                                            }
                                                            return item
                                                        })
                                                    })
                                                }}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            VND
                                                        </InputAdornment>
                                                    )
                                                }}
                                                // onBlur={() => {
                                                //     let newQuantity = Number(row.changedPrice)
                                                //     setRows((oldRow) => {
                                                //         return oldRow.map((item) => {
                                                //             if (item.id === row.id) {
                                                //                 return {
                                                //                     ...item,
                                                //                     changedPrice: newQuantity
                                                //                 }
                                                //             }
                                                //             return item
                                                //         })
                                                //     })
                                                // }}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {(
                                                row?.product.priceOut * row.quantity -
                                                row.changedPrice
                                            ).toLocaleString('vi-VN')}{' '}
                                            VND
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            <IconButton
                                                onClick={() => {
                                                    setRows((prev) =>
                                                        prev.filter(
                                                            (item) =>
                                                                item.productId !== row.productId
                                                        )
                                                    )
                                                    setProductList([
                                                        {
                                                            id: row.productId,
                                                            name: row.product.name,
                                                            productPhoto: {
                                                                photoMainName: row.product.photoMain
                                                            },
                                                            productCode: row.product.productCode,
                                                            priceOut: row.product.priceOut,
                                                            quantity: row.quantity,
                                                            discount: row.changedPrice
                                                        },
                                                        ...productList
                                                    ])
                                                }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Collapse>

            <Paper>
                <Grid container sx={{ px: 4, py: 2, mt: 3 }}>
                    <Grid item xs={8}>
                        <Box sx={{ mb: 2 }}>
                            <Button
                                variant="text"
                                startIcon={checkedProduct ? <RemoveIcon /> : <AddIcon />}
                                onClick={() => {
                                    setCheckedProduct((prev) => !prev)
                                }}>
                                Thêm sản phẩm
                            </Button>
                            <Collapse in={checkedProduct}>
                                {formatProductList && (
                                    <Autocomplete
                                        id="tags-outlined"
                                        options={formatProductList}
                                        getOptionLabel={(option) => option.product.name}
                                        onChange={handleSelectedProduct}
                                        filterSelectedOptions
                                        sx={{ width: 300, mt: 1, ml: 4 }}
                                        renderOption={(props, option) => (
                                            <Box
                                                component="li"
                                                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                                {...props}>
                                                <img
                                                    loading="lazy"
                                                    width="20"
                                                    src={`http://api.dinhtruong.live/api/storage_server/download/${option.product.photoMain}`}
                                                    alt=""
                                                />
                                                {option.product.name}
                                                <br />
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                size="small"
                                                label="Chọn sản phẩm"
                                            />
                                        )}
                                    />
                                )}
                            </Collapse>
                        </Box>
                        <Box>
                            <Button
                                variant="text"
                                startIcon={checkedCustomer ? <RemoveIcon /> : <AddIcon />}
                                onClick={() => {
                                    setCheckedCustomer((prev) => !prev)
                                }}>
                                Thông tin người mua
                            </Button>
                            <Collapse in={checkedCustomer}>
                                {userList && (
                                    <Autocomplete
                                        id="tags-outlined"
                                        options={userList}
                                        getOptionLabel={(option) =>
                                            option.firstName +
                                            ' ' +
                                            option.middleName +
                                            ' ' +
                                            option.lastName
                                        }
                                        onChange={handleChange}
                                        filterSelectedOptions
                                        sx={{ width: 300, mt: 1, ml: 4 }}
                                        renderOption={(props, option) => (
                                            <Box
                                                component="li"
                                                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                                {...props}>
                                                {option.firstName} {option.middleName}{' '}
                                                {option.lastName}- {option.phone}
                                                <br />
                                                {option.roles[0].name}
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                size="small"
                                                label="Chọn khách hàng"
                                            />
                                        )}
                                    />
                                )}
                            </Collapse>
                            {selectedEmployee && (
                                <Box sx={{ mt: 2, mr: 3 }}>
                                    {/* <Typography variant="subtitle1">
                                    <b>THÔNG TIN KHÁCH HÀNG</b>
                                </Typography> */}
                                    <hr />
                                    <Typography variant="subtitle1">
                                        {selectedEmployee.firstName +
                                            ' ' +
                                            selectedEmployee.middleName +
                                            ' ' +
                                            selectedEmployee.lastName}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        <b>Địa chỉ: </b>
                                        {addressDetails(selectedEmployee)}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        <b>SĐT: </b> {selectedEmployee.phone}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        <b>Email: </b> {selectedEmployee.email}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Tổng</td>
                                    <td>{totalAmount.toLocaleString('vi-VN')} VND</td>
                                </tr>
                                <tr>
                                    <td>Tổng tiền chiết khấu</td>
                                    <td>{totalDiscount.toLocaleString('vi-VN')} VND</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Tổng tiền</b>
                                    </td>
                                    <td>
                                        <b>{totalAmountAfter.toLocaleString('vi-VN')} VND</b>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <hr />
                        <FormControl sx={{ width: '100%' }}>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="1"
                                name="timesheet"
                                value={value}
                                onChange={handleSelect}>
                                <FormLabel
                                    id="demo-radio-buttons-group-label"
                                    sx={{ display: 'block' }}>
                                    Hình thức thanh toán
                                </FormLabel>
                                <FormControlLabel value="1" control={<Radio />} label="Tiền mặt" />
                                <FormControlLabel
                                    value="2"
                                    control={<Radio />}
                                    label="Chuyển khoản"
                                />
                                <FormControlLabel value="3" control={<Radio />} label="Quẹt thẻ" />
                                <FormControlLabel value="4" control={<Radio />} label="COD" />
                            </RadioGroup>
                        </FormControl>
                        <Box sx={{ display: 'flex', gap: '12px' }}>
                            <Button variant="contained" onClick={() => navigate(-1)}>
                                Hủy
                            </Button>
                            <Button variant="contained" onClick={() => handleCreate(3)}>
                                Tạo hóa đơn
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default CreateReceipt
