"use client"

import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArtCard from '../components/ArtCard'
import { user } from '../scripts/interfaces'
import { getUserData } from '../scripts/apicalls'
import Loading from '../components/Loading'

const Dashboard = () => {
    const [userData, setUserData] = useState<user>();
    
    const [errorState, setErrorState] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getUserData();

            if (typeof res === "string") {
                setErrorMessage(res);
                setErrorState(false);
                setLoading(false);
                console.log(res)
            } else {
                setUserData(res);
                setLoading(false);
            }
        }
        fetchUser();
    }, [])

    return (
        <div className='container-lg my-5'>
            <div className="row">
                <div className="col-auto">
                    <Button variant='contained' href='/dashboard/create-art'>Create art</Button>
                </div>
            </div>
            <div className="row my-2">
                
                { loading ? (
                    <Box sx={{ height: 200 }}>
                        <Loading />
                    </Box>
                ) : (
                    <>
                        { userData?.arts.map((art, index) => {
                            return (
                                <div className="col-12 col-md-6 col-lg-4 col-xl-3 my-3" key={index}>
                                    <ArtCard artData={art} />
                                </div>
                            )
                        }) }
                    </>
                ) }
            </div>
        </div>
    )
}

export default Dashboard
