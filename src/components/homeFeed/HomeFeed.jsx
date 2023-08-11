import React, { useEffect, useState } from 'react'
import { getUsers } from '../../services/userServices'
import { getAllPosts } from '../../services/postService'
import CardPost from '../cardPost/CardPost'
import "./homeFeed.scss"
import { getSession } from '../../services/storageService'

const HomeFeed = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const postsInfo = await getAllPosts()
    const usersInfo = await getUsers()
    const userLogged = getSession()
    const postFiltered = postsInfo.filter(post => userLogged.following.includes(post.userId) || post.userId === userLogged.id)
    const postsWithUser = postFiltered.map(post => {
      usersInfo.forEach(user => {
        if (user.id === post.userId) {
          post.name = user.name
          post.avatar = user.avatar
        }
      });

      return post
    }).sort((a, b) => a.time - b.time).reverse()
    setPosts(postsWithUser)
  }

  return (
    <main className='home-feed'>
      {
        posts.length && (
          posts.map((post, i) => (
            <CardPost key={i} post={post} />
          ))
        )
      }
    </main>
  )
}

export default HomeFeed