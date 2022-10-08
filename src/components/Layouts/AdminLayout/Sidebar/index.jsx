import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper
} from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }
  const items = [
    { name: 'Sản phẩm', href: '/admin' },
    { name: 'Hóa đơn', href: '/admin/receipts' },
    { name: 'Chấm công', href: '/' },
    { name: 'Bảng lương', href: '/' },
    { name: 'Hợp đồng', href: '/' },
    { name: 'Thống kê', href: '/' },
    { name: 'Nhà cung cấp', href: '/' },
    { name: 'Đăng xuất', href: '/' }
  ]
  return (
    <div>
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
                    sx={{ '& .Mui-selected': { backgroundColor: 'rgb(230 134 86)' } }}
                    component={Link}
                    to={item.href}
                    selected={selectedIndex === index}
                    onClick={(event) => handleListItemClick(event, index)}>
                    <ListItemText>{item.name}</ListItemText>
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Paper>
      </Box>
    </div>
  )
}

export default Sidebar
