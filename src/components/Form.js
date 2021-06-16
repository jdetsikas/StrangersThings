import React from "react";
import { Link, useHistory } from "react-router-dom";
import baseUrl from "./URL";
import './style/Style.css'

const Form = () => {
    let history = useHistory()

    async function handleSubmit(event) {
        event.preventDefault();

        const name = event.target[0].value;
        const pass = event.target[1].value;
        
        try {
            const response = await fetch(`${baseUrl}/users/login`, {
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
            });
            const result = await response.json();
            const token = result.data.token;

            localStorage.setItem("token", token);
            localStorage.setItem("user", name);
        } catch (error) {
        console.error(error);
        };
        
        history.push("/posts");
    };
    
    return (
        <>
        
            <form id="log-in" onSubmit={handleSubmit}>
                <h3>Log-In</h3>
                        
                <label  htmlFor="username">Username:</label>
                <input type="text" placeholder="username" minLength={4} required/>
                    
                <label htmlFor="password">Password:</label>
                <input type="password" placeholder="password" minLength={8} required/>
                
                <button id ="btn-login" type="submit">Log-in</button>
                <p>Don't have an account? <Link id="sign-up" to="/register">Sign up!</Link></p>
                    
            </form>
          
           
        </> );
};

export default Form;