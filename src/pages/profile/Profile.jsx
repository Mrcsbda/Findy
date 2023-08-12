import React, { useEffect, useState } from 'react'
import "./profile.scss"
import { getInfoUser } from '../../services/userServices'
import { NavLink } from 'react-router-dom'
import { getPosts } from '../../services/postService'
import ImagesProfile from './images/images'

const Profile = ({idUser}) => {
  const [currentUser, setCurrentUser] = useState(false)
  const [followers, setFollowers] = useState([])
  const [posts, setPosts] = useState(false)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const  {data}  = await getInfoUser(idUser)
        const  post = await getPosts(idUser)
        setCurrentUser(data)
        setPosts(post)
        setFollowers(data.followers)
      }
      catch (error) {
        console.log(error);
        return error
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    
  }, [])

  return (
    <>
      {
        currentUser ?
          <section className='profile'>
            <section className='profile__portrait'>
              <figure className='profile__portrait__backButton'><img src="/images/arrow-left.svg" alt="arrow-left" /></figure>
              <figure className='profile__portrait__picture'><img src={currentUser.portrait} alt="user_portrait" /></figure>
              <figure className='profile__portrait__optionButton'><img src="/images/ellipsis.svg" alt="ellipsis.svg" /></figure>
            </section>
            <section className='profile__header'>
              <article className='profile__stats'>
                <div className='profile__stats__container'> <span className='profile__stats__number'>{currentUser.followers.length}</span>
                <span>Followers</span>
                </div>
                <figure><img src={currentUser.avatar} alt="Userimg" /></figure>
                <div  className='profile__stats__container'><span className='profile__stats__number'>{currentUser.following.length}</span>
                <span>Likes</span>
                 </div>
              </article>
              <div className='profile__inf'>
                <p className='profile__inf__name'>{currentUser.name}</p>
                <p className='profile__inf__username'>{currentUser.username}</p>
                <p className='profile__inf__description'>{currentUser.description}</p>
              </div>
              <div className='profile__buttons'>
                <div className='profile__button'>Follow</div>
                <div className='profile__button'>Messages</div>
              </div>
            </section>
            <section className='profile__body'>
              <section className='profile__typepost'>
              <div className='profile__typepost_button'>
                Photos
              </div>
              <div className='profile__typepost_button'>
                Videos
              </div>
              <div className='profile__typepost_button'>
                Tag
              </div>
              </section>
             
                {
                posts[0]?.media ? 
                // posts.map((post)=> (
                //   <figure  className='profile__posts__post'>
                //     <img src={post?.media} alt="post_media" />
                //   </figure>
                // ))
                <ImagesProfile posts={posts}/>
                :
                <div><p>El usuario no tiene publicaciones ...</p></div>
                }
             
            </section>

          </section>
          :
          <div>Loading user ...</div>
      }
    </>
  )
}

export default Profile