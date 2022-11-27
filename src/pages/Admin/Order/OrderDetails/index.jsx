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
import './style.css'
import { useEffect, useState } from 'react'
import orderApi from '@/api/orderApi'
import { ORDER_STATUS, PAYMENT_METHOD } from '../constant'
import moment from 'moment'
import Loading from '@/components/Common/Loading'

export default function OrderDetails() {
    const [orderDetail, setOrderDetail] = useState([])
    let { orderId } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getOrderById = async (orderId) => {
            try {
                const response = await orderApi.getAllOrderById(orderId)
                if (response.data) {
                    setIsLoading(false)
                    setOrderDetail(response.data)
                }
            } catch (error) {
                console.log('fail when getOrderById', error)
            }
        }
        getOrderById(orderId)
    }, [])
    const addressDetails = () =>
        orderDetail[0]?.customer.address
            ? `${orderDetail[0]?.customer.address}, ${orderDetail[0]?.customer.districtName}, ${orderDetail[0]?.customer.wardName}, ${orderDetail[0]?.customer.provinceName}`
            : 'Khách hàng chưa có địa chỉ'

    const paymentMethod = () => orderDetail[0] && PAYMENT_METHOD[orderDetail[0]?.typeOfPay - 1].name

    const orderStatus = () =>
        orderDetail[0] && ORDER_STATUS.filter((item) => item.id === orderDetail[0]?.status)[0]

    const totalAmount =
        orderDetail[0] &&
        orderDetail[0].orderProductDtos.reduce(
            (result, value) => result + value.quantity * value.product.priceOut,
            0
        )

    const totalAmountAfter =
        orderDetail[0] &&
        orderDetail[0].orderProductDtos.reduce(
            (result, value) =>
                result + value.quantity * value.product.priceOut - value.changedPrice,
            0
        )

    useEffect(() => {
        console.log(isLoading)
    }, [isLoading])

    if (isLoading) return <Loading />
    else
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
                        Thông tin chi tiết đơn hàng {orderDetail[0]?.orderCode}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '12px' }}>
                        <Button variant="contained">Xem báo giá</Button>
                        {orderDetail[0]?.status !== 3 && orderDetail[0]?.status !== 4 ? (
                            <Button
                                variant="contained"
                                onClick={() =>
                                    navigate('../orders/createOrder', { state: orderDetail })
                                }>
                                Tạo báo giá
                            </Button>
                        ) : null}
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
                            {orderDetail[0] &&
                                orderDetail[0].orderProductDtos.map((row) => (
                                    <StyledTableRow key={row.productId}>
                                        <StyledTableCell align="left">
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    gap: '15px',
                                                    alignItems: 'center'
                                                }}>
                                                <img
                                                    src={`http://api.dinhtruong.live/api/storage_server/download/${row?.product.photoMain}`}
                                                    alt="123"
                                                    width="100px"
                                                />
                                                <Box>
                                                    <Typography sx={{ fontWeight: 'bold' }}>
                                                        {row?.product.name}
                                                    </Typography>
                                                    <Typography variant="button">
                                                        SKU: {row?.product.productCode}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {row?.product.priceOut.toLocaleString('vi-vn')} VND
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {row?.quantity}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {row?.changedPrice.toLocaleString('vi-vn')} VND
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            <b>
                                                {(
                                                    row?.product.priceOut * row?.quantity -
                                                    row?.changedPrice
                                                ).toLocaleString('vi-VN')}{' '}
                                                VND
                                            </b>
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
                                <td>{totalAmount?.toLocaleString('vi-VN')} VND</td>
                            </tr>
                            <tr>
                                <td>Tổng tiền chiết khấu</td>
                                <td>
                                    {orderDetail[0]?.totalOrderPriceAfter.toLocaleString('vi-VN')}{' '}
                                    VND
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Tổng tiền</b>
                                </td>
                                <td>
                                    <b>{totalAmountAfter?.toLocaleString('vi-VN')} VND</b>
                                </td>
                            </tr>
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
                                    {orderDetail[0]?.customer.username}
                                </Typography>
                                <Typography variant="subtitle1">
                                    <b>Địa chỉ: </b> {addressDetails()}
                                </Typography>
                                <Typography variant="subtitle1">
                                    <b>SĐT: </b> {orderDetail[0]?.customer.phone}
                                </Typography>
                                <Typography variant="subtitle1">
                                    <b>Email: </b> {orderDetail[0]?.customer.email}
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
                                {moment(orderDetail[0]?.dateCreated).format('DD/MM/YYYY')}
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
