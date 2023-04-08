import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router';
import { Link } from "react-router-dom";

export const MovieView = ({ movie, onBackClick }) => {
    const { movieID } = useParams();

    const movie = movies.find((m) => m.id === movieID);

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
                    <Button variant="primary">Back</Button>
                </Link>
            </Card.Body>
        </Card>
    )

}