import { Link } from "react-router-dom";



const MovieList = ({movies , title}) => {


    return (
      <>
        <h1>{title}</h1>
        {movies.map((movie) => (
          <div key={movie._id}>
            <Link to={`/movie/${movie._id}`}>
            <img src={movie.image} alt={movie.name} style={{ height: "420px"}} />
            <h2>{movie.name}</h2>
            </Link>
          </div>
        ))}
      </>
    );
}

export default MovieList