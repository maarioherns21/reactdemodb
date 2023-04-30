import { useEffect, useState } from "react";

const useFetch = () => {
  const [movies, setMovie] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  const fetchMovies = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/movies");
      const data = await res.json();
      console.log(data);
      setMovie(data);
      setError(null);
      setIsloading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return { movies, error, isLoading };
};

export default useFetch;
