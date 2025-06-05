"use client"

import React, { useEffect, useState } from 'react'
import { category, user } from '../scripts/interfaces'
import { createImage, getAllCategories, getUserData } from '../scripts/apicalls';
import { Alert, Box, Button, Typography } from '@mui/material';
import Loading from '../components/Loading';
import { validatePrompt } from '../scripts/validation';
import Link from 'next/link';

const CreateArtSection = () => {
    const [categories, setCategories] = useState<category[]>([]);

    const [errorMessage, setErrorMessage] = useState("");
    const [errorState, setErrorState] = useState(true);

    const [userData, setUserData] = useState<user>();
    const [credits, setCredits] = useState(0);

    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingUserData, setLoadingUserData] = useState(true);

    const [createLoading, setCreateLoading] = useState(false);

    const [prompt, setPrompt] = useState("");
    const [cost, setCost] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("Pixel Art");

    const fetchCategories = async () => {
        const res = await getAllCategories();

        if (typeof res === "string") {
            setErrorMessage(res);
            setErrorState(false);
        } else {
            setCategories(res);
            setLoadingCategories(false);
        }
    }

    const fetchUserData = async () => {
        const res = await getUserData();

        if (typeof res === "string") {
            setErrorMessage(res);
            setErrorState(false);
            setCredits(0);
        } else {
            setUserData(res);
            setLoadingUserData(false);
            setCredits(res.credits);
        }
    }

    useEffect(() => {
        fetchUserData();
        fetchCategories();
    }, [])

    const handleCreateArt = async () => {
        if (credits < cost) {
            setErrorMessage("You don't have enough credits.")
            setErrorState(false);
        } else {
            setErrorMessage("");
            setErrorState(true);

            const validate = validatePrompt(prompt);

            if (validate !== "Success") {
                setErrorMessage(validate);
                setErrorState(false);
            } else {
                setErrorState(true);
                setCreateLoading(true);
                const res = await createImage(prompt, selectedCategory, cost);
    
                if (res !== undefined && res.created === true) {
                    window.location.href = "/dashboard/art/" + res.data;
                } else if (res!== undefined && res.created === false) {
                    setCreateLoading(false);
                    setErrorMessage(res.data)
                    setErrorState(false);
                } else {
                    setCreateLoading(false);
                    setErrorMessage("Server error. Please try again.")
                    setErrorState(false);
                }
            }
        }    
    }

    const handleCountCostOfPrompt = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
        setCost(Math.ceil(e.target.value.length / 10) * 1);
    }

    return (
        <div className='container-lg my-5'>
            <div className="row">
                <div className="col-12 col-md-8 col-lg-6">
                    { loadingUserData ? (
                        <Box sx={{ height: 40 }}>
                            <Loading />
                        </Box>
                    ) : (
                        <Typography variant='h4' className='my-2'>
                            { credits <= 0 ? (
                                <>{ "You don't have credits." }</>
                            ) : (
                                <>{ "You have " + userData?.credits + " credits" }</>
                            ) }
                        </Typography>
                    ) }

                    <form>
                        <label htmlFor='prompt' className='my-2'>Prompt</label>
                        <input type='text' id='prompt' className='form-control' value={prompt} onChange={(e) => handleCountCostOfPrompt(e)} />

                        <label htmlFor='category' className='my-2'>Category</label>
                        { loadingCategories ? (
                            <Box sx={{ height: 40 }}>
                                <Loading />
                            </Box>
                        ) : (
                            <select className='form-control' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                {categories.map((category, index) => {
                                    return (
                                        <option key={index} value={category.name}>{category.name}</option>
                                    )
                                })}
                            </select>
                        ) }

                        { createLoading ? (
                            <Button variant='contained' className='my-2' disabled onClick={handleCreateArt}>Creating...</Button>
                        ) : (
                            <Button variant='contained' className='my-2' onClick={handleCreateArt}>Create art</Button>
                        ) }
                    </form>

                    <Typography variant='h5'>Cost: {cost}</Typography>
                </div>
            </div>

            <div className="row my-2">
                <div className="col-auto">
                    <Alert severity='error' hidden={errorState}>{errorMessage}</Alert>
                </div>
            </div>
        </div>
    )
}

export default CreateArtSection
