import axios from "axios"
import { endpoints } from "./data"

export const getMessage = async (postId) => {
    try {
        const { data } = await axios.get(`${endpoints.comments}?postId=${postId}`)
        return data
    } catch (error) {
        return null
    }
}