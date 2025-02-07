import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import watchLaterSlice from '../data/watchLaterSlice'
import Movie from '../components/Movie'
import useViewTrailer from '../hooks/useViewTrailer'
import YouTubePlayer from '../components/YouTubePlayer'
import '../styles/watchLater.scss'

const WatchLater = () => {
  const [videoKey, viewTrailer] = useViewTrailer()
  const state = useSelector((state) => state)
  const { watchLater } = state
  const { remveAllWatchLater } = watchLaterSlice.actions
  const dispatch = useDispatch()

  return (
    <>
      {videoKey && <YouTubePlayer videoKey={videoKey} />}

      <div data-testid="watch-later-div">
        {watchLater.watchLaterMovies.length > 0 && (<div data-testid="watch-later-movies">
            <h6 className="header">Watch Later List</h6>
            <div className="wrapper">
              {watchLater.watchLaterMovies.map((movie) => (
                <Movie 
                  movie={movie} 
                  key={movie.id}
                  viewTrailer={viewTrailer}
                />
              ))}
            </div>

            <footer className="text-center">
              <button className="btn btn-primary" onClick={() => dispatch(remveAllWatchLater())}>Empty list</button>
            </footer>
        </div>)}
      </div>

      {watchLater.watchLaterMovies.length === 0 && (<div className="text-center empty-cart">
          <i className="bi bi-heart" />
          <p>You have no movies saved to watch later.</p>
          <p>Go to <Link to='/'>Home</Link></p>
        </div>
      )}
    </>
  )
}

export default WatchLater
