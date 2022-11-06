import useAuth from '@/hooks/useAuth'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const sidebarWidth = 250
function AdminLayout() {
    const { auth } = useAuth()
    return (
        auth && (
            <div>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ minWidth: `${sidebarWidth}px`, position: 'relative' }}>
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

export default AdminLayout
