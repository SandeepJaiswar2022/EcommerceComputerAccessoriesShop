import axios from "axios";

export const BASE_URL = `http://localhost:8080/ecommerce`;
export const jwtToken = localStorage.getItem(`jwtToken`);

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Authorization": `Bearer ${jwtToken}`
    }
})