import './css/posts.css'

////////////////
// Functions //
//////////////

async function handleEdit(event, setEditing, setTargetId) {
    event.preventDefault();
    const thisPostId = event.target.parentElement.id;
    setEditing(true);
    setTargetId(thisPostId);
};

async function handleDelete(event, setDeleting, setTargetId) {
    event.preventDefault();
    const thisPostId = event.target.parentElement.id;
    setTargetId(thisPostId);
    setDeleting(true);
};

////////////////
// Component //
//////////////

const PostTemplate = ({post, setEditing, setDeleting, setTargetId}) => {

    return (
        <div className="post-item" id={post._id}>
            <div>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-body">{post.description}</p>
            </div>

            <div className="post-info"> 
                <p className="post-price">Price:{post.price}</p>
                <p className="post-loc">Location: {post.location}</p>
                { post.willDeliver ? <p className="post-del">Delivery Available</p> : null }
            </div>

            { post.isAuthor ? <button onClick={ (e) => handleEdit(e, setEditing, setTargetId) }>Edit</button> : null }
            { post.isAuthor ? <button onClick={ (e) => handleDelete(e, setDeleting, setTargetId) }>Delete</button> : null }
        </div>
    );
}

export default PostTemplate