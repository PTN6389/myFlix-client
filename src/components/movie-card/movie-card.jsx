import { PropTypes } from "prop-types";

export const MovieCard = ({ movieData, onMovieClick }) => {
    return (<div
                onClick={() => {
                    onMovieClick(movieData)
                }} >
                    {movieData.title}
            </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genreName: PropTypes.string.isRequired,
        genreDescription: PropTypes.string.isRequired,
        directorName: PropTypes.string.isRequired,
        directorBio: PropTypes.string.isRequired,
        directorBirthYear: PropTypes.number.isRequired,
        directorDeathYear: PropTypes.number,
        actors: PropTypes.string,
        imageURL: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        isFeatured: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};