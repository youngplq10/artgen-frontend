import { Box, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import Loading from './Loading'

const Navigation = ({ isAuth, isLoading } : { isAuth: boolean, isLoading: boolean }) => {
    return (
        <Stack direction="row" spacing={2}>
            { isLoading ? (
                <Box sx={{ height: 30, width: 200 }}>
                    <Loading />
                </Box>
            ) : (
                isAuth ? (
                    <>
                        <Link href='/dashboard' className='text-decoration-none'><Typography variant='h4' color='textPrimary'>Dashboard</Typography></Link>
                        <Link href='/log-out' className='text-decoration-none'><Typography variant='h4' color='textPrimary'>Logout</Typography></Link>
                    </>
                ) : (
                    <Link href='/sign-in' className='text-decoration-none'><Typography variant='h4' color='textPrimary'>Sign in</Typography></Link>
                )
            ) }
        </Stack>
    )
}

export default Navigation
