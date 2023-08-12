import React from 'react'
import "./cardPost.scss"
import { useNavigate } from 'react-router-dom'
import { updatePost } from '../../services/postService'
import { updateUser } from '../../services/userServices'
import { saveSession } from '../../services/storageService'

const CardPost = ({ post, cardPostProps: { user , isInteracting , setIsInteracting } }) => {
    const navigate = useNavigate()

    const goToProfile = (userId) => {
        navigate(`${userId}`)
    }

    const goToComments = (userId, postId) => {
        navigate(`${userId}/${postId}`)
    }

    const handleLike = async (postId) => {
        const postLikes = [...post.likes];
        const likesStore = [...user.likesStore]

        if (user.likesStore.includes(postId)) {
            const findIndexInPost = postLikes.findIndex(userId => userId === user.id)
            const newPostLikes = postLikes.splice(findIndex, 1)
            const findIndexInUser = likesStore.findIndex(element => element === postId)
            const newPostLiked = likesStore.splice(findIndex, 1)
        } else {
            postLikes.push(user.id)
            likesStore.push(postId)
        }

        const propertyNamePost = {
            likes: postLikes
        }

        const propertyNameUser = {
            likesStore,
        }

        await updatePost(postId, propertyNamePost)
        await updateUser(user.id, propertyNameUser)
        saveSession({
            ...user,
            likesStore,
        })
        setIsInteracting(!isInteracting)
    }

    return (
        <article className='home-feed__card'>
            <section className='home-feed__user-info' onClick={() => goToProfile(post.userId)}>
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
                        <img className='home-feed__icon' src="/images/heart.svg" alt="heart icon" onClick={() => handleLike(post.id)} />
                        <figcaption className='home-feed__icon-description'>{post.likes.length}</figcaption>
                    </figure>
                    <figure className='home-feed__icon-container' onClick={() => goToComments(post.userId, post.id)}>
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
            <p className='home-feed__post-description'>
                <strong onClick={() => goToProfile(post.userId)}>{post.name} </strong>{post.caption}</p>
        </article>
    )
}

export default CardPost