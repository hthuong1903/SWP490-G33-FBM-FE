import React, { useEffect } from 'react'
import {
    Container,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { styled } from '@mui/material/styles'
import './style.css'

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        border: '1px solid'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        border: '1px solid'
    }
}))

function ReceiptPrint({ data }) {
    useEffect(() => {
        console.log(data)
    }, [data])
    const totalAmountAfter =
        data &&
        data.orderProductDtos.reduce(
            (result, value) =>
                result +
                value.product.priceOut * (value.product.discount / 100) * value?.quantity -
                value?.changedPrice,
            0
        )

    return (
        <Container className="print">
            <Box sx={{ textAlign: 'right', m: 2, mb: 5 }}>
                <Typography variant="subtitle2" sx={{ m: 1 }}>
                    {data.orderCode}
                </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', m: 2 }}>
                <Typography variant="body1" sx={{ m: 1 }}>
                    <strong>CƠ SỞ SẢN XUẤT ĐỒ GỖ MỸ NGHỆ CAO CẤP</strong>
                </Typography>
                <Typography variant="h5" sx={{ m: 1 }}>
                    <strong>HOÀNG SƠN</strong>
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                    Chuyên bán buôn – bán lẻ: Sập gụ - Tủ chè – Bàn Ghế các loại
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                    Uy Tín – Chất Lượng – Bảo hành dài hạn
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                    ĐC: SỐ 62 ĐƯỜNG THỐNG NHẤT KHU LÀNG NGHỀ VẠN ĐIỂM – THƯỜNG TÍN – HÀ NỘI
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                    Điện thoại: 0914.830.606 – 0915.116.177
                </Typography>
                <Typography variant="h5" sx={{ m: 1 }}>
                    <strong>HÓA ĐƠN BÁN HÀNG</strong>
                </Typography>
            </Box>
            <Box sx={{ m: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                    Tên khách hàng : {data.customer.firstName} {data.customer.middleName}{' '}
                    {data.customer.lastName}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                    Địa chỉ: {data.customer.wardName}, {data.customer.provinceName},{' '}
                    {data.customer.districtName}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                    Địa chỉ chi tiết: {data.customer.address}
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>STT</StyledTableCell>
                                <StyledTableCell>Tên sản phẩm</StyledTableCell>
                                <StyledTableCell>SL</StyledTableCell>
                                <StyledTableCell>Giá bán</StyledTableCell>
                                <StyledTableCell>Chiết khấu</StyledTableCell>
                                <StyledTableCell>Thành tiền</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.orderProductDtos.map((item, index) => (
                                <TableRow key={index}>
                                    <StyledTableCell>{index}</StyledTableCell>
                                    <StyledTableCell>{item.product.name}</StyledTableCell>
                                    <StyledTableCell>{item.quantity}</StyledTableCell>
                                    <StyledTableCell>
                                        {(
                                            item.product.priceOut *
                                            (item.product.discount / 100)
                                        ).toLocaleString('vi-vn')}{' '}
                                        VND
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {item.changedPrice.toLocaleString('vi-vn')} VND
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {' '}
                                        {(
                                            item.product.priceOut *
                                                (item.product.discount / 100) *
                                                item?.quantity -
                                            item?.changedPrice
                                        ).toLocaleString('vi-VN')}{' '}
                                        VND
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <StyledTableCell colSpan={5}>
                                    <strong>
                                        <i>Tổng cộng</i>
                                    </strong>
                                </StyledTableCell>
                                <StyledTableCell>
                                    {totalAmountAfter?.toLocaleString('vi-VN')} VND
                                </StyledTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography variant="body2" sx={{ my: 2 }}>
                    Thành tiền (bằng chữ):{' '}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'flex-end'
                    }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        KHÁCH HÀNG
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        NHÂN VIÊN BÁN HÀNG
                    </Typography>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="inherit">Ngày …. tháng …. năm …</Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            CHỦ CƠ SỞ
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box></Box>
        </Container>
    )
}

export default ReceiptPrint
