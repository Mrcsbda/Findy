import { endpoints } from "./data";
import axios from "axios";

export const getUsers = async(id) =>{
    const {data} = axios.get(`${endpoints.users}/${id}`)
    return data
}

export const getUser = async (username, password) => {
    try {
        const {data} = await axios.get(endpoints.user(username, password))
        return data.length ? data[0] : null
    } catch (error) {
        return null
    }
}