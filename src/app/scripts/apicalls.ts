"use server"

import axios from "axios";
import { setAuthToken } from "./server";

const API = process.env.NEXT_PRIVATE_API;

export const createUser = async (username: string, email: string, password: string) : Promise<string> => {
    try {
        const formData = new FormData();

        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);

        const res = await axios.post(API + "/public/user/register", formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (res.status === 201) {
            setAuthToken(res.data.jwt);
            return "User created.";
        } else {
            return "Server error. Please try again.";
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 409) {
                return error.response.data.message;
            } else {
                return "Server error. Please try again.";
            }
        } else {
            return "Server error. Please try again.";
        }
    }
}

export const loginUser = async (username: string, password: string) : Promise<string> => {
    try {
        const formData = new FormData();

        formData.append("username", username);
        formData.append("password", password);

        const res = await axios.post(API + "/public/user/login", formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (res.status === 200) {
            setAuthToken(res.data.jwt);
            return "Signed in.";
        } else {
            return "Server error. Please try again.";
        } 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 409) {
                return error.response.data.message;
            } else {
                return "Server error. Please try again.";
            }
        } else {
            return "Server error. Please try again.";
        }
    }
}