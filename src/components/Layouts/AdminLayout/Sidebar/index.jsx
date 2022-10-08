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
import ConfirmModal from '../../../Common/Modal/ConfirmModal'

function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false)

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }
  const items = [
    { name: 'Sản phẩm', href: '/admin' },
    { name: 'Hóa đơn', href: '/admin/receipts' },
    { name: 'Chấm công', href: '/admin/timekeepings' },
    { name: 'Bảng lương', href: '/admin/payrolls' },
    { name: 'Hợp đồng', href: '/admin/contracts' },
    { name: 'Thống kê', href: '/admin/statisticals' },
    { name: 'Nhà cung cấp', href: '/admin/suppliers' }
  ]
  return (
    <div>
      <ConfirmModal
        title="Đăng xuất"
        content="Bạn muốn đăng xuất?"
        isOpen={isOpenConfirmDialog}
        handleClose={() => setIsOpenConfirmDialog(false)}
        handleConfirm={() => console.log('abc')}
      />
      <Box sx={{ p: 2, height: '100vh' }}>
        <Paper elevation={2} sx={{ height: '100%' }}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>T</Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{ '& .MuiListItemText-secondary': { fontSize: '0.7rem' } }}
                primary="Lê Anh Tuấn"
                secondary="tuanlahe141277@fpt.edu.vn"
              />
            </ListItem>
            <Divider />
            {items.map((item, index) => {
              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.href}
                    selected={selectedIndex === index}
                    onClick={(event) => handleListItemClick(event, index)}>
                    <ListItemText>{item.name}</ListItemText>
                  </ListItemButton>
                </ListItem>
              )
            })}
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={() => setIsOpenConfirmDialog(true)}>
                <ListItemIcon>
                  <LogoutRoundedIcon />
                </ListItemIcon>
                <ListItemText>Đăng xuất</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>
      </Box>
    </div>
  )
}

export default Sidebar
