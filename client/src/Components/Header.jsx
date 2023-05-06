import React, { useEffect, useState } from 'react'
import './header.scss'
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Star } from '@mui/icons-material';

const Header = () => {

  const navigate = useNavigate()

  const [ popularMovies, setPopularMovies ] = useState([])

   //===== 3. CARA AWAIT, ASYNC, AXIOS =====
   const getPopularMovies = async () => {
    const response = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=5c194099c67a3171c30a77d836b92867&language=en-US")
    const res = response.data.results
    res.length = 3
    setPopularMovies(res)
  }

  useEffect(() => {
    getPopularMovies()

    //===== 2.CARA AXIOS (CARA YANG BIASA DIPAKAI)=====
    // axios.get("https://api.themoviedb.org/3/movie/popular?api_key=5c194099c67a3171c30a77d836b92867&language=en-US").then((resp) =>{
    //   setPopularMovies(resp.data.results)
    // })

    //===== 1.CARA FETCH (CARA PALING DASAR) =====
    // fetch("https://api.themoviedb.org/3/movie/popular?api_key=5c194099c67a3171c30a77d836b92867&language=en-US")
    // .then(res => res.json())
    // .then(data => setPopularMovies(data.results))
  }, [])

  

  return (
    <div className='header'>
        <div className="headline">
          <Carousel 
            id='slider__carousel'
            autoPlay={true}
            transitionTime={8}
            infiniteLoop={true}
            showStatus={false}
            showThumbs={false}
            // swipeable={true}
            // emulateTouch={true}
            
          >
            {popularMovies.map((movie) => (
              <Link style={{textDecoration:"none"}} to={`/movie/${movie.id}`} >
                <div className="slider__image">
                  <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt={movie.original_title}/>
                </div>
                <div className="slider__info">
                  <div className="slider__title">
                  {movie ? movie.original_title: ""}
                  </div>
                  <div className="slider__runtime">
                    <div className="slider__date">
                      {movie ? movie.release_date : ""}
                    </div>
                    <div className="slider__rating">
                      {movie ? movie.vote_average :""}
                    </div>
                    <div className="logo__rating">
                      <Star />{" "}
                    </div>
                  </div>
                  <div className="slider__deskripsi">
                  {movie ? movie.overview : ""}
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
    </div>
  )
}

export default Header