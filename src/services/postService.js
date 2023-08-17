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

export const postPost = async (postCont) => {
  try {
    const { status } = await axios.post(endpoints.posts, postCont)
    return status
  } catch (error) {
    return null
  }
}

export const updatePost = async (id, propertyName) => {
  try {
    const { data } = await axios.patch(`${endpoints.posts}/${id}`, { ...propertyName })
    return data
  } catch (error) {
    return null
  }
}

export const getTaggedPost = async (userId) => {
  try {
    const { data } = await axios.get(endpoints.posts)
    const taggedData = data.filter(post => post.tag.some(tagUserId => tagUserId == userId));
    return taggedData
  } catch (error) {
    console.log(error);
    return error
  }
}

export const getIndividualPost = async (postId) => {
  try {
    const { data, status } = await axios.get(`${endpoints.posts}/${postId}`)
    return { data, status }
  } catch (error) {
    console.log(error);
    return error
  }
}

export const getIndividualPostWithMessages = async (postId) => {
  try {
    const { data, status } = await axios.get(`${endpoints.posts}/${postId}?_embed=comments`)
    return { data, status }
  } catch (error) {
    console.log(error);
    return error
  }
}