import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
export default function Loading() {
    return (
        <Box
            sx={{
                position: 'absolute',
                backgroundColor: 'rgba(255,255,255)',
                height: '100%',
                width: '100%',
                left: 0,
                top: 0
            }}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
                <CircularProgress size={50} />
            </Box>
        </Box>
    )
}
