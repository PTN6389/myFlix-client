export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.imageURL} />
            </div>
            <div>
                <span>Title:</span>
                <span>{ movie.title }</span>  
            </div>
            <div>
                <span>Description:</span>
                <span>{ movie.description }</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{ movie.directorName }</span>
            </div>
            <div>
                <span>Director Biography: </span>
                <span>{ movie.directorBio }</span>
            </div>
            <div>
                <span>Director Birth Year: </span>
                <span>{ movie.directorBirthYear }</span>
            </div>
            <div>
                <span>Director Death Year: </span>
                <span>{ movie.directorDeathYear }</span>
            </div>
            <div>
                <span>Genre Name: </span>
                <span>{ movie.genreName }</span>
            </div>
            <div>
                <span>Genre Description: </span>
                <span>{ movie.genreDescription }</span>
            </div>
            <div>
                <span>Year: </span>
                <span>{ movie.year }</span>
            </div>
            <div>
                <span>Featured: </span>
                <span>{ movie.isFeatured }</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    )

}