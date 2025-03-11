"use client"

import React, { useEffect, useState } from 'react'
import Logo from '../components/Logo'
import Navigation from '../components/Navigation'
import { getIsAuthenticated } from '../scripts/server'

const Navbar = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchIsAuth = async () => {
            const isAuth = await getIsAuthenticated();
            setIsLogged(isAuth);
            setIsLoading(false);
        }
        fetchIsAuth();
    }, [])

    return (
        <div className='container-lg border-bottom'>
            <div className='row my-3'>
                <div className="col-auto">
                    <Logo />
                </div>

                <div className="col-auto ms-auto">
                    <Navigation isAuth={isLogged} isLoading={isLoading} />
                </div>
            </div>
        </div>
    )
}

export default Navbar
