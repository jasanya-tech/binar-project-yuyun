import React, { useEffect, useState } from 'react'
import './detail.scss'
import { useParams } from 'react-router-dom'
import { Star } from '@mui/icons-material'

const Detail = () => {
  const [currentMovieDetail, setMovie] = useState()
  const { id } = useParams()

  useEffect(() => {
    getData()
    window.scrollTo(0,0)
  }, [])

  const getData = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=5c194099c67a3171c30a77d836b92867&language=en-US`)
    .then(res => res.json())
    .then(data => setMovie(data))
  }
  
  return (
    <div className="detailBase">
      <div className='movie'>
        <div className="movie__gambar">
          <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
        </div>
        <div className="movie__detail">
          <div className="detail__kiri">
            <div className="movie__posterBox">
              <img className='movie__poster' src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
            </div>
          </div>
          <div className="detail__kanan">
            <div className="detail__top">
              <div className="detail__nama">
                {currentMovieDetail ? currentMovieDetail.original_title : ""}
              </div>
              <div className="detail__tagline">
                {currentMovieDetail ? currentMovieDetail.tagline : ""}
              </div>
              <div className="detail__rating">
                {currentMovieDetail ? currentMovieDetail.vote_average : ""}
                <Star />
                <span className="detail__count">
                  {currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}
                </span>
              </div>
              <div className="detail__runtime">       {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
              </div>
              <div className="detail__release">  {currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}
              </div>
              <div className="detail__genres">
                {
                  currentMovieDetail && currentMovieDetail.genres? 
                  
                  currentMovieDetail.genres.map(genre => (
                    <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                  )) 
                  : ""
                }
              </div>
            </div>
            <div className="detail__bottom">
              <div  className="detail__sinopsis">Sinopsis
              </div>
              <div className='detail__overview'>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail