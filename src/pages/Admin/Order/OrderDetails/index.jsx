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
    const [listProduct, setListProduct] = useState([])
    let { orderId } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)

    // const [listOrder, setListOrder] = useState([])

    useEffect(() => {
        const getOrderById = async (orderId) => {
            try {
                const response = await orderApi.getAllOrderById(orderId)
                console.log("setOrderDetail", response.data)
                if (response.data) {
                    setIsLoading(false)
                    setOrderDetail(response.data)
                    setListProduct(response.data[0].orderProductDtos)
                }
            } catch (error) {
                console.log('fail when getOrderById', error)
            }
        }
        getOrderById(orderId)
    }, [])

    // useEffect(() => {
    //     const getAllProduct = async (status) => {
    //         try {
    //             const response = await orderApi.getAllOrder(status)
    //             setListProducts(response.data)
    //         } catch (error) {
    //             console.log('fail when getAllProduct', error)
    //         }
    //     }
    //     getAllProduct(status)
    //     setIsUpdated(false)
    // }, [isUpdated, status])

    const addressDetails = () =>
        orderDetail[0]?.customer.address
            ? `${orderDetail[0]?.customer.address}, ${orderDetail[0]?.customer.districtName}, ${orderDetail[0]?.customer.wardName}, ${orderDetail[0]?.customer.provinceName}`
            : 'Khách hàng chưa có địa chỉ'

    const addressDetails1 = () =>
    orderDetail[0].addressDetail
        ? `${orderDetail[0].addressDetail}, ${orderDetail[0].districtName}, ${orderDetail[0].wardName}, ${orderDetail[0].provinceName}`
        : 'Khách hàng chưa có địa chỉ'

    const paymentMethod = () => orderDetail[0] && PAYMENT_METHOD[orderDetail[0]?.typeOfPay - 1].name

    const orderStatus = () =>
        orderDetail[0] && ORDER_STATUS.filter((item) => item.id === orderDetail[0]?.status)[0]

    const totalAmount =
        orderDetail[0] &&
        orderDetail[0].orderProductDtos.reduce(
            (result, value) =>
                result +
                value?.product.priceOut -
                (value?.product.priceOut * value?.product.discount) / 100,
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

    console.log('orderDetail', orderDetail)
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
                        {/* <Button variant="contained">Xem báo giá</Button> */}
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
                                <StyledTableCell align="left">Giảm giá</StyledTableCell>
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
                                                        Mã sản phẩm: {row?.product.productCode}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {(
                                                // row?.product.priceOut -
                                                // (row?.product.priceOut * row?.product.discount) /
                                                //     100
                                                row.priceOutProduct
                                            ).toLocaleString('vi-VN')}{' '}
                                            VND
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {row?.discount}%
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
                                                    // (row?.product.priceOut -
                                                    //     (row?.product.priceOut *
                                                    //         row?.product.discount) /
                                                    //         100) *
                                                    //     row?.quantity -
                                                    // row?.changedPrice
                                                    ((100 - row.discount)/100)*row.priceOutProduct*row.quantity  - row.changedPrice
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
                            my: 2,
                            pt: 1
                        }}>
                        <Grid sx={{ display: 'flex', pt: 2, pl: 2, justifyContent: 'flex-start' }}>
                            {orderDetail[0].status == 4 ? (
                                <Typography variant="subtitle1">
                                    <b>Lí do hủy hóa đơn: </b>
                                    {orderDetail[0]?.cancelContent} - {orderDetail[0]?.cancelDetail}
                                </Typography>
                            ) : null}
                        </Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <table>
                                <tr>
                                    <td className="td">Tổng</td>
                                    <td>{orderDetail[0].totalOrderPrice?.toLocaleString('vi-VN')} VND</td>
                                </tr>
                                <tr>
                                    <td>Tổng tiền chiết khấu</td>
                                    <td>
                                        {orderDetail[0]?.totalOrderPriceAfter.toLocaleString(
                                            'vi-VN'
                                        )}{' '}
                                        VND
                                    </td>
                                </tr>
                                <tr>
                                        <td>Tổng tiền giảm giá</td>
                                        <td>
                                            {orderDetail[0].totalDiscountPrice.toLocaleString(
                                                'vi-VN'
                                            )}{' '}
                                            VND
                                        </td>
                                    </tr>
                                <tr>
                                    <td>
                                        <b>Tổng tiền</b>
                                    </td>
                                    <td>
                                        <b>
                                            {(
                                                orderDetail[0].totalOrderPrice-orderDetail[0].totalDiscountPrice-orderDetail[0].totalOrderPriceAfter
                                            ).toLocaleString('vi-VN')}{' '}
                                            VND
                                        </b>
                                    </td>
                                </tr>
                            </table>
                        </Grid>
                    </Box>
                    <Divider />
                    <Grid container sx={{ px: 4, py: 2 }}>
                        <Grid item xs={4}>
                            { orderDetail[0].isAddAddress == false ? 
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
                            : 
                                <Box>
                                    <Typography variant="subtitle1">
                                        <b>THÔNG TIN KHÁCH HÀNG</b>
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {orderDetail[0]?.customer.username}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        <b>Địa chỉ: </b> {addressDetails1()}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        <b>SĐT: </b> {orderDetail[0]?.customer.phone}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        <b>Email: </b> {orderDetail[0]?.customer.email}
                                    </Typography>
                                </Box>
                            }
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
