import React from 'react'
import CreateAccountForm from '../components/CreateAccountForm'

const CreateAccountSection = () => {
    return (
        <div className='container-lg my-5'>
            <div className="row justify-content-center">
                <div className="col-6">
                    <CreateAccountForm />
                </div>
            </div>
        </div>
    )
}

export default CreateAccountSection
