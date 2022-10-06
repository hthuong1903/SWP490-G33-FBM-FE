import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Typography variant="h1">{count}</Typography>
      <Typography sx={{ fontWeight: 'bold' }}>{count}</Typography>
      <Button variant="contained" color="primary" onClick={() => setCount((prev) => prev + 1)}>
        Click
      </Button>
      <Button variant="contained" color="primary" onClick={() => toast.success("Wow so easy !")}>
        show toast
      </Button>
    </div>
  )
}

export default App
