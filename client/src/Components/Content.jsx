import { ArrowForward } from '@mui/icons-material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import './content.scss'

const Content = () => {

    const [ popular, setPopular ] = useState([])
    const [ top, setTop ] = useState([])
    const [ upcoming, setUpcoming ] = useState([])

    const getPopular = async () => {
     const response = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=5c194099c67a3171c30a77d836b92867&language=en-US")
     const res = response.data.results
     res.length = 5
     setPopular(res)
   }

   const getTop = async () => {
    const response = await axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=5c194099c67a3171c30a77d836b92867&language=en-US")
    const res = response.data.results
    res.length = 5
    setTop(res)
  }

  const getUpcoming = async () => {
    const response = await axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=5c194099c67a3171c30a77d836b92867&language=en-US")
    const res = response.data.results
    res.length = 5
    setUpcoming(res)
  }
 
   useEffect(() => {
     getPopular()
     getTop()
     getUpcoming()
   })


   

  return (
    <div className='content'>
        <div className="popular">
            <div className="popular__title" >
              <h2>Popular Movie</h2>
              <Link to='/movies/popular' style={{textDecoration:'none'}} >
              <div className="see__popular" >
                <p>See All Movie</p>
                <ArrowForward fontSize='small'/>
              </div>
              </Link>
            </div>
            <div className="popular__movie">
              {popular.map((movie) => (
                <Card movie={movie} />
            ))}
              </div>
        </div>
        <div className="topRated">
            <div className="top__title" >
              <h2>Top Rated Movie</h2>
              <Link to='/movies/top_rated' style={{textDecoration:'none'}}>
              <div className="see__top" >
                <p>See All Movie</p>
                <ArrowForward fontSize='small'/>
              </div>
              </Link>
            </div>
            <div className="top__movie">
              {top.map((movie) => (
                <Card movie={movie} />
            ))}
              </div>
        </div>
        <div className="upcoming">
            <div className="upcoming__title" >
              <h2>Upcoming Movie</h2>
              <Link to='/movies/upcoming' style={{textDecoration:'none'}}>
              <div className="see__upcoming" >
                <p>See All Movie</p>
                <ArrowForward fontSize='small'/>
              </div>
              </Link>
            </div>
            <div className="upcoming__movie">
              {upcoming.map((movie) => (
                <Card movie={movie} />
            ))}
              </div>
        </div>
    </div>
  )
}

export default Content