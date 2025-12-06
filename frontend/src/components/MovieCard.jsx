    import React from 'react'

    const MovieCard = ({movie:{name, rating, image, premiered,language}}) => {
    return (
        <div className='movie-card'>
            <img src={image ? `${image.medium}`: '/no-movie.png'} alt={name}/>
            
            <div className='mt-4'>
                <h3>{name}</h3>
                
                <div className='content'>
                    
                    <div className='rating'>
                        <img src="star.svg" alt="star" />
                        <p>{rating ? rating.average : 'N/A'}</p>
                    </div>

                    <span>•</span>
                    <p className='lang'>{language}</p>
                    <span>•</span>
                    <p className='year'>
                        {premiered ? premiered.split('-')[0] : 'N/A'}
                    </p>

                </div>
            </div>
        </div>
    )
    }

    export default MovieCard
