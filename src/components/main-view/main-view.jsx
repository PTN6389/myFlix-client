import { useState, useEffect } from "react";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { ProfileView } from "../profile-view/profile-view";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token"); 
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);

    const updateUser = user => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    }
    
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
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                }} 
            />
            <Row>
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={8}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }              
                    />
                    <Route 
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={8}>
                                        <LoginView 
                                        onLoggedIn={(user, token) => {
                                        setUser(user);
                                        setToken(token);}} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route 
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                        <Col md={8}>
                                            <div>The movies list is empty
                                            </div>
                                        </Col>  
                                ) : (
                                    <Col md={8}>
                                        <MovieView
                                        movies={movies} 
                                        //movie={selectedMovie} 
                                        onBackClick={() => setSelectedMovie(null)} />
                                    </Col>
                                    
                                )} 
                            </>
                        }
                    />
                    <Route 
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                        <Col md={8}>
                                            <div>The movies list is empty
                                            
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
                                )} 
                            </>
                        }
                    />
                    <Route 
                        path="/profile"
                        element={
                            
                                !user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col md={8}>
                                        <ProfileView user={user} token={token} onLoggedOut={() => {
                                            setUser(null);
                                            setToken(null);
                                            localStorage.clear();
                                        }}
                                        updateUser={updateUser}/>
                                    </Col>
                                    )
                            
                        }
                    />
                    
                </Routes>
            </Row>
        </BrowserRouter>
    )
}