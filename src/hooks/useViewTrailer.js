import { useState } from 'react'
import { getMovie } from '../api/movieDbApi'

const useViewTrailer = () => {
  const [videoKey, setVideoKey] = useState()

  const viewTrailer = async (movie) => {
    setVideoKey(null)
    setVideoKey(await getMovie(movie.id))
  }

  return [videoKey, viewTrailer]
};

export default useViewTrailer
