import * as React from 'react';
import { Masonry } from '@mui/lab';
import { getTaggedPost } from '../../services/postService';

export default function PostsProfile({ posts, typeMedia, idUser }) {
    const [arrayPosts, setArrayPosts] = React.useState([])


    React.useEffect(() => {
        const handleTypeMedia = async ()=> {
        switch (typeMedia) {
            case "photos":
               const photosPosts = posts.filter(post => post.type && post.type === "photo")
               setArrayPosts(photosPosts)
              break;
            case "videos":
                const videosPosts = posts.filter(post => post.type && post.type === "video")
                setArrayPosts(videosPosts)
              break;
            case "tag":
                const taggedPosts = await getTaggedPost(idUser)
                setArrayPosts(taggedPosts)
              break;
          }
        }
        handleTypeMedia()
    }, [typeMedia])
    


    return (
        <Masonry columns={2} spacing={1} className='profile__posts' sx={{}}>
            {
            arrayPosts.length>0 ?
            arrayPosts.map((post) => (

                <figure key={post.id} data-id={post.id} className='profile__posts__post'>
                    <img src={post?.media} alt="post_media" />
                </figure>

            ))
                :
                <div>No hay posts</div>
        }
        </Masonry>
    );
}