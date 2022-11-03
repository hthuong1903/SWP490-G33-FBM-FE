import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import BarChartCommon from './Components/BarChartCommon'
import CommonCard from './Components/CommonCard'
import LineChartCommon from './Components/LineChartCommon'

function Statistical() {
    return (
        <Box>
            <Typography variant="h3">Thống kê</Typography>
            <Box sx={{ display: 'flex', mt: 2, mb: 2 }}>
                <CommonCard title="Tổng doanh số" />
                <CommonCard title="Tổng doanh thu" />
            </Box>
            <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
                <Grid item xs={6}>
                    <BarChartCommon title="Doanh thu và tổng doanh thu" />
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
                <Grid item xs={6}>
                    <LineChartCommon title="Doanh thu" />
                </Grid>
                <Grid item xs={6}>
                    <LineChartCommon title="Doanh số" />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Statistical
