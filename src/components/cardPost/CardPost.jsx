import React from 'react'
import "./cardPost.scss"

const CardPost = ({ post }) => {

    console.log(post)
    return (
        <article className='home-feed__card'>
            <section className='home-feed__user-info'>
                <figure className='home-feed__avatar-container'>
                    <img className='home-feed__avatar' src={post.avatar} alt={post.name} />
                </figure>
                <p className='home-feed__user-name'>{post.name}</p>
            </section>
            <figure className='home-feed__post-container'>
                <img className='home-feed__post' src={post.media} alt={`${post.name}' post`} />
            </figure>
            <section className='home-feed__post-info-container'>
                <div className='home-feed__post-info'>
                    <figure className='home-feed__icon-container'>
                        <img className='home-feed__icon' src="/images/heart.svg" alt="heart icon" />
                        <figcaption className='home-feed__icon-description'>{post.likes.length}</figcaption>
                    </figure>
                    <figure className='home-feed__icon-container'>
                        <img className='home-feed__icon' src="/images/comment.svg" alt="comment icon" />
                        <figcaption className='home-feed__icon-description'>{post.comments.length}</figcaption>
                    </figure>
                    <figure className='home-feed__icon-container'>
                        <img className='home-feed__icon' src="/images/send.svg" alt="send icon" />
                        <figcaption className='home-feed__icon-description'></figcaption>
                    </figure>
                </div>
                <figure className='home-feed__icon-save-container'>
                    <img className='home-feed__icon-save' src="/images/save.svg" alt="save icon" />
                </figure>
            </section>
            <p className='home-feed__post-description'><strong>{post.name} </strong>{post.caption}</p>
        </article>
    )
}

export default CardPost