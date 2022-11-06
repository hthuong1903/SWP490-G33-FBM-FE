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
        { name: 'Tai Khoan Nhan Vien Ban Hang', href: '/administrator' },
        { name: 'Tai Khoan Nhan Vien Quan Li', href: '/administrator/manager' },
        { name: 'Tai Khoan Nhan Vien Sua Chua', href: '/administrator/fixer' },
        { name: 'Tai Khoan Khach Hang', href: '/administrator/customer' },
        { name: 'Tao Tai Khoan', href: '/administrator/createAccount' },
    ]
    return (
        <div>
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
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>T</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        '& .MuiListItemText-secondary': { fontSize: '0.7rem' },
                                        '& .MuiTypography-root': { fontWeight: '500' }, p: 1.5
                                    }}
                                    primary="Administrator"
                                    secondary="admin@gmail.com"
                                />
                            </ListItem>
                            <Divider />
                            {items.map((item, index) =>
                                item.name == 'Quản lý' ? (
                                    <Box key={item}>
                                        <ListItem button onClick={handleClick}>
                                            <ListItemText
                                                sx={{
                                                    '& .MuiTypography-root': { fontWeight: '500' }
                                                }}>
                                                {item.name}
                                            </ListItemText>
                                            {open ? <ExpandLess /> : <ExpandMore />}
                                        </ListItem>
                                    </Box>
                                ) : (
                                    <ListItem key={index} sx={{ p: 1.5 }}>
                                        <ListItemButton
                                            sx={{ py: 2 }}
                                            component={Link}
                                            to={item.href}
                                            selected={selectedIndex === index}
                                            onClick={(event) => handleListItemClick(event, index)}>
                                            <ListItemText
                                                sx={{
                                                    '& .MuiTypography-root': { fontWeight: '500' }
                                                }}>
                                                {item.name}
                                            </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            )}
                        </Box>
                        <Box>
                            <Divider />
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => setIsOpenConfirmDialog(true)}>
                                    <ListItemIcon>
                                        <LogoutRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        sx={{ '& .MuiTypography-root': { fontWeight: '500' }, p: 2 }}>
                                        Đăng xuất
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </Box>
                    </List>
                </Paper>
            </Box>
        </div>
    )
}

export default Sidebar
