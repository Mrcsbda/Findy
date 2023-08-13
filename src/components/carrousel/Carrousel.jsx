import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './carrousel.scss';
import { Pagination } from 'swiper/modules';
import { getUsers } from '../../services/userServices';
import { getSession } from '../../services/storageService';

const Carrousel = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const data = await getUsers()
      const userLogged = getSession()
      const usersInfo = [
        {
          avatar: userLogged.avatar,
          name: "Tu historia"
        }
      ]

      data.forEach(user => {
        if (user.id !== userLogged.id && userLogged.following.includes(user.id)) {
          usersInfo.push({
            avatar: user.avatar,
            name: user.name,
          })
        }
      })

      setUsers(usersInfo)
    } catch (error) {

    }
  }

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        modules={[Pagination]}
        className="mySwiper header__carousel-container"
      >
        {
          users.length && (
            users.map((user, index) => (
              <SwiperSlide className="header__slide" key={index}>
                <figure className={`header__avatar-container ${index === 0 ? "header__user-logged" : ""}`}>
                  <img className={`header__avatar ${index === 0 ? "header__user-logged--avatar" : ""}`} src={user.avatar} alt={user.name} />
                </figure>
                <p className="header__name-user">{user.name}</p>
              </SwiperSlide>

            )
            )
          )
        }
      </Swiper>
    </>
  );

}

export default Carrousel