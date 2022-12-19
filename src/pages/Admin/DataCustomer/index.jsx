import DataCustomerApi from "@/api/DataCustomerApi";
import DataTable from "@/components/Common/DataTable";
import ConfirmModal from "@/components/Common/Modal/ConfirmModal";
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import providerApi from "@/api/providerApi";
import ModelAddCustomer from "./Components/ModelAddCustomer";
import ModelUpdateCustomer from "./Components/ModelUpdateCustomer";

export default function DataCustomer() {
    const [isUpdated, setIsUpdated] = useState(false)
    const [isEdit, setIsEdit] = useState(true)
    const [selectedRow, setSelectedRow] = useState(null)
    const [listDataCustomer, setListDataCustomer] = useState([])
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)

    const handleDelete = async () => {
        try {
            await DataCustomerApi.deleteAccount(selectedRow?.row.id)
            toast.success('Xóa Thành Công !')
            setIsOpenConfirmModal(false)
            setIsUpdated(true)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        const getAllDataCustomer = async () => {
            try {
                const response = await DataCustomerApi.getAllDataCustomer()
                setListDataCustomer(response.data.map(e => { return {
                    ...e, name: (e.firstName || '') + ' ' + (e.middleName || '') + ' ' + (e.lastName || '')
                    // updateDate: (e.lastModifiedDate.split('T')[0])
                }}))
                console.log(response)
            } catch(error) {
                console.log('fail when getAllDataCustomer', error)
            }
        }
        setIsUpdated(false)
        getAllDataCustomer()
    }, [isUpdated])

    const columns = [
        {
            field: 'name',
            headerName: 'TÊN KHÁCH HÀNG',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Typography sx={{ fontWeight: 'bold' }}>{
                    params.row.name }
                    </Typography>
                )
            }
        },
        {
            field: 'phone',
            headerName: 'SỐ ĐIỆN THOẠI',
            flex: 0.75
        },
        {
            field: 'email',
            headerName: 'EMAIL',
            headerAlign: 'center',
            flex: 1.25
        },
        {
            field: 'address',
            headerName: 'ĐỊA CHỈ',
            headerAlign: 'center',
            flex: 2,
            renderCell: (params) => {
                return (
                    <p>
                        {params.row.address}/{params.row.ward.name}/{params.row.district.name}/
                        {params.row.province.name}
                    </p>
                )
            }
        },
        {
            field: 'details',
            headerName: 'THÔNG TIN CHI TIẾT',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '80%' }}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setSelectedRow(params)
                                setIsEdit(false)
                                setIsOpenUpdateModal(true)
                            }}>
                            Xem
                        </Button>
                    </Box>
                )
            }
        },
        {
            field: 'action',
            headerName: 'TÁC VỤ',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setIsEdit(true)
                                setSelectedRow(params)
                                setIsOpenUpdateModal(true)
                                console.log(params)
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            sx={{m: 1}}
                            variant="contained"
                            onClick={() => {
                                setSelectedRow(params)
                                setIsEdit(false)
                                setIsOpenConfirmModal(true)
                                
                            }}
                        >
                            Xóa
                        </Button>
                    </>
                )
            }
        }
    ]
    return (
        <>  
            {isOpenAddModal && (
                <ModelAddCustomer 
                    isOpen={isOpenAddModal}
                    title={"Thêm  Thông Tin Khách Hàng"}
                    handleClose={() => setIsOpenAddModal(false)}
                    handleConfirm={() => setIsUpdated(true)}
                    isEdit={isEdit}
                />
            )}
            {isOpenUpdateModal && (
                <ModelUpdateCustomer
                    isOpen={isOpenUpdateModal}
                    title={'Cập Nhập Thông Tin Khách Hàng'}
                    handleClose={() => setIsOpenUpdateModal(false)}
                    handleConfirm={() => setIsUpdated(true)}
                    selectedData={selectedRow.row}
                    isEdit={isEdit}
                />
            )}
            <ConfirmModal
                isOpen={isOpenConfirmModal}
                title="Xác nhận Xóa"
                content={`Bạn có muốn xóa ${selectedRow?.row?.name}?`}
                handleClose={() => setIsOpenConfirmModal(false)}
                handleConfirm={() => handleDelete()}
            />
            <h2>Quản Lí Thông Tin Khách Hàng</h2>
            <Box sx={{ mb: 2, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                    variant="contained"
                    onClick={() => {
                        setIsOpenAddModal(true)
                    }}>
                    Thêm Thông Tin Khách Hàng 
                </Button>
            </Box>
            <DataTable columns={columns} rows={listDataCustomer}></DataTable>
        </>
    )
}