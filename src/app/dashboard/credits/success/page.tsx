import Navbar from '@/app/modules/Navbar'
import SuccessPaymentPage from '@/app/modules/SuccessPaymentPage'
import React, { Suspense } from 'react'

const page = () => {
    return (
        <>
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
                <SuccessPaymentPage />
            </Suspense>
        </>
    )
}

export default page
