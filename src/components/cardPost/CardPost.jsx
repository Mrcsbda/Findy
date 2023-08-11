import React from 'react'
import "./cardPost.scss"

const CardPost = ({ post }) => {
    return (
        <article className='home-feed__card'>
            <section className='home-feed__user-info'>
                <figure className='home-feed__avatar-container'>
                    <img className='home-feed__avatar' src="" alt="" />
                </figure>
                <p className='home-feed__user-name'></p>
            </section>
            <figure className='home-feed__post-container'>
                <img className='home-feed__post' src="" alt="" />
            </figure>
            <section className='home-feed__post-info-container'>
                <div className='home-feed__post-info'>
                    <figure className='home-feed__icon-container'>
                        <img className='home-feed__icon' src="" alt="" />
                        <figcaption className='home-feed__icon-description'></figcaption>
                    </figure>
                    <figure className='home-feed__icon-container'>
                        <img className='home-feed__icon' src="" alt="" />
                        <figcaption className='home-feed__icon-description'></figcaption>
                    </figure>
                    <figure className='home-feed__icon-container'>
                        <img className='home-feed__icon' src="" alt="" />
                        <figcaption className='home-feed__icon-description'></figcaption>
                    </figure>
                </div>
                <figure className='home-feed__icon-save-container'>
                    <img className='home-feed__icon-save' src="" alt="" />
                </figure>
            </section>
            <p className='home-feed__post-description'><span></span></p>
        </article>
    )
}

export default CardPost