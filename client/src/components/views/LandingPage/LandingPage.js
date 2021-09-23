import React, { useEffect, useState }  from 'react'
import { FaCode } from "react-icons/fa";
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function LandingPage() {

    const [movies, setMovies] = useState([]);

    const [mainMovieImage, setMainMovieImage] = useState(null);

    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() =>  {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint)
        
    }, [])
    
    const fetchMovies = (endpoint) => {
        fetch(endpoint)
        .then(response => response.json())
        .then(json => {
            // console.log(json.results[0].backdrop_path)
            setMovies([...movies, ...json.results]);
            setMainMovieImage(json.results[0]);
            setCurrentPage(json.page);
        })
    }

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
        fetchMovies(endpoint)
    }

    return (
        <div style={{width: '100%', margin: '0'}}>

            {/* Main Image */}
            {mainMovieImage !== null ?
                <MainImage 
                image={`${IMAGE_BASE_URL}w1280${mainMovieImage.backdrop_path}`} 
                title={mainMovieImage.original_title}
                text={mainMovieImage.overview}
                /> 
                : null
            }

            <div style={{width: '85%', margin: '1rem auto'}}>
                
                <h2>Movies by latest</h2>
                <hr/>

                {/* Main Grid Cards */}

                <Row gutter={[16, 16]}>
                    {movies && movies.map((movie, idx) => (
                        <React.Fragment key={idx}>
                            <GridCards 
                                landingPage
                                image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}
                </Row>



            </div>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>
            
        </div>
    )
}

export default LandingPage
