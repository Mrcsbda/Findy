import { endpoints } from "./data";
import axios from "axios";

export const get_users = async(id) =>{
    const {data} = axios.get(`${endpoints.user}/${id}`)
    return data
}

export const get_Posts = async(idUser) =>{
    const {data} = axios.get(`${endpoints.posts}?userId=${idUser}`)
    return data
}

export const get_Message = async(postId) =>{
    const {data} = axios.get(`${endpoints.comments}?postId=${postId}`)
    return data
}