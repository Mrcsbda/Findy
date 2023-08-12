import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Masonry } from '@mui/lab';


// const Item = styled(Paper)(({ theme }) => ({
//  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//  // ...theme.typography.body2,
//  // padding: theme.spacing(0.5),
// // textAlign: 'center',
//  // color: theme.palette.text.secondary,
// }));

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