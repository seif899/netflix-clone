import React, { useEffect, useState } from 'react';
import axios from 'axios';
import requests from './requests';
import './banner.css';

function Banner() {
    const [movie,setMovie]=useState([])
    useEffect( () => {
        async function fetchData(){
            const request= await axios.get(`https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`)
            setMovie(
                request.data.results[ randomValue(0,request.data.results.length) ]
            )
            return request
        }
        fetchData();
    },[])

    return (
        <header className='banner'
            style={
                {
                    backgroundImage:` linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url( 'https://image.tmdb.org/t/p/original/${movie?.backdrop_path}' ) `,

                }
            }
        >
            <div className='banner-content'>
                <h1>{movie?.name || movie?.original_name || movie?.title}</h1>

                <div className='banner-btns'>
                   <button className='banner-btn'>Play</button>
                   <button className='banner-btn'>My List</button>
                </div>
                <h1 className='banner_description'>{movie?.overview}</h1>
            </div>
        </header>
        
    );
}

function randomValue(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

export default Banner;