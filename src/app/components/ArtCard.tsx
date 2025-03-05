"use client"

import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const ArtCard = () => {
    return (
        <Card>
            <CardMedia
                sx={{ height: 240 }}
                image='https://images.unsplash.com/photo-1741087562365-d0bf6e6fd7ef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            />
            <CardContent>
                <Typography variant='body1'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ArtCard
