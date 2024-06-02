import React from 'react';
import Header from './Header';
import { createSearchParams, useSearchParams, useNavigate } from "react-router-dom"
import { fetchMovies } from '../data/moviesSlice'
import { useDispatch } from 'react-redux'
import { SEARCH_ENDPOINT, DISCOVER_ENDPOINT } from '../constants'

const Layout = ({ children }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getSearchResults = (query) => {
        if (query !== '') {
          dispatch(fetchMovies(`${SEARCH_ENDPOINT}&query=`+query))
          setSearchParams(createSearchParams({ search: query }))
        } else {
          dispatch(fetchMovies(DISCOVER_ENDPOINT))
          setSearchParams()
        }
    }
    
    const searchMovies = (query) => {
        navigate('/')
        getSearchResults(query)
    }

    return (
        <div className="App">
          <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />
          <div className="container">
            {children}
          </div>
        </div>
    );
};

export default Layout;
