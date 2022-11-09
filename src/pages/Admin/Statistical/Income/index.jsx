import StatisticAPI from '@/api/StatisticAPI'
import { Box, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import BarChartCommon from './Components/BarChartCommon'
import CommonCard from './Components/CommonCard'
import LineChartCommon from './Components/LineChartCommon'

function Income() {
    const [totalProduct, setTotalProduct] = useState()
    const [totalTurnOver, setTotalTurnOver] = useState()
    const [grapTurnOver, setGrapTurnOver] = useState()
    const [grapNumberProductEmployee, setGrapNumberProductEmployee] = useState()
    const [grapTurnOverEmployee, setGrapTurnOverEmployee] = useState()

    const getTotalProducts = async (year) => {
        try {
            const response = await StatisticAPI.getTotalProducts(year)
            console.log('getTotalProducts', response.data)
            setTotalProduct(response.data)
        } catch (error) {
            console.warn('Failed to get total products', error)
        }
    }

    const getTotalTurnOvers = async (year) => {
        try {
            const response = await StatisticAPI.getTotalTurnOvers(year)
            console.log('getTotalTurnOvers', response.data)
            setTotalTurnOver(response.data)
        } catch (error) {
            console.warn('Failed to get total Turn Overs', error)
        }
    }

    const getInformationGraphTurnOver = async (year) => {
        try {
            const response = await StatisticAPI.getInformationGraphTurnOver(year)
            console.log('getInformationGraphTurnOver', response.data)
            setGrapTurnOver(response.data)
        } catch (error) {
            console.warn('Failed to get Information Graph TurnOver', error)
        }
    }
    const getInformationGraphNumberProductByEmployee = async (year) => {
        try {
            const response = await StatisticAPI.getInformationGraphNumberProductByEmployee(year)
            console.log('getInformationGraphNumberProductByEmployee', response.data[0])
            setGrapNumberProductEmployee(response.data[0])
        } catch (error) {
            console.warn('Failed to get Information Graph Number Product By Employee', error)
        }
    }
    const getInformationGraphTurnOverByEmployee = async (year) => {
        try {
            const response = await StatisticAPI.getInformationGraphTurnOverByEmployee(year)
            console.log('getInformationGraphTurnOverByEmployee', response.data[0])
            setGrapTurnOverEmployee(response.data[0])
        } catch (error) {
            console.warn('Failed to get Information Graph Turn Over By Employee', error)
        }
    }

    useEffect(() => {
        getTotalProducts(2022)
        getTotalTurnOvers(2022)
        getInformationGraphNumberProductByEmployee(2022)
        getInformationGraphTurnOver(2022)
        getInformationGraphTurnOverByEmployee(2022)
    }, [])

    return (
        <Box>
            <Typography variant="h3">Thống kê</Typography>
            <Box sx={{ display: 'flex', mt: 2, mb: 2 }}>
                {totalProduct && (
                    <CommonCard
                        title="Tổng doanh số"
                        data={totalProduct}
                        onChangeYear={(year) => getTotalProducts(year)}
                    />
                )}
                {totalTurnOver && (
                    <CommonCard
                        title="Tổng doanh thu"
                        data={new Intl.NumberFormat('en').format(totalTurnOver)}
                        onChangeYear={(year) => getTotalTurnOvers(year)}
                    />
                )}
            </Box>
            <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
                <Grid item xs={6}>
                    {grapTurnOver && (
                        <BarChartCommon
                            title="Doanh thu và tổng doanh thu"
                            data={grapTurnOver}
                            onChangeYear={(year) => getInformationGraphTurnOver(year)}
                        />
                    )}
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
                <Grid item xs={6}>
                    {grapTurnOverEmployee && (
                        <LineChartCommon
                            title="Doanh thu"
                            data={grapTurnOverEmployee.dataStatic}
                            employee={grapTurnOverEmployee.nameEmployees}
                            onChangeYear={(year) => getInformationGraphTurnOverByEmployee(year)}
                        />
                    )}
                </Grid>
                <Grid item xs={6}>
                    {grapNumberProductEmployee && (
                        <LineChartCommon
                            title="Doanh số"
                            data={grapNumberProductEmployee.dataStatic}
                            employee={grapNumberProductEmployee.nameEmployees}
                            onChangeYear={(year) =>
                                getInformationGraphNumberProductByEmployee(year)
                            }
                        />
                    )}
                </Grid>
            </Grid>
        </Box>
    )
}

export default Income
