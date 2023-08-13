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

export const postPost = async (postCont) => {
  try {
    const { status } = await axios.post(endpoints.posts, postCont)
    return status
  } catch (error) {
    return null
  }
}