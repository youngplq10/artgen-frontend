"use client"

import { Button, Typography } from '@mui/material'
import React from 'react'
import { logout } from '../scripts/server'

const LogoutSection = () => {
    const handleLogout = async () => {
        await logout();
        window.location.href = "/";
    }

    return (
        <div className='container-lg my-5'>
            <div className="row justify-content-center">
                <div className="col-10 text-center">
                    <Typography variant='h3' className='my-2'>Are you sure you want to log out?</Typography>
                    <Button variant='contained' className='my-2' onClick={handleLogout}>Yes, log out</Button>
                </div>
            </div>
        </div>
    )
}

export default LogoutSection
