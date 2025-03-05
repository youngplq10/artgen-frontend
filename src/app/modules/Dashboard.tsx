"use client"

import { Button } from '@mui/material'
import React from 'react'
import ArtCard from '../components/ArtCard'

const Dashboard = () => {
    return (
        <div className='container-lg my-5'>
            <div className="row">
                <div className="col-auto">
                    <Button variant='contained'>Create art</Button>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 my-3">
                    <ArtCard />
                </div>

                <div className="col-12 col-md-6 col-lg-4 col-xl-3 my-3">
                    <ArtCard />
                </div>

                <div className="col-12 col-md-6 col-lg-4 col-xl-3 my-3">
                    <ArtCard />
                </div>

                <div className="col-12 col-md-6 col-lg-4 col-xl-3 my-3">
                    <ArtCard />
                </div>

                <div className="col-12 col-md-6 col-lg-4 col-xl-3 my-3">
                    <ArtCard />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
