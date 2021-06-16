import { useState } from "react"
import {useHistory} from "react-router-dom"
import baseUrl from "./URL"
import './style/Style.css'

const EditPost = ({setEditing, targetId}) => {
    let history = useHistory();
    // States for the post targeted by the edit button
    const [ti, setTitle] = useState("")
    const [bo, setBody] = useState("")
    const [pr, setPrice] = useState("")
    const [loc, setLocation] = useState("")
    const [del, setWillDeliver] = useState(false)

    useState(() => {
        // Fetches the data of the post you want to edit and populates the form with it
        const fillForm = async () => {
            const response = await fetch(`${baseUrl}/posts/`);
            const result = await response.json();
            
            // Find and pull the post with the same post id
            const posts = result.data.posts;
            const postFound = posts.find(post => post._id === targetId);
            const {title, description, price, location, willDeliver} = postFound;
            
            // Set these values to be the equivalent values from the found post
            setTitle(title);
            setBody(description);
            setPrice(price);
            setLocation(location);
            setWillDeliver(willDeliver);
        };
        fillForm();
    }, []);
    
    const handleSubmit = async (event) => {
        event.preventDefault()

        const {target} = event;
        const [ newTitle, newDescription, newPrice, newItemLocation, newWillDeliverItem ] = target;

        try {
            const response = await fetch(`${baseUrl}/posts/${targetId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    post: {
                        title: `${newTitle.value}`,
                        description: `${newDescription.value}`,
                        price: `${newPrice.value}`,
                        location: newItemLocation ? `${newItemLocation.value}` : "[On Request]",
                        willDeliver: `${newWillDeliverItem.checked}`
                    }
                })
            })
            const result = await response.json()
            console.log(result)
        } catch (error) {
            console.error(error)
        };
        
        setEditing(false);
        window.location.reload();
        history.push("/posts");
    };
    
    return (
        <div id="edit-post">
            <form onSubmit={handleSubmit}>
                <label htmlFor="post-name">Title:</label>
                <input id="edit-post-name" type="text" placeholder="item for sale" 
                    value={ti} onChange={ (event) => {setTitle(event.target.value)}
                }/>

                <label htmlFor="post-body">Body:</label>
                <input id="post-body" type="text" placeholder="item description" 
                    value={bo} onChange={ (event) => {setBody(event.target.value)}
                }/>

                <label htmlFor="post-cost">Asking Price:</label>
                <input id="post-cost" type="text" placeholder="$0.00" 
                    value={pr} onChange={ (event) => {setPrice(event.target.value)}
                }/>

                <label htmlFor="post-loc">Location:</label>
                <input id="post-loc" type="text" placeholder="item location" 
                    value={loc} onChange={ (event) => {setLocation(event.target.value)}
                }/>

                <label htmlFor="post-del">Delivery Available:</label>
                <input id="post-del" type="checkbox" 
                    checked={del} onChange={ (event) => {setWillDeliver(event.target.checked)}
                }/>

                <button id="btn-submit" type="submit">Submit</button>
                <button id="btn-cancel" onClick={(event) => {event.preventDefault(); setEditing(false)}}>Cancel</button>
            </form>
        </div> );
};

export default EditPost;