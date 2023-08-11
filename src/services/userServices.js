import { endpoints } from "./data";
import axios from "axios";

export const getUsers = async(id) =>{
    try {
        const response = axios.get(`${endpoints.users}/${id}`)
        
        return response
    } catch (error) {
        console.log(error);
        return error
    }
   
}

export const getUser = async (username, password) => {
    try {
        const {data} = await axios.get(endpoints.user(username, password))
        return data.length ? data[0] : null
    } catch (error) {
        return null
    }
}