export const API_KEY = '8cac6dec66e09ab439c081b251304443'
export const MOVIEDB_ENDPOINT = 'https://api.themoviedb.org/3'
export const DISCOVER_ENDPOINT = `${MOVIEDB_ENDPOINT}/discover/movie?api_key=${API_KEY}&sort_by=vote_count.desc`
export const SEARCH_ENDPOINT = `${MOVIEDB_ENDPOINT}/search/movie?api_key=${API_KEY}`
export const MOVIE_ENDPOINT = (movie_id) => `${MOVIEDB_ENDPOINT}/movie/${movie_id}?api_key=${API_KEY}&append_to_response=videos`
export const YOUTUBE_ENDPOINT = 'https://www.youtube.com/watch?v='