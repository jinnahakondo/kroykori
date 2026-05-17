import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || process.env.WEBSITE_URL,
    withCredentials: true,
});

export default axiosInstance;