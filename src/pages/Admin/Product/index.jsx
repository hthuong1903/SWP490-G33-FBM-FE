import { Button, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material'
import Grow from '@mui/material/Grow'
import { Box } from '@mui/system'
import {
  DataGrid,
  GridFooter,
  GridFooterContainer,
  gridPaginatedVisibleSortedGridRowIdsSelector,
  gridSortedRowIdsSelector,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  gridVisibleSortedRowIdsSelector,
  useGridApiContext
} from '@mui/x-data-grid'
import { useState } from 'react'
export default function Product() {
  const [currency, setCurrency] = useState(1)
  const handleChange = (event) => {
    setCurrency(event.target.value)
  }
  const columns = [{ field: 'username' }, { field: 'age' }]
  const rows = [
    {
      id: 1,
      username: '@MUI',
      age: 20
    }
  ]
  return (
    <>
      <h2>Product Page</h2>
      <Box sx={{ mb: 2, mt: 3, display:'flex', justifyContent:'space-between' }}>
        <Box>
          <TextField
            id="outlined-select-currency"
            select
            size="small"
            label="Nhà cung cấp"
            value={currency}
            onChange={handleChange}
            sx={{ mr: 2 }}>
            <MenuItem value={1}>Le Anh Tuan</MenuItem>
            <MenuItem value={2}>Twenty</MenuItem>
            <MenuItem value={3}>Thirty</MenuItem>
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            size="small"
            label="Category"
            value={currency}
            onChange={handleChange}>
            <MenuItem value={1}>Le Anh Tuan</MenuItem>
            <MenuItem value={2}>Twenty</MenuItem>
            <MenuItem value={3}>Thirty</MenuItem>
          </TextField>
        </Box>
        <Button variant="contained">Thêm sản phẩm</Button>
      </Box>

      <Paper style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            // checkboxSelection
            disableSelectionOnClick={true}
            rows={rows}
            columns={columns}
            // pageSize={pageSize}
            rowsPerPageOptions={[30, 50, 70]}
            components={{
              Toolbar: GridToolbar
            }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 }
              }
            }}
          />
        </div>
      </Paper>
    </>
  )
}
