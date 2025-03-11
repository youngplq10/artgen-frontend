"use client"

import React, { useEffect, useState } from 'react'
import { user } from '../scripts/interfaces'
import { getUserData } from '../scripts/apicalls';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';

const CreditsSection = () => {
    const [userData, setUserData] = useState<user>();
    const [loading, setLoading] = useState(true);

    const [errorMessage, setErrorMessage] = useState("");
    const [errorState, setErrorState] = useState(true);

    const [amount, setAmount] = useState(5);

    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const res = await getUserData();

            if (typeof res === "string") {
                setErrorMessage(res);
                setErrorState(false);
            } else {
                setErrorState(true);
                setUserData(res);
            }
        }
        fetchUserData();
    }, []);

    const changeAmount = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (typeof parseFloat(e.target.value) !== "number") {
            setAmount(0);
        } else {
            setAmount(parseFloat(e.target.value));
        }
    }

    return (
        <section className='container-lg my-3'>
            <div className="row">
                <div className="col-12">
                    <Typography variant='h4' className='my-2'>You have: { userData?.credits } credits</Typography>
                    <Button variant='contained' className='my-2' onClick={() => setDialogOpen(true)}>Buy more</Button>

                    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                        <DialogTitle><Typography variant='h4'>Buy more credits</Typography></DialogTitle>
                        <DialogContent>
                            <DialogContentText><Typography variant='body1'>Enter amount of credits you would like to buy</Typography></DialogContentText>
                            <TextField variant='standard' type='number' value={amount} name='amount' label='amount' onChange={(e) => changeAmount(e)} />
                        </DialogContent>
                        <DialogActions>
                            <Button variant='contained'>Buy now</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </section>
    )
}

export default CreditsSection
