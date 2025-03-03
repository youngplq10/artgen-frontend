import { Link, Typography } from '@mui/material'
import React from 'react'

const Logo = () => {
    return (
        <Link href='/' className='text-decoration-none'><Typography variant='h4' color='textPrimary'>ArtGen</Typography></Link>
    )
}

export default Logo
