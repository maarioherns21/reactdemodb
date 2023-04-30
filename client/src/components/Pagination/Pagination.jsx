



const Pagination = ({ totalMovies, moviesPerPage, setCurrentPage }) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      {pages.map((page, index) => (
        <button key={index} onClick={() => setCurrentPage(page)}>
          {page}
        </button>
      ))}
    </>
  );
};

export default Pagination;
