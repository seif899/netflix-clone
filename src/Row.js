import YouTube from 'react-youtube';
import React , { useState,useEffect } from 'react';
import axios from './axios';
import './row.css';
import youtube from './youtube';


//AIzaSyAwxLGST_k670dcprej9b8RHjc4NOvkFpc

const BASE_URL='https://image.tmdb.org/t/p/original/';
function Row({title,fetchUrl,isLarge=false }) {
    const [movies,setMovies]=useState([]);
    useEffect( ()=>{
        async function fetchData(){
            const request= await axios.get(fetchUrl)
            const dataResults=request.data.results.filter(result=>{
                return result.backdrop_path!=null
            })
            setMovies(dataResults)
        }
        fetchData();
    },[fetchUrl] )
    
    const [trailerUrl,setTrailerUrl]=useState('');
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    }

    async function getTrailerId(movieName){
        const response = await youtube.get('/search', {
            params: {
                q: `${movieName} trailer`,
            }
        })
        return response.data.items[0].id.videoId

    }

    function handleClick(movie){
        if (trailerUrl){
            setTrailerUrl('')
        }else{
            getTrailerId(movie?.name || movie?.original_title)
            .then(id => {
                setTrailerUrl(id)
            }).catch(error=> console.log(error))
        }
    }
    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row-poster' >
                
                {movies.map(movie=>(
                    <img onClick={()=>handleClick(movie)} className={`poster ${isLarge && 'large-poster'}`} key={movie.id} src={`${BASE_URL}${isLarge? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
                ))}
            </div>
       {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    );
}

export default Row;