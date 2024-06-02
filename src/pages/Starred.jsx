import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import starredSlice from '../data/starredSlice'
import Movie from '../components/Movie'
import useViewTrailer from '../hooks/useViewTrailer'
import YouTubePlayer from '../components/YouTubePlayer'
import '../styles/starred.scss'

const Starred = () => {
  const [videoKey, viewTrailer] = useViewTrailer()
  const state = useSelector((state) => state)
  const { starred } = state
  const { clearAllStarred } = starredSlice.actions
  const dispatch = useDispatch()

  return (
    <>
      {videoKey && <YouTubePlayer videoKey={videoKey} />}

      <div className="starred" data-testid="starred">
        {starred.starredMovies.length > 0 && (<div data-testid="starred-movies">
          <h6 className="header">Starred movies</h6>
          <div className="wrapper" >
            {starred.starredMovies.map((movie) => (
              <Movie
                movie={movie} 
                key={movie.id}
                viewTrailer={viewTrailer}
              />
            ))}
          </div>

          <footer className="text-center">
            <button className="btn btn-primary" onClick={() => dispatch(clearAllStarred())}>Remove all starred</button>
          </footer>
        </div>)}

        {starred.starredMovies.length === 0 && (<div className="text-center empty-cart">
          <i className="bi bi-star" />
          <p>There are no starred movies.</p>
          <p>Go to <Link to='/'>Home</Link></p>
        </div>)}
      </div>
    </>
  )
}

export default Starred
