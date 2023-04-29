import { PropTypes } from "prop-types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

export const MovieCard = ({ movieData, onMovieClick }) => {
    return (
        <Card className="h-100" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={movieData.imageURL} alt={movieData.title} />
            <Card.Body>
                <Card.Title>{movieData.title}</Card.Title>
                <Card.Text>Director: {movieData.directorName}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movieData.id)}`}>
                    <Button variant="primary" >Movie Details</Button>
                </Link>
            </Card.Body>
        </Card>    
    );
};

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genreName: PropTypes.string.isRequired,
        genreDescription: PropTypes.string,
        directorName: PropTypes.string,
        directorBio: PropTypes.string.isRequired,
        directorBirthYear: PropTypes.number.isRequired,
        directorDeathYear: PropTypes.number,
        actors: PropTypes.array,
        imageURL: PropTypes.string,
        year: PropTypes.number.isRequired,
        isFeatured: PropTypes.bool
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};