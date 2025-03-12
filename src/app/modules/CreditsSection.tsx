"use client"

import React, { useEffect, useState } from 'react'
import { user } from '../scripts/interfaces'
import { getUserData } from '../scripts/apicalls';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import { loadStripe } from "@stripe/stripe-js";

const CreditsSection = () => {
    //Stripe config
    if (process.env.NEXT_PUBLIC_PUBLISHABLE_STRIPE_KEY === undefined) {
        throw new Error("PUBLISHABLE_STRIPE_KEY is undefined");
    }

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_STRIPE_KEY);

    const [userData, setUserData] = useState<user>();
    const [loading, setLoading] = useState(true);

    const [errorMessage, setErrorMessage] = useState("");
    const [errorState, setErrorState] = useState(true);

    const [amount, setAmount] = useState(5);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogPaymentOpen, setDialogPaymentOpen] = useState(false);

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

    const handleBuy = async () => {
        if (!amount || amount < 10) {
            setErrorMessage("Amount of credits can't be less than 10 credits.");
            setErrorState(false);
            return;
        }
        setErrorState(true);
        setDialogOpen(false);
        setDialogPaymentOpen(true);
    }

    const handleRedirectToPayment = async () => {
        const res = await fetch("/api/checkout", { method: "POST", body: JSON.stringify({ amount: amount }) });
        const { url } = await res.json();
        if (url) {
            window.location.href = url;
        } else {
            const { error } = await res.json();
            setErrorMessage(error);
            setErrorState(false);
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
                            <Alert severity='error' className='my-2' hidden={errorState}>{errorMessage}</Alert>
                        </DialogContent>
                        <DialogActions>
                            <Button variant='contained' onClick={handleBuy}>Buy now</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={dialogPaymentOpen} onClose={() => setDialogPaymentOpen(false)}>
                        <DialogTitle><Typography variant='h4'>Pay {amount / 10}$</Typography></DialogTitle>
                        <DialogContent>
                            <Typography variant='body1'>Click PAY CREDITS button to process payment.</Typography>
                            <Alert severity='error' hidden={errorState}>{errorMessage}</Alert>
                        </DialogContent>
                        <DialogActions>
                            <Button variant='outlined' onClick={handleRedirectToPayment}>Pay credits</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </section>
    )
}

export default CreditsSection
