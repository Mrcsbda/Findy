import { endpoints } from "./data";
import axios from "axios";

export const getUser = async (email, password) => {
    try {
        const { data } = await axios.get(endpoints.user(email, password))
        return data.length ? data[0] : null
    } catch (error) {
        return null
    }
}

export const getInfoUser = async (id) => {
    try {
        const  response  = await axios.get(`${endpoints.users}/${id}`)
        return response
    } catch (error) {
        return null
    }
}

export const patchInfoUser = async (id, newInf) => {
    try {
    await axios.patch(`${endpoints.users}/${id}`, newInf)
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

export const updateUser = async (id, propertyName) => {
    try {
        const { data } = await axios.patch(`${endpoints.users}/${id}`, {...propertyName} )
        return data
    } catch (error) {
        return null
    }
}
