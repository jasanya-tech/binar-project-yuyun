import React, {useEffect, useState} from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import '../../node_modules/react-loading-skeleton/dist/skeleton.css'
import { Link, useNavigate } from "react-router-dom";
import './card.scss'
import { Star } from "@mui/icons-material";

const Card = ({movie}) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return <>
  {
    isLoading
    ?
    <div className="cards">
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton height={300} duration={5} />
        </SkeletonTheme>
    </div>
    :
    <Link to={`/movie/${movie.id}`} style={{textDecoration:"none", color:"white"}}>
        <div className="cards">
            <img className="cards__img" src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} />
            <div className="cards__info">
                <div className="card__title">{movie?movie.original_title:""}</div>
                <div className="card__runtime">
                    {movie?movie.release_date:""}
                    <span className="card__rating">{movie?movie.vote_average:""}<Star /></span>
                </div>
                <div className="card__description">{movie ? movie.overview.slice(0,118)+"..." : ""}</div>
            </div>
        </div>
    </Link>
  }
  </>;
};

export default Card;
