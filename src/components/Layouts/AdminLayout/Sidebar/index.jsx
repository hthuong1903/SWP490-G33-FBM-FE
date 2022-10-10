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
        handleConfirm={() => toast.success('Đăng xuất thành công!')}
      />
      <Box sx={{ p: 2, height: '100vh' }}>
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
                    '& .MuiTypography-root': { fontWeight: '500' }
                  }}
                  primary="Lê Anh Tuấn"
                  secondary="tuanlahe141277@fpt.edu.vn"
                />
              </ListItem>
              <Divider />
              {items.map((item, index) => {
                return (
                  <ListItem key={index} sx={{ p: 0 }}>
                    <ListItemButton
                      sx={{ py: 2 }}
                      component={Link}
                      to={item.href}
                      selected={selectedIndex === index}
                      onClick={(event) => handleListItemClick(event, index)}>
                      <ListItemText sx={{ '& .MuiTypography-root': { fontWeight: '500' } }}>
                        {item.name}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </Box>
            <Box>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton onClick={() => setIsOpenConfirmDialog(true)}>
                  <ListItemIcon>
                    <LogoutRoundedIcon />
                  </ListItemIcon>
                  <ListItemText sx={{ '& .MuiTypography-root': { fontWeight: '500' } }}>
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
