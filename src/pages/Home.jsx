import Movies from '../components/Movies'
import { useEffect, useState } from 'react'
import { throttle } from 'lodash'
import { useSearchParams } from 'react-router-dom'
import { SEARCH_ENDPOINT, DISCOVER_ENDPOINT } from '../constants'
import { fetchMovies } from '../data/moviesSlice'
import { useDispatch, useSelector } from 'react-redux'
import useViewTrailer from '../hooks/useViewTrailer'
import YouTubePlayer from '../components/YouTubePlayer'
import LoadingSpinner from '../components/LoadingSpinner'

const Home = () => {
    const state = useSelector((state) => state)
    const [pageNumber, setPageNumber] = useState(1)
    const [videoKey, viewTrailer] = useViewTrailer()
    const { movies, loading } = state?.movies
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get('search')

    useEffect(() => {
        const handleScroll = throttle(() => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 500 && !loading
            ) {
                if (searchQuery) {
                    dispatch(fetchMovies({
                        apiUrl: `${SEARCH_ENDPOINT}&query=${searchQuery}&page=${pageNumber + 1}`,
                        isScrolling: true
                    }))
                } else {
                    dispatch(fetchMovies({
                        apiUrl: `${DISCOVER_ENDPOINT}&page=${pageNumber + 1}`,
                        isScrolling: true
                    }))
                }
                setPageNumber((current) => current + 1)
            }
        }, 200)
        window.addEventListener('scroll', handleScroll)

        // cleanup the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll)
            handleScroll.cancel()
        }
    }, [loading])

    const getMovies = () => {
        if (searchQuery) {
            dispatch(fetchMovies({
                apiUrl: `${SEARCH_ENDPOINT}&query=${searchQuery}&page=${1}`,
                isScrolling: false
            }))
        } else {
            dispatch(fetchMovies({
                apiUrl: `${DISCOVER_ENDPOINT}&page=${1}`,
                isScrolling: false
            }))
        }
        setPageNumber(1)
    }

    useEffect(() => {
        getMovies()
    }, [searchQuery])

    return (
        <> 
            {videoKey && <YouTubePlayer videoKey={videoKey} />}

            {movies?.results?.length === 0 && (
                <div style={{padding: "30px"}}><h6>Sorry, there are no movies available at the moment. Try another movie.</h6></div>
            )}

            <Movies movies={movies} viewTrailer={viewTrailer}/>

            {loading && <LoadingSpinner/>}
        </>
    )
}

export default Home
