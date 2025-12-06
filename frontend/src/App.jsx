
import { useState, useEffect } from 'react'
import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import {useDebounce} from 'react-use';
import { getTrendingMovies, updateSearchCount } from './mongodb';


const API='https://api.tvmaze.com';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage]= useState('');
  const [movieList, setMovieList]= useState([]);
  const [isLoading, setIsLoading]= useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm]= useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(()=> setDebounceSearchTerm(searchTerm), 700, [searchTerm]);

  const fetchMovies= async(query='')=>{
    setIsLoading(true);
    setErrorMessage('');
    try{
      const endpoint= query
      ? `${API}/search/shows?q=${encodeURIComponent(query)}`
      :`${API}/shows?sort_by=popularity.desc`
      const res=await fetch(endpoint);
      if(!res.ok){
        throw new Error('Failed to fetch movies');
      }

      const data=await res.json();
      const normalized = query
      ? data.map(item => item.show)       
      : data;

      setMovieList(normalized);
      
      if(query && normalized.length>0){
        await updateSearchCount(query, normalized[0]);
      }
    }
    catch(e){
      console.error(`Error fetching movies: ${e}`);
      setErrorMessage('Error fetching movies. Please try again.');
    }
    finally{
      setIsLoading(false);
    }
  }
  const loadTrendingMovies=async()=>{
    try{
      const movies=await getTrendingMovies();
      setTrendingMovies(movies);
    }
    catch(error){
      console.log(`Error Fetching Trending Movies: ${error}`);
    }
  }
  useEffect(()=>{
    fetchMovies(debounceSearchTerm);
  },[debounceSearchTerm])

  useEffect(()=>{
    loadTrendingMovies();
  })
  return(
    <main>
        <div className='pattern'/>
        <div className='wrapper'>
          <header>
            <img src="./hero.png" alt="hero" />
            <h1>
              Find <span className='text-gradient'>Movies & Shows</span> You'll Enjoy Without Hassle
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          </header>

          {trendingMovies.length>0 && (
            <section className='trending'>
              <h2>Trending Movies</h2>
              <ul>
                {trendingMovies.map((movie, index)=>(
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className='all-movies'>
            <h2>All Movies</h2>
            {isLoading?(
              <div className='text-white'><Spinner/></div>
            ):errorMessage?(
              <p className='text-red-500'>{errorMessage}</p>
            ):(
              <ul>
                {movieList.map((movie)=>(
                  <MovieCard key={movie.id} movie={movie}/>
                ))}
              </ul>
            )}
          </section>
        </div>
    </main>
  )
}

export default App
