import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Card from '../Components/Card';
import './search.scss'

const Search = () => {

    const location = useLocation();
    const keyword = location.state ? location.state.keyword : null;
    const [allMovie, setAllMovie] = useState([])

    const getSearchMovie = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${keyword}&api_key=5c194099c67a3171c30a77d836b92867&language=en-US&page=1`, keyword)
        const res = response.data.results
        console.log(res)
        if (res) {
            setAllMovie(res)
        }
    }

    useEffect(() => {
        if(keyword){
            getSearchMovie()
        }
    }, [keyword])

    return (
    <>
        <div className='search'>
            <h2>Search result '{keyword}'</h2>
            {allMovie.map((movie) => (
                <Card movie={movie} />
            ))}
        </div>
    </>
  )
}

export default Search