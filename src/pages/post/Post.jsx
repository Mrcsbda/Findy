import React from 'react'
import "./main.scss"
import { useParams } from 'react-router-dom'

const Post = () => {
  let postId = useParams()
  useEffect(() => {
    console.log(postId)
  }, [])

  return (
    <main className="post__container">
      <div className></div>
    </main>
  )
}

export default Post