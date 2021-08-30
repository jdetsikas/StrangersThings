import { Link, useHistory } from "react-router-dom";
import './css/header.css'


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
            <div id='nav'>
                <Link to="/posts">Posts</Link>
                { localStorage.getItem("user") ? <Link to="/profile">Profile</Link> : null }
                { !localStorage.getItem("user") ? <Link to="/login">Log In</Link> : null }
                { localStorage.getItem("user") ? <Link to="/" onClick={ (e) => logOutHandler(e) }>Log Out</Link> : null }
            </div>
        </header> 
	);
};

export default Header;