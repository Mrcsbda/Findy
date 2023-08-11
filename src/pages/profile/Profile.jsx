import React, { useEffect, useState } from 'react'
import "./profile.scss"
import { getInfoUser } from '../../services/userServices'
import { NavLink } from 'react-router-dom'

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(false)
  const [followers, setFollowers] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const  {data}  = await getInfoUser(1)
        setCurrentUser(data)
        setFollowers(data.followers)
      }
      catch (error) {
        console.log(error);
        return error
      }
    }
    fetchUser()
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
              <section className='profile__post'>
                {currentUser.posts}
              </section>
            </section>

          </section>
          :
          <div>Loading user ...</div>
      }
    </>
  )
}

export default Profile