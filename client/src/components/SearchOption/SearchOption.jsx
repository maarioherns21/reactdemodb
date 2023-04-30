import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";

const SearchOption = ({ movies }) => {
  const [input, setInput] = useState([]);
  const [output, setOutput] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const searchByName = () => {
    try {
      movies.filter((movie) => {
        setIsPending(true);
        if (movie.name.toLowerCase().includes(input.toLowerCase())) {
          setOutput((output) => [...output, movie]);
          setError(null);
          setIsPending(false);
        } else {
          setError(null);
          setIsPending(false);
        }
      });
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };

  useEffect(() => {
    setOutput([]);
    searchByName();
    // eslint-disable-next-line
  }, [input]);

  console.log(input);
  return (
    <>
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      <h1>Search</h1>
      <input onChange={(e) => setInput(e.target.value)} />
      <Popup trigger={<button>Search</button>}>
        {output.map((movie) => (
          <div trigger={<button>Search</button>} key={movie._id}>
            <Link to={`/movie/${movie._id}`}>
              <h1>{movie.name}</h1>
            </Link>
          </div>
        ))}
      </Popup>
    </>
  );
};

export default SearchOption;
