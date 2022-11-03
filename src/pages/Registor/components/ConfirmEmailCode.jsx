import { Button, Paper, Slide, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function ConfirmEmailCode() {
    const [confirmCodeValue, setConfirmCodeValue] = useState('')
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Slide
                direction="left"
                in={true}
                mountOnEnter
                unmountOnExit
                easing={{
                    enter: 'ease-in-out',
                    exit: 'ease-out'
                }}>
                <div>
                    <Paper
                        sx={{
                            p: 3,
                            width: '500px'
                        }}>
                        <h2>Nhập mã xác minh</h2>

                        <Typography variant="body2" mt={1}>
                            Một mã xác minh đã được gửi vào email của bạn, vui lòng kiểm tra email
                            để lấy mã
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            sx={{ mt: 2 }}
                            value={confirmCodeValue}
                            onChange={(event) => setConfirmCodeValue(event.target.value)}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button
                                component={Link}
                                to="/registor"
                                disabled={confirmCodeValue.length < 6}
                                variant="contained">
                                Xác nhận
                            </Button>
                        </Box>
                    </Paper>
                </div>
            </Slide>
        </Box>
    )
}

export default ConfirmEmailCode
