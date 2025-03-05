import { Stack, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Navigation = () => {
    return (
        <Stack direction="row" spacing={2}>
            <Link href='/sign-in' className='text-decoration-none'><Typography variant='h4' color='textPrimary'>Sign in</Typography></Link>
        </Stack>
    )
}

export default Navigation
