"use client"

import React, { useEffect, useState } from 'react'
import { category } from '../scripts/interfaces'
import { getAllCategories } from '../scripts/apicalls';
import { Alert, Box, Button } from '@mui/material';
import Loading from '../components/Loading';

const CreateArtSection = () => {
    const [categories, setCategories] = useState<category[]>([]);

    const [errorMessage, setErrorMessage] = useState("");
    const [errorState, setErrorState] = useState(true);

    const [loading, setLoading] = useState(true);

    const [prompt, setPrompt] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Pixel Art");

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await getAllCategories();

            if (typeof res === "string") {
                setErrorMessage(res);
                setErrorState(false);
            } else {
                setCategories(res);
                setLoading(false);
            }
        }
        fetchCategories();
    }, [])

    const handleCreateArt = async () => {
        //Handle creating art
    }

    return (
        <div className='container-lg my-5'>
            <div className="row">
                <div className="col-12 col-md-8 col-lg-6">
                    <form>
                        <label htmlFor='prompt' className='my-2'>Prompt</label>
                        <input type='text' id='prompt' className='form-control' value={prompt} onChange={(e) => setPrompt(e.target.value)} />

                        <label htmlFor='category' className='my-2'>Category</label>
                        { loading ? (
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

                        <Button variant='contained' className='my-2' onClick={handleCreateArt}>Create art</Button>
                    </form>
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
