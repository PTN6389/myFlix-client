import { React, useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
    const [name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        //this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        const data = {
            name: name,
            password: password
        };

        fetch('https://myflix-movieapp.herokuapp.com/login', {
            method: "POST",
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.ok) {
                onLoggedIn(name);
            } else {
                alert("Login failed");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Username:
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>Password:
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};