import { Paper } from '@mui/material'
import Grow from '@mui/material/Grow'
import { Container } from '@mui/system'

export default function Login() {
  return (
    <Grow in={true}>
     <Container>
       <Paper>
          <h1>Login page</h1>
          <p>this is login page</p>
       </Paper>
     </Container>
    </Grow>
  )
}
