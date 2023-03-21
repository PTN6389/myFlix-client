import { useState, useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    
   useEffect(() => {
        if (!token) return;
        

        fetch('https://myflix-movieapp.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then ((response) => response.json())
        .then ((movies) => {
            const moviesFromApi = movies.map((movie) => {
                return {
                    id: movie._id,
                    title: movie.title,
                    description: movie.description,
                    genreName: movie.genre.name,
                    genreDescription: movie.genre.description,
                    directorName: movie.director.name,
                    directorBio: movie.director.bio,
                    directorBirthYear: movie.director.birthYear,
                    directorDeathYear: movie.director.deathYear,
                    actors: movie.actors,
                    imageURL: movie.imageURL,
                    isFeatured: movie.isFeatured,
                    year: movie.year
               }
            });
            setMovies(moviesFromApi);
            
        })
    }, [token]);

    return (
        <Row>
            {!user ? (
                <Col md={8}>
                    <LoginView 
                        onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);}} />
                    or
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col>
                    <MovieView 
                        movie={selectedMovie} 
                        onBackClick={() => setSelectedMovie(null)} />
                </Col>
            ) : movies.length === 0 ? (
                <Col>
                    <div>The movies list is empty
                    <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
                    </div>
                </Col>
            ) : (
                <>
                    {movies.map((movie) => (
                        <Col key={movie.id} s={3} className="mb-5">
                            <MovieCard 
                                movieData={movie}
                                onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                                }} />
                        </Col>
                    ))};
                </>
            )
            }
        </Row>
    )
}