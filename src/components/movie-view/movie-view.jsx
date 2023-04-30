import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { json, useParams } from 'react-router';
import { MovieCard} from '../movie-card/movie-card';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const MovieView = ({ movies, user, token, updateUser }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);
    const [isFavorite, setIsFavorite] = useState(user.favoriteMovies.includes(movie.id));

useEffect(() => {
    setIsFavorite(user.favoriteMovies.includes(movie.id));
}, [movieId])

const addFavorite = () => {
   fetch(`https://myflix-movieapp.herokuapp.com/users/${user.name}/movies/${movieId}`, {
    method: "POST",
    headers: {Authorization: `Bearer ${token}` }
   }) 
   .then(response => {
    if(response.ok) {
        return response.json();
    } else {
        alert("Add favorite movie failed");
        return false;
    }
   })
   .then(user => {
    if(user) {
        alert("Add favorite movie successful");
        setIsFavorite(true);
        updateUser(user);
    }
   })
   .catch(e => {
    alert(e);
   });
}

const deleteFavorite = () => {
    fetch(`https://myflix-movieapp.herokuapp.com/users/${user.name}/movies/${movieId}`, {
     method: "DELETE",
     headers: {Authorization: `Bearer ${token}` }
    }) 
    .then(response => {
     if(response.ok) {
         return response.json();
     } else {
         alert("Delete favorite movie failed");
         return false;
     }
    })
    .then(user => {
     if(user) {
         alert("Delete favorite movie successful");
         setIsFavorite(false);
         updateUser(user);
     }
    })
    .catch(e => {
     alert(e);
    });
 }

    return (

        <Card className="h-100" style={{ width: '48rem' }}>
            <Card.Img variant="top" src={movie.imageURL} alt={movie.title} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{ movie.description }</Card.Text>
                <Card.Text>{ movie.year }</Card.Text>      
                <Card.Subtitle>Director Information</Card.Subtitle>
                <Card.Text>{ movie.directorName } ({ movie.directorBirthYear } - { movie.directorDeathYear })</Card.Text>
                <Card.Text>{ movie.directorBio }</Card.Text>
                <Card.Subtitle>Genre Information</Card.Subtitle>
                <Card.Text>{ movie.genreName }</Card.Text>
                <Card.Text>Description: { movie.genreDescription }</Card.Text>
                <Card.Text>Featured: { movie.isFeatured }</Card.Text>
                <Link to={`/`}>
                    <Button variant="secondary" className="me-5">Back</Button>
                </Link>
                <Button variant="primary" className="me-5" onClick={(addFavorite)}>Add to Favorites</Button>
                <Button variant="danger" onClick={(deleteFavorite)}>Delete from Favorites</Button>
            </Card.Body>
        </Card>
    )

}