import { endpoints } from "./data";
import axios from "axios";

export const getUser = async (username, password) => {
    try {
        const { data } = await axios.get(endpoints.user(username, password))
        return data.length ? data[0] : null
    } catch (error) {
        return null
    }
}

export const getInfoUser = async (id) => {
    try {
        const { data } = await axios.get(`${endpoints.users}/${id}`)
        return data
    } catch (error) {
        return null
    }
}

export const getUsers = async () => {
    try {
        const { data } = await axios.get(endpoints.users)
        return data
    } catch (error) {
        return null
    }
}