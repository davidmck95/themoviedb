import { MOVIE_ENDPOINT } from '../constants'

export const getMovie = async (movie_id) => {
    const URL = MOVIE_ENDPOINT(movie_id);

    const videoData = await fetch(URL)
        .then((response) => response.json())

    if (videoData.videos && videoData.videos.results.length) {
        const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')
        return trailer ? trailer.key : videoData.videos.results[0].key
    }

    return null;
}
