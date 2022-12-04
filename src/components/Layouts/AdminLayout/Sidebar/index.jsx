import useAuth from '@/hooks/useAuth'
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
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ConfirmModal from '../../../Common/Modal/ConfirmModal'

function Sidebar() {
    const user = JSON.parse(localStorage.getItem('fbm-user')) || []
    let navigate = useNavigate()
    const { auth, setAuth } = useAuth()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false)
    const [open, setOpen] = useState(false)
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index)
    }
    const handleClick = () => {
        setOpen(!open)
    }
    const location = useLocation()
    const items = [
        { name: 'Danh mục', href: '/manager/admin', path: '/manager/admin', allow: ['MANAGER'] },
        {
            name: 'Sản phẩm',
            href: '/manager/admin/products',
            path: '/products',
            allow: ['MANAGER', 'SELLER']
        },
        {
            name: 'Hóa đơn',
            href: '/manager/admin/receipts',
            path: '/receipts',
            allow: ['MANAGER', 'SELLER']
        },
        {
            name: 'Chấm công',
            href: '/manager/admin/timekeeping',
            path: '/timekeeping',
            allow: ['MANAGER']
        },
        {
            name: 'Bảng lương',
            href: '/manager/admin/payrolls',
            path: '/payrolls',
            allow: ['MANAGER']
        },
        {
            name: 'Đơn hàng',
            href: '/manager/admin/orders',
            path: '/orders',
            allow: ['MANAGER', 'SELLER']
        },
        {
            name: 'Thông Tin Khách Hàng',
            href: '/manager/admin/dataCustomer',
            path: '/dataCustomer',
            allow: ['MANAGER', 'SELLER']
        },
        {
            name: 'Quản lý phụ cấp',
            href: '/manager/admin/manager/allowance',
            path: '/allowance',
            allow: ['MANAGER']
        },
        {
            name: 'Quản lý thưởng',
            href: '/manager/admin/manager/bonus',
            path: '/bonus',
            allow: ['MANAGER']
        },
        {
            name: 'Nhân Viên',
            href: '/manager/admin/contracts',
            path: '/contracts',
            allow: ['MANAGER']
        },
        {
            name: 'Thống kê',
            href: '/manager/admin/statisticals',
            path: '/statisticals',
            allow: ['MANAGER']
        },
        {
            name: 'Nhà cung cấp',
            href: '/manager/admin/suppliers',
            path: '/suppliers',
            allow: ['MANAGER']
        }
    ]
    return (
        <Box sx={{ position: 'sticky', top: '0px' }}>
            <ConfirmModal
                title="Đăng xuất"
                content="Bạn muốn đăng xuất?"
                isOpen={isOpenConfirmDialog}
                handleClose={() => setIsOpenConfirmDialog(false)}
                handleConfirm={() => {
                    localStorage.removeItem('fbm-user')
                    navigate('/manager')
                    setAuth(null)
                }}
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
                                        primary={user.username}
                                        secondary={user.name}
                                    />
                                </ListItem>
                            </Box>
                            <Box sx={{ overflow: 'auto', height: '75vh' }}>
                                <Divider />
                                {items.map((item, index) =>
                                    item.name == 'Thống kê' ? (
                                        <Box key={index}>
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
                                                        to="/manager/admin/statisticals/income"
                                                        selected={selectedIndex === 91}
                                                        onClick={(event) =>
                                                            handleListItemClick(event, 91)
                                                        }>
                                                        <ListItemText
                                                            sx={{
                                                                '& .MuiTypography-root': {
                                                                    fontWeight: '500'
                                                                }
                                                            }}>
                                                            Doanh thu và doanh số
                                                        </ListItemText>
                                                    </ListItem>
                                                    <ListItem
                                                        button
                                                        sx={{ pl: 4 }}
                                                        component={Link}
                                                        to="/manager/admin/statisticals/product"
                                                        selected={selectedIndex === 92}
                                                        onClick={(event) =>
                                                            handleListItemClick(event, 92)
                                                        }>
                                                        <ListItemText
                                                            sx={{
                                                                '& .MuiTypography-root': {
                                                                    fontWeight: '500'
                                                                }
                                                            }}>
                                                            Sản phẩm
                                                        </ListItemText>
                                                    </ListItem>
                                                </List>
                                            </Collapse>
                                        </Box>
                                    ) : (
                                        <ListItem
                                            key={index}
                                            sx={{
                                                p: 0,
                                                ...(item.allow.find((i) => i.includes(auth.roles))
                                                    ? null
                                                    : { display: 'none' })
                                            }}
                                            selected={new RegExp(item.path).test(
                                                location.pathname.slice(6) || location.pathname
                                            )}>
                                            <ListItemButton
                                                sx={{ py: 2 }}
                                                component={Link}
                                                to={item.href}>
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
