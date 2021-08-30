import { useHistory } from "react-router-dom"
import baseUrl from "../URL"

const DeletePost = ({setDeleting, targetId}) => {
    let history = useHistory();
    
    const handleDelete = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch( `${baseUrl}/posts/${targetId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        };
        
        setDeleting(false);
        window.location.reload();
        history.push("/posts");
    };
    
    return (
        <div id="delete-post">
            <form onSubmit={handleDelete}>
                <p>Really Delete?</p>
                <button type="submit" >Confirm</button>
                <button onClick={ (event) => {event.preventDefault(); setDeleting(false)}}>Cancel</button>
            </form>
        </div> );
};

export default DeletePost;