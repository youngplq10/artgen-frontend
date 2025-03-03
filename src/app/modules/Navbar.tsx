import React from 'react'
import Logo from '../components/Logo'
import Navigation from '../components/Navigation'

const Navbar = () => {
    return (
        <div className='container-lg'>
            <div className='row my-3'>
                <div className="col-6">
                    <Logo />
                </div>

                <div className="col-auto ms-auto">
                    <Navigation />
                </div>
            </div>
        </div>
    )
}

export default Navbar
