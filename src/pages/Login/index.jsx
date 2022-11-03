import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import Grow from '@mui/material/Grow'
import { Container } from '@mui/system'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [rememberMe, setRememberMe] = useState(false)
  return (
    <Grow in={true}>
      <Container>
        <Paper
          sx={{
            width: '70vw',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}>
          <Grid container>
            <Grid item xs={6}>
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>LOGO</Box>
                  <Box>
                    Bạn không có tài khoản?{' '}
                    <Typography component={Link} to="/registor">
                      Đăng ký
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ textAlign: 'center', mt: 8, mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    ĐĂNG NHẬP
                  </Typography>
                </Box>
                <Box sx={{ maxWidth: '450px', margin: '0 auto' }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      label="Password"
                      variant="outlined"
                      size="small"
                      fullWidth
                      type="password"
                    />
                  </Box>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <FormControlLabel
                      label="Lưu đăng nhập"
                      checked={rememberMe}
                      control={
                        <Checkbox onChange={(event) => setRememberMe(event.target.checked)} />
                      }
                    />
                    <Typography component={Link} to="/admin">
                      Quên mật khẩu?
                    </Typography>
                  </Box>
                  <Box>
                    <Button variant="contained" fullWidth sx={{mt:2}}>
                      Đăng nhập
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <img src="https://static01.nyt.com/images/2016/09/28/us/28xp-pepefrog/28xp-pepefrog-superJumbo.jpg" alt="login image" width="100%" height="100%"/>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Grow>
  )
}
