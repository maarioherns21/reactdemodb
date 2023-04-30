import { useEffect, useState } from "react";
import MovieList from "./MovieList/MovieList";
import useFetch from "../useFetch/useFetch";
import Pagination from "../Pagination/Pagination";
import SearchOption from "../SearchOption/SearchOption";



const Movies = () => {
  const { movies, error, isLoading } = useFetch();
  const [currenPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(2);

  const lastMovieIndex = currenPage * moviesPerPage;
  const firtsMovieIndex = lastMovieIndex - moviesPerPage;
  const currentMovies = movies.slice(firtsMovieIndex, lastMovieIndex);

  console.log(currentMovies);

  return (
    <>
      {error && <p>{error.message}</p>}
      {isLoading && <p>Loading....</p>}
      <SearchOption movies={movies} />
      <MovieList movies={currentMovies} title="ALL Movies" />
      <Pagination
        totalMovies={movies.length}
        setCurrentPage={setCurrentPage}
        moviesPerPage={moviesPerPage}
      />
    </>
  );
};

export default Movies;
