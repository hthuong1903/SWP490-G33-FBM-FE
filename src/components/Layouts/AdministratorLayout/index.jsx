import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import useAuth from '@/hooks/useAuth'

const sidebarWidth = 240
function AdministratorLayout() {
  const { auth } = useAuth()
  return (
    auth && (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: `calc(100%-${sidebarWidth}px)` }}>
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
  )
}

export default AdministratorLayout
