import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from './Card'
import './movieList.scss'

const MovieList = () => {
  const [movieList, setMovieList] = useState([])
  const {type} = useParams()

  const getData = async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=5c194099c67a3171c30a77d836b92867&language=en-US`)
    const res = response.data.results
    setMovieList(res)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    getData()
  }, [type])

  return (
    <div className='movie__list'>
        <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()} MOVIES</h2>
        <div className="list__cards">
            {
                movieList.map(movie => (
                    <Card movie={movie} />
                ))
            }
        </div>
    </div>
  )
}

export default MovieList