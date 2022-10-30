import authApi from '@/api/authApi'
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
    Grid,
    IconButton,
    InputAdornment,
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
import { Controller } from 'react-hook-form'
import NumberFormat from 'react-number-format'
import { useLocation, useParams } from 'react-router-dom'
import './style.css'

function CreateReceipt() {
    const [checkedProduct, setCheckedProduct] = useState(false)
    const [checkedCustomer, setCheckedCustomer] = useState(false)
    const [userList, setUserList] = useState([])
    const [productList, setProductList] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState([])
    const [rows, setRows] = useState([])

    const location = useLocation()
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
                const response = await authApi.getAllUser()
                setUserList(response.data)
            } catch (error) {
                console.log('fail at getAllUser', error)
            }
        }

        getAllUser()
        getAllProduct()
        setRows([...location.state[0].orderProductDtos])
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
        setSelectedProduct(value)
        if (value) {
            setRows([value, ...rows])
            setProductList((prev) => prev.filter((item) => item.id !== value.productId))
        }
    }

    const totalDiscount = useMemo(
        () => rows.reduce((result, value) => result + value.changedPrice, 0),
        [rows]
    )
    // const resultDiscount = () => rows.reduce((result, value) => result + value.discount, 0)

    return (
        <>
            <h2>Chi tiết đơn hàng</h2>
            <Box
                sx={{
                    my: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                <Typography sx={{ fontWeight: 'bold' }}>
                    Thông tin chi tiết đơn hàng {orderId}
                </Typography>
                <Box sx={{ display: 'flex', gap: '12px' }}>
                    <Button variant="contained">Xem báo giá</Button>
                    <Button variant="contained">Tạo báo giá</Button>
                    <Button variant="contained">Tạo hóa đơn</Button>
                </Box>
            </Box>
            <Collapse in={Boolean(rows)}>
                <TableContainer component={Paper} sx={{ maxHeight: '380px' }}>
                    <Table sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Sản phẩm</StyledTableCell>
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
                                                        SKU: {row.product.productCode}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {row?.product.priceOut.toLocaleString('vi-vn')} VND
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Box>
                                                <IconButton
                                                    onClick={() => {
                                                        let newQuantity = Number(row.quantity) - 1
                                                        console.log(row.productId)
                                                        if (newQuantity < 0) return
                                                        setRows((oldRow) => {
                                                            return oldRow.map((item) => {
                                                                if (
                                                                    item.productId === row.productId
                                                                ) {
                                                                    console.log('123', {
                                                                        ...item,
                                                                        quantity: newQuantity
                                                                    })

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
                                                type="number"
                                                size="small"
                                                id="outlined-basic"
                                                variant="outlined"
                                                defaultValue={row?.changedPrice}
                                                sx={{ width: '250px' }}
                                                onChange={(event) => {
                                                    row.changedPrice = event.target.value
                                                }}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            VND
                                                        </InputAdornment>
                                                    )
                                                }}
                                                onBlur={() => {
                                                    let newQuantity = Number(row.changedPrice)
                                                    setRows((oldRow) => {
                                                        return oldRow.map((item) => {
                                                            if (item.id === row.id) {
                                                                return {
                                                                    ...item,
                                                                    changedPrice: newQuantity
                                                                }
                                                            }
                                                            return item
                                                        })
                                                    })
                                                }}
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
                                                    console.log(row)
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
                                        getOptionLabel={(option) => option.name}
                                        onChange={handleChange}
                                        filterSelectedOptions
                                        sx={{ width: 300, mt: 1, ml: 4 }}
                                        renderOption={(props, option) => (
                                            <Box
                                                component="li"
                                                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                                {...props}>
                                                {option.name} - {option.phone}
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
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <table>
                            <tr>
                                <td>Tổng</td>
                                <td>{rows.length}</td>
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
                                    <b>5</b>
                                </td>
                            </tr>
                        </table>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default CreateReceipt
