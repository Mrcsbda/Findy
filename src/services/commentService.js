import axios from "axios"
import { endpoints } from "./data"

export const getMessage = async(postId) =>{
    const {data} = axios.get(`${endpoints.comments}?postId=${postId}`)
    return data
}