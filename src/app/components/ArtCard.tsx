"use client"

import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { art } from '../scripts/interfaces'
import Link from 'next/link'

const ArtCard = ( { artData } : { artData: art } ) => {
    return (
        <Link href={"/dashboard/art/" + artData.linkTo} className='text-decoration-none'>
            <Card sx={{ maxHeight: 350 + "px", height: 350 + "px" }}>
                <CardMedia
                    sx={{ height: 250 }}
                    image={ artData.link }
                />
                <CardContent>
                    <Typography variant='body1'>
                        { artData.prompt }
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    )
}

export default ArtCard
