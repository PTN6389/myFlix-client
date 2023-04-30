import { useState } from 'react';
import { Button, Form, Card, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';


export const ProfileView = ({ user, token, updateUser, movies, onLoggedOut }) => {
    const [name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    let favoriteMovies = movies.filter(m => user.favoriteMovies.includes(m.id));

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            name: name,
            password: password,
            email: email,
            birthday: birthday
        };

        fetch(`https://myflix-movieapp.herokuapp.com/users/user/${user.name}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
               return response.json();
            } else {
                alert("Profile update failed");
            }
        })
        .then(user => {
            if (user) {
                alert("Profile update successful");
                updateUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    };

    const deleteProfile = () => {
        fetch(`https://myflix-movieapp.herokuapp.com/users/${user.name}`, {
            method: 'DELETE',
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response => {
            if (response.ok) {
                alert("Profile delete successful");
                onLoggedOut();
            } else {
                alert("Profile delete failed");
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    return (
        <>
        <Card className="mt-3 mb-3" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Profile Details:</Card.Title>
                <Card.Text>Username: {user.name}</Card.Text>
                <Card.Text>Email: {user.email}</Card.Text>
                <Card.Text>Birthday: {user.birthday.slice(0, 10)}</Card.Text>
                  
            </Card.Body>
        </Card>    
        <hr className="mt-3 mb-3"></hr>
        <h4>Update Profile</h4>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-3 mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                    type="text" 
                    value={name}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control 
                    type="date" 
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required />
            </Form.Group>

            <Button variant="primary" className="me-5" type="submit" >Submit</Button>
            <Button variant="danger" onClick={() => {deleteProfile()}} >Delete Profile</Button> 
        </Form>
        <hr className="mt-3 mb-3"></hr>
        <h4>My Favorite Movies</h4>

        {favoriteMovies.map(movie => (
            
            <Col key={movie.id} className="mb-5">
                <MovieCard movieData={movie}/>
            </Col>
           
            
        ))}
        </>
    );
}