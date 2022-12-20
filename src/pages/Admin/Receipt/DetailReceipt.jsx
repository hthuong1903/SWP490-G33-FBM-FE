import { Chip, Divider, Grid, TextField, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Box } from '@mui/system'
import { useParams } from 'react-router-dom'
import StyledTableCell from '@/components/Common/Table/StyledTableCell'
import StyledTableRow from '@/components/Common/Table/StyledTableRow'
import { useEffect, useState } from 'react'
import orderApi from '@/api/orderApi'
import moment from 'moment'
import './style.css'
import { ORDER_STATUS, PAYMENT_METHOD } from './constant'
import Constants from '@/components/Constants'

function DetailReceipt() {
    const [receiptDetail, setReceiptDetail] = useState()
    const [listProduct, setListProduct] = useState([])
    let { receiptId } = useParams()

    useEffect(() => {
        const getOrderById = async (receiptId) => {
            try {
                const response = await orderApi.getAllOrderById(receiptId)
                setReceiptDetail(response.data[0])
                console.log("setReceiptDetail", response.data[0])
                setListProduct(response.data[0].orderProductDtos)
                console.log('setListProduct', response.data[0].orderProductDtos)
            } catch (error) {
                console.log('fail when getAllProduct', error)
            }
        }
        getOrderById(receiptId)
    }, [receiptId])

    const addressDetails = () =>
        receiptDetail?.customer.address
            ? `${receiptDetail?.customer.address}, ${receiptDetail?.customer.districtName}, ${receiptDetail?.customer.wardName}, ${receiptDetail?.customer.provinceName}`
            : 'Khách hàng chưa có địa chỉ'

    const addressDetailsOrder = () =>
    receiptDetail.addressDetail
        ? `${receiptDetail.addressDetail}, ${receiptDetail.districtName}, ${receiptDetail.wardName}, ${receiptDetail.provinceName}`
        : 'Khách hàng chưa có địa chỉ'

    const paymentMethod = () => receiptDetail && PAYMENT_METHOD[receiptDetail?.typeOfPay - 1].name
    const orderStatus = () =>
        receiptDetail && ORDER_STATUS.filter((item) => item.id === receiptDetail?.status)[0]

    const totalAmount =
        receiptDetail &&
        receiptDetail.orderProductDtos.reduce(
            (result, value) =>
                result + value.product.priceOut * (value.product.discount / 100) * value?.quantity,
            0
        )

    const totalAmountAfter =
        receiptDetail &&
        receiptDetail.orderProductDtos.reduce(
            (result, value) =>
                result +
                value.product.priceOut * (value.product.discount / 100) * value?.quantity -
                value?.changedPrice,
            0
        )

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
                {receiptDetail && (
                    <>
                        <Typography sx={{ fontWeight: 'bold' }}>
                            Thông tin chi tiết hóa đơn {receiptDetail.orderCode}
                        </Typography>
                    </>
                )}
            </Box>
            {receiptDetail && (
                <>
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
                                {listProduct &&
                                    listProduct.map((row) => (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell align="left">
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        gap: '15px',
                                                        alignItems: 'center'
                                                    }}>
                                                    <img
                                                        src={
                                                            Constants.baseAPI +
                                                            `api/storage_server/download/${row?.product.photoMain}`
                                                        }
                                                        alt="123"
                                                        width="100px"
                                                    />
                                                    <Box>
                                                        <Typography sx={{ fontWeight: 'bold' }}>
                                                            {row?.product.name}
                                                        </Typography>
                                                        <Typography variant="button">
                                                            Mã sản phẩm : {row?.product.productCode}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                {(
                                                    // row.product.priceOut 
                                                    row.priceOutProduct
                                                    // -
                                                    // row.product.priceOut *
                                                    //     (row.product.discount / 100)
                                                ).toLocaleString('vi-vn')}{' '}
                                                VND
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                {row?.discount}%
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                {row?.quantity}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                {row.changedPrice.toLocaleString('vi-vn')} VND
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <b>
                                                    {(
                                                        // row.product.priceOut * row?.quantity -
                                                        // row.product.priceOut *
                                                        //     (row.product.discount / 100) *
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
                                display: 'flex',
                                justifyContent: 'flex-end',
                                my: 2,
                                pt: 1
                            }}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="td">Tổng</td>
                                        <td>{receiptDetail.totalOrderPrice?.toLocaleString('vi-VN')} VND</td>
                                    </tr>
                                    <tr>
                                        <td>Tổng tiền chiết khấu</td>
                                        <td>
                                            {receiptDetail.totalOrderPriceAfter.toLocaleString(
                                                'vi-VN'
                                            )}{' '}
                                            VND
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Tổng tiền giảm giá</td>
                                        <td>
                                            {receiptDetail.totalDiscountPrice.toLocaleString(
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
                                            <b>{(receiptDetail.totalOrderPrice-receiptDetail.totalDiscountPrice-receiptDetail.totalOrderPriceAfter)?.toLocaleString('vi-VN')} VND</b>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Box>
                        <Divider />
                        <Grid container sx={{ px: 4, py: 2 }}>
                            <Grid item xs={4}>
                            { receiptDetail.isAddAddress == false ? 
                                <Box>
                                    <Typography variant="subtitle1">
                                        <b>THÔNG TIN KHÁCH HÀNG</b>
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {receiptDetail.customer.username}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        <b>Địa chỉ: </b> {addressDetails()}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        <b>SĐT: </b> {receiptDetail?.customer.phone}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        <b>Email: </b> {receiptDetail?.customer.email}
                                    </Typography>
                                </Box>
                            :
                            <Box>
                                    <Typography variant="subtitle1">
                                        <b>THÔNG TIN KHÁCH HÀNG</b>
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {receiptDetail.customer.username}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        <b>Địa chỉ: </b> {addressDetailsOrder()}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        <b>SĐT: </b> {receiptDetail?.customer.phone}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        <b>Email: </b> {receiptDetail?.customer.email}
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
                                    {moment(receiptDetail?.dateCreated).format('DD/MM/YYYY')}
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
            )}
        </>
    )
}

export default DetailReceipt
