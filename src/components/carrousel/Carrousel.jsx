import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './carrousel.scss';
import { Pagination } from 'swiper/modules';

const Carrousel = ({ infoHeader }) => {
  console.log(infoHeader)
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        modules={[Pagination]}
        className="mySwiper header__carousel-container"
      >
        {
          infoHeader.length && (
            infoHeader.map((user, index) => (
              <SwiperSlide className="header__slide" key={index}>
                <img className="header__avatar" src={user.avatar} alt={user.name} />
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