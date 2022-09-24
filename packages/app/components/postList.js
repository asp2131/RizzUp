import React from "react";
import  Post from './post';

const PostList = ({ list }) => {

    return (
        <>
        {
            list.map((post)=> 
                <Post post={post.data} />
            )
        }
        </>
    )
}

export default PostList;