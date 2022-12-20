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
import orderApi from '@/api/orderApi'

const defaultNumbers = ' hai ba bốn năm sáu bảy tám chín'

const chuHangDonVi = ('1 một' + defaultNumbers).split(' ')
const chuHangChuc = ('lẻ mười' + defaultNumbers).split(' ')
const chuHangTram = ('không một' + defaultNumbers).split(' ')
const dvBlock = '1 nghìn triệu tỷ'.split(' ')

const convert_block_three = (number) => {
    if (number == '000') return ''
    var _a = number + '' //Convert biến 'number' thành kiểu string

    //Kiểm tra độ dài của khối
    switch (_a.length) {
        case 0:
            return ''
        case 1:
            return chuHangDonVi[_a]
        case 2:
            return convert_block_two(_a)
        case 3:
            var chuc_dv = ''
            if (_a.slice(1, 3) != '00') {
                chuc_dv = convert_block_two(_a.slice(1, 3))
            }
            var tram = chuHangTram[_a[0]] + ' trăm'
            return tram + ' ' + chuc_dv
    }
}

function convert_block_two(number) {
    var dv = chuHangDonVi[number[1]]
    var chuc = chuHangChuc[number[0]]
    var append = ''

    // Nếu chữ số hàng đơn vị là 5
    if (number[0] > 0 && number[1] == 5) {
        dv = 'lăm'
    }

    // Nếu số hàng chục lớn hơn 1
    if (number[0] > 1) {
        append = ' mươi'

        if (number[1] == 1) {
            dv = ' mốt'
        }
    }

    return chuc + '' + append + ' ' + dv
}

function to_vietnamese(number) {
    var str = parseInt(number) + ''
    var i = 0
    var arr = []
    var index = str.length
    var result = []
    var rsString = ''

    if (index == 0 || str == 'NaN') {
        return ''
    }

    // Chia chuỗi số thành một mảng từng khối có 3 chữ số
    while (index >= 0) {
        arr.push(str.substring(index, Math.max(index - 3, 0)))
        index -= 3
    }

    // Lặp từng khối trong mảng trên và convert từng khối đấy ra chữ Việt Nam
    for (i = arr.length - 1; i >= 0; i--) {
        if (arr[i] != '' && arr[i] != '000') {
            result.push(convert_block_three(arr[i]))

            // Thêm đuôi của mỗi khối
            if (dvBlock[i]) {
                result.push(dvBlock[i])
            }
        }
    }

    // Join mảng kết quả lại thành chuỗi string
    rsString = result.join(' ')

    // Trả về kết quả kèm xóa những ký tự thừa
    return rsString.replace(/[0-9]/g, '').replace(/ /g, ' ').replace(/ $/, '')
}

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
    let text = to_vietnamese(totalAmountAfter)

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
                                    <StyledTableCell>{index+1}</StyledTableCell>
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
                    Thành tiền (bằng chữ): {text}
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
