"use client"

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { art } from '../scripts/interfaces';
import { getArtData } from '../scripts/apicalls';
import { Alert, Box, Button, Card, CardMedia, Typography } from '@mui/material';
import Loading from '../components/Loading';

const ArtBoard = () => {
    const params = useParams();
    const { linkTo } = params;

    const [art, setArt] = useState<art>();

    const [errorMessage, setErrorMessage] = useState("");
    const [errorState, setErrorState] = useState(true);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArtData = async () => {
            if (typeof linkTo === "string") {
                const res = await getArtData(linkTo);

                if (typeof res === "string") {
                    setLoading(false);
                    setErrorMessage(res);
                    setErrorState(false);
                } else {
                    setArt(res);
                    setLoading(false);
                }
            }
        }
        fetchArtData();
    }, [linkTo])
    
    return (
        <div className='container-lg my-5'>
            <div className="row my-2">
                { loading ? (
                    <div className="col-12">
                        <Box sx={{ height: 300 }}>
                            <Loading />
                        </Box>
                    </div>
                ) : (
                    <>
                        <div className="col-12 col-sm-10 col-md-8 col-lg-6 ">
                            <Card sx={{ maxHeight: 550 + "px", height: 550 + "px" }}>
                                <CardMedia
                                    sx={{ height: 100 + "%" }}
                                    image={ art?.link }
                                />
                            </Card>
                        </div>

                        <div className="col-12 col-md-4 col-lg-6 my-2">
                        <Typography variant='h4' className='my-2'>{ art?.prompt }</Typography>
                        <Typography variant='h4' className='my-2'>{ "Cost: " + art?.cost + " credits" }</Typography>
                        <Button href={art?.link} className='my-2' variant='contained'>Download</Button>
                        </div>
                    </>
                ) }
            </div>

            <div className="row my-2">
                <div className="col-6">
                    <Alert severity='error' hidden={errorState}>
                        { errorMessage }
                    </Alert>
                </div>
            </div>
        </div>
    )
}

export default ArtBoard
