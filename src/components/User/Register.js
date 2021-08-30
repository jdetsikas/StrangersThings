import {Link, useHistory} from "react-router-dom";
import baseUrl from "../URL"
import '../style/Style.css'

const Register = () => {

    let history = useHistory();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = event.target[0].value;
        const pass = event.target[1].value;
        
        const response = await fetch(`${baseUrl}/users/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
            username: `${name}`,
            password: `${pass}`
            }
        })
        }).then(response => response.json())
        .then(result => {
            console.log(result);
            const token = result.data.token
            localStorage.setItem("token", token)
            localStorage.setItem("user", name)
        })
        .catch(console.error);
        history.push("/posts")
    };

    return (
        <>
            <form id="register"  onSubmit={handleSubmit}>
                <h3>Registration</h3>

                <label  htmlFor="username">Username:</label>
                <input type="text" placeholder="username" minLength={4} required/>
                
                <label htmlFor="password">Password:</label>
                <input type="password" placeholder="password" minLength={8} required/>
            
                <button id="btn-register" type="submit">Register</button>

                <p>Back to <Link id="lgn" to="/login">Log-In</Link></p>
            </form> 
        </> );
};

export default Register;