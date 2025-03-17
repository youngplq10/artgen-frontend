import React from 'react'
import SignInForm from '../components/SignInForm'
import { Typography } from '@mui/material'
import Link from 'next/link'

const SignInSection = () => {
    return (
        <div className='container-lg my-3'>
            <div className="row justify-content-center">
                <div className="col-10 col-md-6">
                    <SignInForm />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-10 col-md-6">
                    <Typography variant='body1'>You dont have an account? <Link href='/create-account'>Create one now!</Link></Typography>
                </div>
            </div>
        </div>
    )
}

export default SignInSection
