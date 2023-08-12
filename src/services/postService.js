import axios from "axios"
import { endpoints } from "./data"

export const getPosts = async (idUser) => {
    try {
        const { data } = await axios.get(`${endpoints.posts}?userId=${idUser}`)
        return data
    } catch (error) {
        return null
    }
}

export const getAllPosts = async () => {
    try {
        const { data } = await axios.get(endpoints.posts)
        return data
    } catch (error) {
        return null
    }
}