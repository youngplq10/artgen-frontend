"use server"

import axios from "axios";
import { getAllCookies, setAuthToken } from "./server";
import { category } from "./interfaces";
import OpenAI from "openai";
import { Storage } from "@google-cloud/storage";
import path from "path";
import fs from "fs";
import { promisify } from "util";

const API = process.env.NEXT_PRIVATE_API;
const OPENAI_KEY = process.env.NEXT_PRIVATE_OPENAI_KEY;
const openai = new OpenAI({ apiKey: OPENAI_KEY});

//Configuration of google cloud
const storage = new Storage({
    keyFilename: path.join(process.cwd(), "google-service-key.json"),
});
const bucketName = "artgen4";
const bucket = storage.bucket(bucketName);

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

export const getAllCategories = async () : Promise<category[] | string> => {
    try {
        const res = await axios.get(API + "/public/categories", {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (res.status === 200) {
            return res.data as category[];
        } else {
            return "Server error. Please refresh page."
        } 
    } catch {
        return "Server error. Please refresh page."
    }
}

export const createImage = async (prompt: string, category: string) : Promise<string> => {
    try {
      const { username, jwt } = await getAllCookies();
  
      const completion = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt + " Create the image in style of " + category,
        n: 1,
        size: "1024x1024",
      });
  
      if (!completion.data[0]?.url) {
        return "Failed to generate image.";
      }
  
      const imageUrl = completion.data[0].url;
  
      const response = await axios({
            url: imageUrl,
            method: "GET",
            responseType: "stream",
      });
  
      const gcsFileName = `generated_images/${Date.now()}-${category}.png`;
      const gcsFile = bucket.file(gcsFileName);
  
      const fileStream = gcsFile.createWriteStream({
        metadata: {
          contentType: "image/png",
        },
      });
  
      response.data.pipe(fileStream);
  
      return new Promise(() => {
        fileStream.on("finish", async () => {
          try {

            const [signedUrl] = await gcsFile.getSignedUrl({
              action: "read",
              expires: Date.now() + 365 * 24 * 60 * 60 * 1000,
            });
  
            const formData = new FormData();
            if (typeof username?.value === "string") {
              formData.append("username", username.value);
            }
            formData.append("link", signedUrl);
            formData.append("prompt", prompt);
            formData.append("cost", "5");
  
            const res = await axios.post(API + "/auth/art", formData, {
              headers: {
                Authorization: "Bearer " + jwt?.value,
              },
            });
  
            if (res.status === 201) {
              return res.data;
            } else {
              return "Server error. Please try again.";
            }
          } catch {
            return "Server error. Please try again."
          }
        });
  
        fileStream.on("error", (err) => {
          return "Error uploading image to Google Cloud: " + err;
        });
      });
    } catch (error) {
      console.error("Error creating image:", error);
      return "Server error. Please try again.";
    }
  };
