"use client"

import { Alert, Typography } from '@mui/material'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { addCredits } from '../scripts/apicalls';

const SuccessPaymentPage = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const amount = searchParams.get("amount");

    const [hasFetched, setHasFetched] = useState(false);

    console.log(sessionId, amount)

    useEffect(() => {
        const fetchAddCredits = async () => {
            if (typeof amount === "string" && typeof sessionId === "string" && !hasFetched) {
                setHasFetched(true);
                await addCredits(parseFloat(amount), sessionId);
            }
        }
        fetchAddCredits();
    }, []);

    return (
        <div className='container-lg my-3'>
            <Typography variant='h4'>Credits added to your balance!</Typography>
        </div>
    )
}

export default SuccessPaymentPage
