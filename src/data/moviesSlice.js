import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchMovies = createAsyncThunk('fetch-movies', async ({apiUrl, isScrolling}) => {
    const response = await fetch(apiUrl)
    const data = await response.json()
    return { data, isScrolling }
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState: { 
        movies: [],
        fetchStatus: '',
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload.isScrolling ? [...state.movies, ...action.payload.data.results] : action.payload.data.results
            state.fetchStatus = 'success'
            state.loading = false
        }).addCase(fetchMovies.pending, (state) => {
            state.loading = true
            state.fetchStatus = 'loading'
        }).addCase(fetchMovies.rejected, (state) => {
            state.loading = false
            state.fetchStatus = 'error'
        })
    }
})

export default moviesSlice
