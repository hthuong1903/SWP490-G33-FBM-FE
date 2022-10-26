import { Autocomplete, Button, Collapse, Divider, Grid, TextField, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Box } from '@mui/system'
import { useParams } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import './style.css'
import { useEffect, useState } from 'react'
import RemoveIcon from '@mui/icons-material/Remove'
import authApi from '@/api/authApi'

export const listProducts = [
    { id: 1, name: 'Tuan', discount: 1000 },
    { id: 2, name: 'Tuan', discount: 1000 }
]
export default function CreateOrder() {
    const [checkedProduct, setCheckedProduct] = useState(false)
    const [checkedCustomer, setCheckedCustomer] = useState(false)
    const [userList, setUserList] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState(null)

    const handleChange = (event, value) => setSelectedEmployee(value)

    let { orderId } = useParams()

    useEffect(() => {
        const getAllUser = async () => {
            try {
                const response = await authApi.getAllUser()
                setUserList(response.data)
            } catch (error) {
                console.log('fail at getAllUser', error)
            }
        }
        getAllUser()
    }, [])
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.lightOrange,
            color: theme.palette.common.black
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14
        }
    }))

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0
        }
    }))

    const rows = []

    useEffect(() => {
        console.log(selectedEmployee)
    }, [selectedEmployee])
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
            <Collapse in={selectedEmployee}>
                <TableContainer component={Paper} sx={{ maxHeight: '380px' }}>
                    <Table sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Sản phẩm</StyledTableCell>
                                <StyledTableCell align="left">Giá bán</StyledTableCell>
                                <StyledTableCell align="left">Số lượng</StyledTableCell>
                                <StyledTableCell align="left">Chiết khấu</StyledTableCell>
                                <StyledTableCell align="left">Thành tiền</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell align="left">
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                gap: '15px',
                                                alignItems: 'center'
                                            }}>
                                            <img
                                                src="https://www.noithatthanhthuy.com/uploads/news/2020_02/truong-ky-noi-that-thanh-thuy-1.jpg"
                                                alt="123"
                                                width="100px"
                                            />
                                            <Box>
                                                <Typography sx={{ fontWeight: 'bold' }}>
                                                    {row.product}
                                                </Typography>
                                                <Typography variant="button">
                                                    SKU: {row.sku}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {row.price.toLocaleString('vi-vn')} VND
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.quantity}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        {row.discount.toLocaleString('vi-vn')} VND
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {row.total.toLocaleString('vi-vn')} VND
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Collapse>
            <Paper>
                <Grid container sx={{ px: 4, py: 2 }}>
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
                            <Collapse in={checkedProduct}></Collapse>
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
                                                // {...register('name')}
                                                // error={errors.name ? true : false}
                                                // helperText={errors.name?.message}
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
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>Tổng tiền chiết khấu</td>
                                <td>5</td>
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
