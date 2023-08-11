import { endpoints } from "./data";
import axios from "axios";

export const getUsers = async(id) =>{
    const {data} = axios.get(`${endpoints.user}/${id}`)
    return data
}
