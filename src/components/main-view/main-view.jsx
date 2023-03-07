import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {   id: 1, 
            title: 'Top Gun: Maverick', 
            description: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN&#39s elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.' , 
            genre: 'Action',
            director: 'Joseph Kosinski',
            imageURL: 'https://www.imdb.com/title/tt1745960/',
            year: 2022
        },
        {   id: 2, 
            title: 'The Equalizer',
            description: 'A man who believes he has put his mysterious past behind him cannot'  , 
            genre: 'Action',
            director: 'Antoine Fuqua',
            imageURL: 'https://www.imdb.com/title/tt0455944/',
            year: 2014
        },
        {   id: 3, 
            title: 'Die Hard',
            description: 'A New York City police officer tries to save his estranged wife and several others taken hostage by terrorists' , 
            genre: 'Action',
            director: 'John McTiernan',
            imageURL: 'https://www.imdb.com/title/tt0095016/',
            year: 1988
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

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