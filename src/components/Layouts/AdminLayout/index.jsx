import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const sidebarWidth = 250
function AdminLayout() {
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: `${sidebarWidth}px`, position:'relative' }}>
          <Sidebar />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: `calc(100%-${sidebarWidth}px)`,
            py: 2,
            pr: 2,
            overflow: 'auto'
          }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  )
}

export default AdminLayout
