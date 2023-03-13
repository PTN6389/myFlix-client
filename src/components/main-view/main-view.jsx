import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch('https://myflix-movieapp.herokuapp.com/movies')
        .then ((response) => response.json())
        .then ((data) => {
            const moviesFromApi = data.map((doc) => {
                return {
                  id: doc._id,
                  title: doc.title,
                  description: doc.description,
                  genreName: doc.genre.name,
                //   genreDescription: doc.genre.description,
                 //  directorName: doc.director.name,
                 //  directorBio: doc.director.bio,
                //  directorBirthYear: doc.director.birthYear,
                 //  directorDeathYear: doc.director.deathYear,
                //  actors: doc.actors,
                  imageURL: doc.imageURL,
                  isFeatured: doc.isFeatured,
                  year: doc.year
               };
           });

           setMovies(moviesFromApi);

        });
    }, []);

    if(selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The movies list is empty</div>;
    }

    return (
        <div>
            {movies.map((movie) => {
                return <MovieCard 
                            key={movie.id}
                            movieData={movie}
                            onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                            }} />
            })}    
        </div>
    );
}