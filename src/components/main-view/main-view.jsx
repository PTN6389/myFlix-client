import { useState, useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

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

    if (!user) {
        return (
        <>
            <LoginView 
                onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
        }} />
        or
        <SignupView />
        </>
        );
    }
  
    if(selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The movies list is empty
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </div>;
    }

    return (
        <div>
            {movies.map((movie) => {
                return ( 
                    <MovieCard 
                            key={movie.id}
                            movieData={movie}
                            onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                            }} 
                        />);
            })}
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </div>
    );
}