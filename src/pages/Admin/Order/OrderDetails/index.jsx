import { Button, Divider, Grid, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Box } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'
import './style.css'

export const listProducts = [
    { id: 1, name: 'Tuan', discount: 1000 },
    { id: 2, name: 'Tuan', discount: 1000 }
]
export default function OrderDetails() {
    let { orderId } = useParams()
    const navigate = useNavigate()
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

    const rows = [
        {
            id: 1,
            image: 'https://www.noithatthanhthuy.com/uploads/news/2020_02/truong-ky-noi-that-thanh-thuy-1.jpg',
            product: 'Bộ trường kỷ',
            price: 1000000,
            quantity: 1,
            discount: 0,
            total: 1000000,
            sku: 'HHNCL'
        },
        {
            id: 2,
            image: 'https://www.noithatthanhthuy.com/uploads/news/2020_02/truong-ky-noi-that-thanh-thuy-1.jpg',
            product: 'Bộ trường kỷ',
            price: 1000000,
            quantity: 1,
            discount: 0,
            total: 1000000,
            sku: 'HHNCL'
        },
        {
            id: 3,
            image: 'https://www.noithatthanhthuy.com/uploads/news/2020_02/truong-ky-noi-that-thanh-thuy-1.jpg',
            product: 'Bộ trường kỷ',
            price: 1000000,
            quantity: 1,
            discount: 0,
            total: 1000000,
            sku: 'HHNCL'
        },
        {
            id: 4,
            image: 'https://www.noithatthanhthuy.com/uploads/news/2020_02/truong-ky-noi-that-thanh-thuy-1.jpg',
            product: 'Bộ trường kỷ',
            price: 1000000,
            quantity: 1,
            discount: 0,
            total: 1000000,
            sku: 'HHNCL'
        },
        {
            id: 4,
            image: 'https://www.noithatthanhthuy.com/uploads/news/2020_02/truong-ky-noi-that-thanh-thuy-1.jpg',
            product: 'Bộ trường kỷ',
            price: 1000000,
            quantity: 1,
            discount: 0,
            total: 1000000,
            sku: 'HHNCL'
        },
        {
            id: 4,
            image: 'https://www.noithatthanhthuy.com/uploads/news/2020_02/truong-ky-noi-that-thanh-thuy-1.jpg',
            product: 'Bộ trường kỷ',
            price: 1000000,
            quantity: 1,
            discount: 0,
            total: 1000000,
            sku: 'HHNCL'
        },
        {
            id: 4,
            image: 'https://www.noithatthanhthuy.com/uploads/news/2020_02/truong-ky-noi-that-thanh-thuy-1.jpg',
            product: 'Bộ trường kỷ',
            price: 1000000,
            quantity: 1,
            discount: 0,
            total: 1000000,
            sku: 'HHNCL'
        }
    ]

    console.log(rows)

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
                    <Button variant="contained" onClick={() => navigate('../orders/createOrder')}>
                        Tạo báo giá
                    </Button>
                    <Button variant="contained" onClick={() => navigate('../orders/createOrder')}>
                        Tạo hóa đơn
                    </Button>
                </Box>
            </Box>
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
                                        sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                        <img
                                            src="https://www.noithatthanhthuy.com/uploads/news/2020_02/truong-ky-noi-that-thanh-thuy-1.jpg"
                                            alt="123"
                                            width="100px"
                                        />
                                        <Box>
                                            <Typography sx={{ fontWeight: 'bold' }}>
                                                {row.product}
                                            </Typography>
                                            <Typography variant="button">SKU: {row.sku}</Typography>
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
            <Paper>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        my: 2,
                        pt: 1
                    }}>
                    <table>
                        <tr>
                            <td className="td">Tổng</td>
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
                </Box>
                <Divider />
                <Grid container sx={{ px: 4, py: 2 }}>
                    <Grid item xs={4}>
                        <Box>
                            <Typography variant="subtitle1">THÔNG TIN KHÁCH HÀNG</Typography>
                            <Typography variant="subtitle1">Lê Anh Tuấn</Typography>
                            <Typography variant="subtitle1">Địa chỉ</Typography>
                            <Typography variant="subtitle1">SĐT</Typography>
                            <Typography variant="subtitle1">Email</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="subtitle1">Hình thức thanh toán: COD</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="subtitle1">Ngày tạo đơn hàng:</Typography>
                        <Typography variant="subtitle1">Tình trạng đơn hàng:</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}
