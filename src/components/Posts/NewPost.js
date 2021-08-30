import { useHistory } from "react-router-dom"
import baseUrl from "../URL"

const NewPost = ({setMakingPost}) => {
    let history = useHistory()

    const handleSubmit = async (event) => {
        event.preventDefault();

        const {target} = event;
        const [ title, description, price, itemLocation, willDeliverItem ] = target;

        try {
            await fetch(`${baseUrl}/posts`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    post: {
                        title: `${title.value}`,
                        description: `${description.value}`,
                        price: `${price.value}`,
                        location: itemLocation ? `${itemLocation.value}` : "[On Request]",
                        willDeliver: `${willDeliverItem.checked}`
                    }
                })
            });
        } catch(error) {
            console.error(error);
        };
        setMakingPost(false);
        window.location.reload();
        history.push("/posts")
    };
    
    return (
        <div id="new-post">
            <form onSubmit={handleSubmit}>
                <label htmlFor="post-name">Title:</label>
                <input id="post-name" type="text" placeholder="item for sale" required/>

                <label htmlFor="post-body">Body:</label>
                <input id="post-body" type="text" placeholder="item description" required />

                <label htmlFor="post-cost">Asking Price:</label>
                <input id="post-cost" type="text" placeholder="$0.00" required />

                <label htmlFor="post-loc">Location:</label>
                <input id="post-loc" type="text" placeholder="item location" />

                <label htmlFor="post-del">Delivery Available:</label>
                <input id="post-del" type="checkbox"></input>

                <button type="submit">Submit</button>
                <button onClick={(event) => {event.preventDefault(); setMakingPost(false)}}>Cancel</button>
            </form>
        </div> );
};

export default NewPost;