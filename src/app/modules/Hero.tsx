import { Button, Stack, Typography } from '@mui/material'
import React from 'react'

const Hero = () => {
    return (
        <div className='container-lg my-5'>
            <div className="row justify-content-center my-2">
                <div className="col-12 col-md-8 col-xl-6 text-center">
                    <Typography variant='h2'>
                        Turn Your Imagination into Stunning AI-Generated Art!
                    </Typography>
                </div>
            </div>
            
            <div className="row justify-content-center my-2">
                <div className="col-12 col-md-8 col-xl-6 text-center">
                    <Typography variant='body1'>Describe your vision in a prompt, choose your style—Anime, Sci-Fi, Fantasy, and more—and let AI bring it to life. Create an account now and start generating! 🚀</Typography>
                </div>
            </div>

            <div className="row justify-content-center my-3">
                <div className="col-auto">
                    <Stack direction="row" spacing={2}>
                        <Button variant='contained' href='/create-account'>Create account</Button>
                        <Button variant='outlined' href='/log-in'>Log in</Button>
                    </Stack>
                </div>
            </div>
        </div>
    )
}

export default Hero
