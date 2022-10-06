import { useState } from 'react';
import './App.css';
import { Button, ThemeProvider, Typography } from '@mui/material';
import { theme } from './assets/theme';

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Typography variant="h1">{count}</Typography>
        <Typography sx={{ fontWeight: 'bold' }}>{count}</Typography>
        <Button variant="outlined" onClick={() => setCount((prev) => prev + 1)}>
          Click
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
