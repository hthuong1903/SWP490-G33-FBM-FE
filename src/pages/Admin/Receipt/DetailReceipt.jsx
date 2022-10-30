import { Button, Chip, Divider, Grid, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Box } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'
import StyledTableCell from '@/components/Common/Table/StyledTableCell'
import StyledTableRow from '@/components/Common/Table/StyledTableRow'
import { useEffect, useState } from 'react'
import orderApi from '@/api/orderApi'
import moment from 'moment'
import './style.css'
import { ORDER_STATUS, PAYMENT_METHOD } from './constant'

function DetailReceipt() {
    const [receiptDetail, setReceiptDetail] = useState([])
    let { receiptId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getOrderById = async (receiptId) => {
            try {
                const response = await orderApi.getAllOrderById(receiptId)
                setReceiptDetail(response.data)
            } catch (error) {
                console.log('fail when getAllProduct', error)
            }
        }
        getOrderById(receiptId)
    }, [receiptId])

    const addressDetails = () =>
        receiptDetail[0]?.customer.address
            ? `${receiptDetail[0]?.customer.address}, ${receiptDetail[0]?.customer.districtName}, ${receiptDetail[0]?.customer.wardName}, ${receiptDetail[0]?.customer.provinceName}`
            : 'Khách hàng chưa có địa chỉ'

    const paymentMethod = () =>
        receiptDetail[0] && PAYMENT_METHOD[receiptDetail[0]?.typeOfPay - 1].name
    const orderStatus = () =>
        receiptDetail[0] && ORDER_STATUS.filter((item) => item.id === receiptDetail[0]?.status)[0]

    return (
        <>
            <h2>Chi tiết hóa đơn</h2>
            <Box
                sx={{
                    my: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                <Typography sx={{ fontWeight: 'bold' }}>
                    Thông tin chi tiết hóa đơn {receiptId}
                </Typography>
                {/* <Box sx={{ display: 'flex', gap: '12px' }}>
                    <Button variant="contained">Xem báo giá</Button>
                    <Button
                        variant="contained"
                        onClick={() => navigate('../orders/createOrder', { state: receiptDetail })}>
                        Tạo báo giá
                    </Button>
                </Box> */}
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
                        {receiptDetail.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell align="left">
                                    <Box
                                        sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                        <img
                                            src={`http://api.dinhtruong.live/api/storage_server/download/${row?.orderProductDtos[0].product.photoMain}`}
                                            alt="123"
                                            width="100px"
                                        />
                                        <Box>
                                            <Typography sx={{ fontWeight: 'bold' }}>
                                                {row?.orderProductDtos[0].product.name}
                                            </Typography>
                                            <Typography variant="button">
                                                SKU: {row?.orderProductDtos[0].product.productCode}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {row?.totalOrderPrice.toLocaleString('vi-vn')} VND
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {row?.numberOfProducts}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {row?.orderProductDtos[0].product.discount.toLocaleString(
                                        'vi-vn'
                                    )}{' '}
                                    VND
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {row?.totalOrderPriceAfter.toLocaleString('vi-vn')} VND
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
                        <tbody>
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
                        </tbody>
                    </table>
                </Box>
                <Divider />
                <Grid container sx={{ px: 4, py: 2 }}>
                    <Grid item xs={4}>
                        <Box>
                            <Typography variant="subtitle1">
                                <b>THÔNG TIN KHÁCH HÀNG</b>
                            </Typography>
                            <Typography variant="subtitle1">
                                {receiptDetail[0]?.customer.username}
                            </Typography>
                            <Typography variant="subtitle1">
                                <b>Địa chỉ: </b> {addressDetails()}
                            </Typography>
                            <Typography variant="subtitle1">
                                <b>SĐT: </b> {receiptDetail[0]?.customer.phone}
                            </Typography>
                            <Typography variant="subtitle1">
                                <b>Email: </b> {receiptDetail[0]?.customer.email}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="subtitle1">
                            <b>Hình thức thanh toán: </b> {paymentMethod()}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="subtitle1">
                            <b>Ngày tạo đơn hàng: </b>
                            {moment(receiptDetail[0]?.dateCreated).format('DD/MM/YYYY')}
                        </Typography>
                        <Typography variant="subtitle1">
                            <b>Tình trạng đơn hàng:</b>{' '}
                            <Chip
                                label={orderStatus()?.name}
                                sx={{
                                    border: `1px solid ${orderStatus()?.color}`,
                                    color: `${orderStatus()?.color}`
                                }}
                            />
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default DetailReceipt
