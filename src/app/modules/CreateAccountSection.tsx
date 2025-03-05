import React from 'react'
import CreateAccountForm from '../components/CreateAccountForm'
import { Link, Typography } from '@mui/material'

const CreateAccountSection = () => {
    return (
        <div className='container-lg my-5'>
            <div className="row justify-content-center">
                <div className="col-10 col-md-6">
                    <CreateAccountForm />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-10 col-md-6">
                    <Typography variant='body1'>You already have an account? <Link href='/sign-in'>Sign in now!</Link></Typography>
                </div>
            </div>
        </div>
    )
}

export default CreateAccountSection
