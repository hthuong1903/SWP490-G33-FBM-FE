import orderApi from '@/api/orderApi'
import DataTable from '@/components/Common/DataTable'
import ConfirmModal from '@/components/Common/Modal/ConfirmModal'
import { EditRounded } from '@mui/icons-material'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import { Button, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import moment from 'moment/moment'
import { useReactToPrint } from 'react-to-print'
import ReceiptPrint from './components/ReceiptPrint'
import CancelReceipt from './CancelReceipt'

function Receipt() {
    const navigate = useNavigate()
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [isOpenPrintModal, setIsOpenPrintModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const [listProducts, setListProducts] = useState([])
    const [isRender, setIsRender] = useState(true)
    const componentRef = useRef()
    const [isCancelModel, setIsCancelModel] = useState(false)

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Invoice'
    })

    const handleDelete = async () => {
        try {
            await orderApi.deleteOrderT(selectedRow?.id)
            toast.success('Xóa thành công !')
            setIsOpenConfirmModal(false)
            setIsRender(true)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getAllProduct = async (status) => {
            try {
                const response = await orderApi.getAllOrder(status)
                setListProducts(response.data)
                if (response.data.length > 0) setSelectedRow(response.data[0])
            } catch (error) {
                console.log('fail when getAllProduct', error)
            }
        }
        isRender && getAllProduct(3)
        setIsRender(false)
    }, [listProducts, isRender])

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1, hide: true },
        {
            field: 'customerName',
            headerName: 'TÊN KHÁCH HÀNG',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Typography sx={{ fontWeight: 'bold' }}>{
                    params.row.customer.firstName +
                    ' ' +
                    params.row.customer.middleName +
                    ' ' +
                    params.row.customer.lastName}
                    </Typography>
                )
            }
        },
        { field: 'orderCode', headerName: 'MÃ HÓA ĐƠN', flex: 1, headerAlign: 'center',
        align: 'center'},
        {
            field: 'phone',
            headerName: 'SỐ ĐIỆN THOẠI',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            renderCell: (params) => {
                return params.row.customer.phone
            }
        },
        {
            field: 'createdBy',
            headerName: 'NGƯỜI TẠO',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            renderCell: (params) => {
                return params.row.employeeSale.username
            }
        },
        {
            field: 'totalOrderPrice',
            headerName: 'TỔNG HÓA ĐƠN',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            valueFormatter: (params) => {
                if (params.value == null) {
                    return ''
                }
                return `${params.value.toLocaleString('vi-VN')} VND`
            }
        },
        {
            field: 'dateCreated',
            headerName: 'NGÀY TẠO',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            type: 'number',
            valueFormatter: (params) => {
                if (params.value == null) {
                    return ''
                }
                return moment(params.value).format('DD/MM/YYYY HH:MM')
            }
        },

        {
            field: 'actions',
            headerName: 'TÁC VỤ',
            flex: 1.5,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <>
                        <Tooltip title="Xem">
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => {
                                    navigate(`/manager/admin/receipts/details/${params.row.id}`)
                                }}>
                                Xem
                            </Button>
                        </Tooltip>
                        <Tooltip title="Xóa" sx={{ m: 1 }}>
                            <Button
                                aria-label="delete"
                                variant="contained"
                                size="small"
                                onClick={() => {
                                    setSelectedRow(params.row)
                                    // setIsOpenConfirmModal(true)
                                    setIsCancelModel(true)
                                }}>
                                HỦY
                                <ClearRoundedIcon fontSize="inherit" />
                            </Button>
                        </Tooltip>
                        <Tooltip title="XUẤT">
                            <Button
                                aria-label="delete"
                                variant="contained"
                                size="small"
                                onClick={() => {
                                    setSelectedRow(params.row)
                                    setIsOpenPrintModal(true)
                                    // handlePrint()
                                    console.log("rowwwwww",params.row)
                                }}>
                                Xuất
                                <EditRounded fontSize="inherit" />
                            </Button>
                        </Tooltip>
                    </>
                )
            }
        }
    ]
    return (
        <>
            {/* <ConfirmModal
                isOpen={isOpenConfirmModal}
                title="Xác nhận"
                content={`Bạn có muốn xóa hóa đơn này không?`}
                handleClose={() => setIsOpenConfirmModal(false)}
                handleConfirm={() => handleDelete()}
            /> */}
            {isCancelModel && (
                <CancelReceipt 
                    isOpen={isCancelModel}
                    title={`Bạn có muốn hủy hóa đơn ${selectedRow?.orderCode}?`}
                    orderId={selectedRow?.id}
                    handleClose={() => setIsCancelModel(false)}
                    handleConfirm={() => setIsRender(true)}
                />
            )}
            <ConfirmModal
                isOpen={isOpenPrintModal}
                title="Xác nhận"
                content={`Bạn có muốn in hóa đơn ${selectedRow?.orderCode} không?`}
                handleClose={() => setIsOpenPrintModal(false)}
                handleConfirm={() => {
                    handlePrint()
                    setIsOpenPrintModal(false)
                }}
            />
            <h2>Quản lý hóa đơn</h2>
            <Box
                sx={{
                    mb: 2,
                    mt: 3,
                    display: 'flex',
                    // justifyContent: 'space-between',
                    justifyContent: 'flex-end'
                }}>
                <Button
                    variant="contained"
                    sx={{ float: 'right' }}
                    onClick={() => navigate('../receipts/createReceipt')}>
                    Thêm hóa đơn
                </Button>
            </Box>

            <DataTable columns={columns} rows={listProducts} />
            {selectedRow && (
                <Box ref={componentRef}>
                    <ReceiptPrint data={selectedRow} />
                </Box>
            )}
        </>
    )
}

export default Receipt
