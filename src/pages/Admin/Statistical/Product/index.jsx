import React, { useState } from 'react'
import { Box, MenuItem, TextField, Typography} from '@mui/material'
import DataTable from '@/components/Common/DataTable'
import StatisticAPI from '@/api/StatisticAPI'
import { useEffect } from 'react'

const monthInSemester = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const years = [2021, 2022, 2023]
const _month = new Date().getMonth() + 1
const _year = new Date().getFullYear()

function ProductSale() {

    const [month, setMonth] = useState(_month)
    const [year, setYear] = useState(_year)
    const [type, setType] = useState(1)
    const [listProducts, setListProducts] = useState([])

    const getTopSellingProduct = async (typeSaleProduct, month, year) => {
        try {
            const response = await StatisticAPI.getTopSellingProduct(typeSaleProduct, month, year)
            console.log(response.data)
            setListProducts(response.data[0])
        } catch (error) {
            console.warn('Failed to get top selling product')
        }
    }

    useEffect(() => {
        getTopSellingProduct(type, month, year)
    }, [type, month, year])

    const rows = (listProducts || [] ).map((item, index) => {
        const container = {}
        container['id'] = index
        container['productCode'] = item.productCode
        container['nameProduct'] = item.nameProduct
        container['nameCategory'] = item.nameCategory
        container['numberProduct'] = item.numberProduct
        container['numberProductInShop'] = item.numberProductInShop
        return container
    })

    const columns = [
        { field: 'productCode', headerName: 'MÃ SẢN PHẨM', flex: 0.75,
            renderCell: (params) => {
                return (
                    <Typography sx={{ fontWeight: 'bold' }}>{
                    params.row.productCode }
                    </Typography>
                )
            }
        },
        { field: 'nameProduct', headerName: 'TÊN SẢN PHẨM', flex: 1.5},
        { field: 'nameCategory', headerName: 'DANH MỤC SẢN PHẨM', flex: 0.75 },
        {
            field: 'numberProduct',
            headerName: 'SỐ LƯỢNG ĐÃ BÁN',
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'numberProductInShop',
            headerName: 'SỐ LƯỢNG CÒN TRONG CỬẢ HÀNG',
            flex: 1, align: 'center',
            headerAlign: 'center',
        }
    ]

    return (
        <>
            <h2>Thông kê sản phẩm</h2>
            <Box sx={{mb: 2, mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Box>                
                    <TextField
                        id="outlined-select-currency"
                        select
                        size="small"
                        label="Tháng"
                        value={month}
                        onChange={(event) => {
                            setMonth(event.target.value)
                        }}
                        sx={{ mr: 2 }}
                        >
                        <MenuItem value={-1}>Tất cả</MenuItem>
                        {monthInSemester.map((provider) => {
                            return (
                                <MenuItem key={provider} value={provider}>
                                    {provider}
                                </MenuItem>
                            )
                        })}
                    </TextField>
                    <TextField
                        id="outlined-select-currency"
                        select
                        size="small"
                        label="Năm"
                        value={year}
                        onChange={(event) => {
                            setYear(event.target.value)
                        }}
                        sx={{ mr: 2}}
                        >
                        <MenuItem value={-1}>Tất cả</MenuItem>
                        {years.map((provider) => {
                            return (
                                <MenuItem key={provider} value={provider}>
                                    {provider}
                                </MenuItem>
                            )
                        })}
                    </TextField>
                    <TextField
                        id="outlined-select-currency"
                        select
                        size="small"
                        label="Loại"
                        value={type}
                        onChange={(event) => {
                            setType(event.target.value)
                        }}
                        // sx={{ mr: 2 }}
                        >
                        {/* <MenuItem value={-1}>Tất cả</MenuItem> */}
                        <MenuItem value={1}>Sản phẩm bán chạy</MenuItem>
                        <MenuItem value={2}>Sản phẩm không bán chạy</MenuItem>
                    </TextField>
                </Box>
            </Box>
            <DataTable columns={columns} rows={rows} />
        </>
    )
}

export default ProductSale
