import { Link, useHistory } from "react-router-dom";
import './style/Style.css'


const Header = () => {
    let history = useHistory()
    function logOutHandler(event) {
        event.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
        history.push("/");
    };

    return (
        <header id="page-hd">
            <h1>Strangers' Things</h1>
            <div id="nav">
                {   
                    !localStorage.getItem("user") ? 
                    <Link id="login" to="/login">Log In</Link> 
                    : null
                }
                <Link to="/posts">Posts</Link>
                {   
                    localStorage.getItem("user") ? 
                    <Link to="/profile">Profile</Link> 
                    : null
                }
                {   
                    localStorage.getItem("user") ? 
                    <Link to="/" onClick={(event) => {logOutHandler(event)}}>Log Out {localStorage.getItem("user")}</Link> 
                    : null
                }
            </div>
        </header> );
};

export default Header;