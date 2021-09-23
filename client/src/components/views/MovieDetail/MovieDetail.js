import React, {useEffect, useState } from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite';
import { Row } from 'antd';



function MovieDetail(props) {

  let movieId = props.match.params.movieId;

  const [movie, setMovie] = useState([]);
  const [casts, setCasts] = useState([]);
  const [actorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
    .then(res => res.json())
    .then(json => {
      setMovie(json);
    })
    
    fetch(endpointCrew)
    .then(res => res.json())
    .then(json => {
      setCasts(json.cast);
    })
  }, [])

  const toggleActorView = () => {
    setActorToggle(!actorToggle);
  }

  return (
    <div>
      {/* Header */}
      <MainImage 
        image={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`} 
        title={movie.original_title}
        text={movie.overview}
      /> 


      {/* Body */}

      <div style={{width:'85%', margin: '1rem auto'}}>
        <div style={{display:'flex', justifyContent:'flex-end'}}>
          <Favorite movieInfo={movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
        </div>

      {/* Movie Info */}
      <MovieInfo 
        movie={movie}
      />

      <br />


      {/* Actors Grid */}

        <div style={{display:'flex', justifyContent: 'center', margin: '2rem'}}>
          <button onClick={toggleActorView}>Toggle Actor View</button>
        </div>
        {actorToggle && 
          <Row gutter={[16, 16]}>
            {casts && casts.map((casts, idx) => (
              <React.Fragment key={idx}>
                    <GridCards 
                        image={casts.profile_path ? `${IMAGE_BASE_URL}w500${casts.profile_path}` : null}
                        characterName={casts.name}
                        />
                </React.Fragment>
            ))}
          </Row>
        }


      </div>
    </div>
  )
}

export default MovieDetail
