"use client"

import { Alert, Button } from '@mui/material'
import React, { useState } from 'react'
import { validateNewUser } from '../scripts/validation';

const CreateAccountForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [errorState, setErrorState] = useState(true);

    const handleSubmit = () => {
        const res = validateNewUser(username, email, password, repassword);

        if (res === "Success") {
            setErrorState(true);
            //process creating user
        } else {
            setErrorMessage(res);
            setErrorState(false);
        }
    }

    return (
        <form>
            <label htmlFor='username' className='form-label'>Username</label>
            <input type='text' className='form-control' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />

            <label htmlFor='email' className='form-label'>E-mail</label>
            <input type='text' className='form-control' id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor='password' className='form-label'>Password</label>
            <input type='password' className='form-control' id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <label htmlFor='repassword' className='form-label'>Confirm password</label>
            <input type='password' className='form-control' id="repassword" value={repassword} onChange={(e) => setRepassword(e.target.value)} />

            <Button variant='contained' className='my-2' onClick={handleSubmit}>Create account</Button>

            <Alert severity='error' hidden={errorState} className='my-2'> {errorMessage} </Alert>
        </form>
    )
}

export default CreateAccountForm
