import { Paper } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import clsx from 'clsx'
import { useState } from 'react'
import CustomNoRowsOverlay from './CustomNoRowsOverLay'

function DataTable({ columns, rows }) {
    const [pageSize, setPageSize] = useState(15)

    return (
        <Paper style={{ display: 'flex', height: '85%' }}>
            <div style={{ flexGrow: 1 }}>
                <DataGrid
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: 'rgba(230, 134, 86, 0.3)'
                        },
                        '& .MuiDataGrid-toolbarContainer': {
                            backgroundColor: 'rgba(230, 134, 86, 0.3)'
                        },
                        'button.MuiButton-sizeSmall': { display: 'none !important' }
                    }}
                    className={clsx('table')}
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    // checkboxSelection
                    disableSelectionOnClick={true}
                    rows={rows}
                    columns={columns}
                    // pageSize={pageSize}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[15, 30, 50]}
                    components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: CustomNoRowsOverlay
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
    )
}

export default DataTable
