import { ExpandLess, ExpandMore } from '@mui/icons-material'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import {
    Avatar,
    Box,
    Collapse,
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
    const [open, setOpen] = useState(false)
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index)
    }
    const handleClick = () => {
        setOpen(!open)
    }
    const items = [
        { name: 'Danh mục', href: '/admin' },
        { name: 'Sản phẩm', href: '/admin/products' },
        { name: 'Hóa đơn', href: '/admin/receipts' },
        { name: 'Chấm công', href: '/admin/timekeeping' },
        { name: 'Bảng lương', href: '/admin/payrolls' },
        { name: 'Đơn hàng', href: '/admin/orders' },
        { name: 'Quản lý', href: '/admin/manager' },
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
                                {items.map((item, index) =>
                                    item.name == 'Quản lý' ? (
                                        <Box key={item}>
                                            <ListItem button onClick={handleClick}>
                                                <ListItemText
                                                    sx={{
                                                        '& .MuiTypography-root': {
                                                            fontWeight: '500'
                                                        }
                                                    }}>
                                                    {item.name}
                                                </ListItemText>
                                                {open ? <ExpandLess /> : <ExpandMore />}
                                            </ListItem>
                                            <Collapse in={open} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    <ListItem
                                                        button
                                                        sx={{ pl: 4 }}
                                                        component={Link}
                                                        to="/admin/manager/allowance"
                                                        selected={selectedIndex === 41}
                                                        onClick={(event) =>
                                                            handleListItemClick(event, 41)
                                                        }>
                                                        <ListItemText
                                                            sx={{
                                                                '& .MuiTypography-root': {
                                                                    fontWeight: '500'
                                                                }
                                                            }}>
                                                            Phụ cấp
                                                        </ListItemText>
                                                    </ListItem>
                                                    <ListItem
                                                        button
                                                        sx={{ pl: 4 }}
                                                        component={Link}
                                                        to="/admin/manager/bonus"
                                                        selected={selectedIndex === 42}
                                                        onClick={(event) =>
                                                            handleListItemClick(event, 42)
                                                        }>
                                                        <ListItemText
                                                            sx={{
                                                                '& .MuiTypography-root': {
                                                                    fontWeight: '500'
                                                                }
                                                            }}>
                                                            Thưởng
                                                        </ListItemText>
                                                    </ListItem>
                                                </List>
                                            </Collapse>
                                        </Box>
                                    ) : (
                                        <ListItem key={index} sx={{ p: 0 }}>
                                            <ListItemButton
                                                sx={{ py: 2 }}
                                                component={Link}
                                                to={item.href}
                                                selected={selectedIndex === index}
                                                onClick={(event) =>
                                                    handleListItemClick(event, index)
                                                }>
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
                                    )
                                )}
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
