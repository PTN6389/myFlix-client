import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

export const MovieView = ({ movie, onBackClick }) => {
    return (

        <Card className="h-100" style={{ width: '48rem' }}>
            <Card.Img variant="top" src={movie.imageURL} alt={movie.title} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                    <div className="mb-4">
                        <p>{ movie.description }</p>
                        <p>{ movie.year }</p>
                    </div>
                    <div className="mb-4">
                        <h6>Director Information</h6>
                        <span>{ movie.directorName } ({ movie.directorBirthYear } - { movie.directorDeathYear }) </span>
                        <p>{ movie.directorBio }</p>
                    </div>                
                    <div className="mb-4">
                        <p></p>
                        <h6>Genre Information</h6>
                        <span>{ movie.genreName }</span>
                        <p>Description: { movie.genreDescription }</p>
                    </div>
                    <div className="mb-4">
                        <p>Featured:</p>  
                        <span>{ movie.isFeatured }</span>
                    </div>
                </Card.Text>
                    <Button onClick={onBackClick} variant="primary">Back</Button>
            </Card.Body>
        </Card>
    )

}