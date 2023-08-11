import axios from "axios"
import { endpoints } from "./data"

export const getPosts = async(idUser) =>{
    const {data} = axios.get(`${endpoints.posts}?userId=${idUser}`)
    return data
}