import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import {
    Avatar,
    Box,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper
} from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ConfirmModal from '../../../Common/Modal/ConfirmModal'

function Sidebar() {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false)
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index)
    }

    const items = [
        { name: 'Danh mục', href: '/admin' },
        { name: 'Sản phẩm', href: '/admin/products' },
        { name: 'Hóa đơn', href: '/admin/receipts' },
        { name: 'Chấm công', href: '/admin/timekeeping' },
        { name: 'Bảng lương', href: '/admin/payrolls' },
        { name: 'Đơn hàng', href: '/admin/orders' },
        { name: 'Quản lý phụ cấp', href: '/admin/manager/allowance' },
        { name: 'Quản lý thưởng', href: '/admin/manager/bonus' },
        { name: 'Hợp đồng', href: '/admin/contracts' },
        { name: 'Thống kê', href: '/admin/statisticals' },
        { name: 'Nhà cung cấp', href: '/admin/suppliers' }
    ]
    return (
        <Box sx={{ position: 'sticky', top: '0px' }}>
            <ConfirmModal
                title="Đăng xuất"
                content="Bạn muốn đăng xuất?"
                isOpen={isOpenConfirmDialog}
                handleClose={() => setIsOpenConfirmDialog(false)}
                handleConfirm={() => toast.success('Đăng xuất thành công!')}
            />
            <Box sx={{ p: 2 }}>
                <Paper elevation={2} sx={{ height: '100%' }}>
                    <List
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '100%'
                        }}>
                        <Box>
                            <Box>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>T</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        sx={{
                                            '& .MuiListItemText-secondary': { fontSize: '0.7rem' },
                                            '& .MuiTypography-root': { fontWeight: '500' }
                                        }}
                                        primary="Nguyen Van A"
                                        secondary="abc@gmail.com"
                                    />
                                </ListItem>
                            </Box>
                            <Box sx={{ overflow: 'auto', height: '75vh' }}>
                                <Divider />
                                {items.map((item, index) => (
                                    <ListItem key={index} sx={{ p: 0 }}>
                                        <ListItemButton
                                            sx={{ py: 2 }}
                                            component={Link}
                                            to={item.href}
                                            selected={selectedIndex === index}
                                            onClick={(event) => handleListItemClick(event, index)}>
                                            <ListItemText
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontWeight: '500'
                                                    }
                                                }}>
                                                {item.name}
                                            </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </Box>
                        </Box>
                        <Box>
                            <Divider />
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => setIsOpenConfirmDialog(true)}>
                                    <ListItemIcon>
                                        <LogoutRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        sx={{ '& .MuiTypography-root': { fontWeight: '500' } }}>
                                        Đăng xuất
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </Box>
                    </List>
                </Paper>
            </Box>
        </Box>
    )
}

export default Sidebar
