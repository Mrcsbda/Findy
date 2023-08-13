import * as React from 'react';
import { Masonry } from '@mui/lab';

export default function ImagesProfile({ posts }) {

    return (
        <Masonry columns={2} spacing={1} className='profile__posts' sx={{}}>
            {posts.map((post) => (

                <figure key={post.id} data-id={post.id} className='profile__posts__post'>
                    <img src={post?.media} alt="post_media" />
                </figure>

            ))}
        </Masonry>
    );
}