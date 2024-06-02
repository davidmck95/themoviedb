import Movie from './Movie'
import '../styles/movies.scss'

const Movies = ({ movies, viewTrailer }) => {

    return (
        <div data-testid="movies" className="wrapper col-3 col-sm-4 col-md-3 col-lg-3 col-xl-2">
            {movies.map((movie) => {
                return (
                        <Movie 
                            movie={movie} 
                            key={movie.id}
                            viewTrailer={viewTrailer}
                        />
                )
            })}
        </div>
    )
}

export default Movies
