"use client"

import React, { useState } from 'react'
import { validateExistingUser } from '../scripts/validation';
import { loginUser } from '../scripts/apicalls';
import { Alert, Button } from '@mui/material';

const SignInForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [errorState, setErrorState] = useState(true);

    const handleSubmit = async () => {
        const res = validateExistingUser(username, password);

        if (res === "Success") {
            const res = await loginUser(username, password);

            if (res !== "Signed in.") {
                setErrorMessage(res);
                setErrorState(false);
            } else {
                window.location.href = "/dashboard";
            }
        } else {
            setErrorMessage(res);
            setErrorState(false);
        }
    }

    return (
        <form>
            <label htmlFor='username' className='form-label'>Username</label>
            <input type='text' className='form-control' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />

            <label htmlFor='password' className='form-label'>Password</label>
            <input type='password' className='form-control' id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <Button variant='contained' className='my-2' onClick={handleSubmit}>Log in</Button>

            <Alert severity='error' hidden={errorState} className='my-2'> {errorMessage} </Alert>
        </form>
    )
}

export default SignInForm
