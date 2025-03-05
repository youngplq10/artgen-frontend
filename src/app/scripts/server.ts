"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const setAuthToken = (token: string) => {
    cookies().set("jwt", token, {
        httpOnly: true,
    });
    cookies().set("isAuthenticated", "true", {
        httpOnly: true,
    });
    cookies().set("username", jwtDecode(token).sub || "", {
        httpOnly: true
    })
};

export const getIsAuthenticated = () : boolean => {
    const isAuthenticated = cookies().get("isAuthenticated")?.value;
    return isAuthenticated === "true"; 
};

export const logout = () => {
    cookies().delete("jwt")
    cookies().delete("isAuthenticated")
    cookies().delete("username")
}

export const getAllCookies = () => {
    return {
        username: cookies().get("username"),
        jwt: cookies().get("jwt")
    }
}