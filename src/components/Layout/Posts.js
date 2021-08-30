///////////////////
// Requirements //
/////////////////

import React, {useState, useEffect} from "react";
import baseUrl from "../URL";
import { DeletePost, EditPost, NewPost } from '../Posts'
import PostTemplate from './PostTemplate'
import './css/posts.css';

////////////////
// Functions //
//////////////

async function fetchPosts() {
    const response = await fetch(`${baseUrl}/posts`,
        localStorage.getItem("token") ? {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        } : null);
    const { data } = await response.json();

    return data.posts;
}

async function handleSearch(event, setPosts) {
    event.preventDefault();
    const searchText = event.target[0].value.toLowerCase();
    fetchPosts().then((result) => {
        const filteredPosts = result.filter( (post) => {
            return post.title.toLowerCase().includes(`${searchText}`) || post.description.toLowerCase().includes(`${searchText}`)
        });
        setPosts(filteredPosts);
    });
};

////////////////
// Component //
//////////////

const Posts = ({posts, setPosts}) => {
    const [makingPost, setMakingPost] = useState(false);
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [targetId, setTargetId] = useState('');

    useEffect(() => {
        fetchPosts().then((posts) => {setPosts(posts)});
    }, []);

    return (
        <>  
            <h1 id='post-hd'>Buy Faster Sell Faster!</h1>
            
            <form id="search-bar" onSubmit={(e) => handleSearch(e, setPosts)}>
                <label htmlFor="search-term">Search: </label>
                <input name="search-term" type="text" placeholder="search"/>
                <button type="submit" >Submit</button>
            </form>
            
            { localStorage.getItem("user") ? <button onClick={ (event) => {event.preventDefault(); setMakingPost(true)} }>New Post</button> : null }
            { makingPost ? <NewPost setMakingPost={setMakingPost} /> : null }
            { posts.map( (post, idx) => <PostTemplate key={idx} post={post} setEditing={setEditing} setDeleting={setDeleting} setTargetId={setTargetId}/> ) }
            { editing ? <EditPost setEditing={setEditing} targetId={targetId} /> : null }
            { deleting ? <DeletePost setDeleting={setDeleting} targetId={targetId} /> : null }
        </> 
    );   
};

export default Posts;