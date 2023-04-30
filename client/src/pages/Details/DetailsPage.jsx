import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditForm from "../../components/EditForm/EditForm";
import Popup from "reactjs-popup";

const DetailsPage = () => {
  const user = Cookies.get("user");
  const [movieData, setMovieData] = useState([]);
  const params = useParams();
  const router = useNavigate();
  const [dataForm, setDataForm] = useState({ comment: "", user: user });
  const [like, setlike] = useState({ user: user });

  const fetchDetails = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/movies/${params.id}`);
      const data = await res.json();
      console.log(data);
      setMovieData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/movies/${params.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      router("/");
    } catch (error) {
      console.log(error);
    }
  };

  const likeMmovies = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3001/api/movies/${params.id}/likes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(like),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const commentMmovies = async (e) => {
    e.preventDefault();
    try {
      //  const comment = {}
      const res = await fetch(
        `http://localhost:3001/api/movies/${params.id}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...dataForm }),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (!movieData) return "Loading....";

  return (
    <>
      <h1>{movieData.name}</h1>
      <img src={movieData.image} alt={movieData.name} style={{ height: "420px"}} />
      <h2>{movieData.body}</h2>
      <h2>{movieData.user?.name}</h2>
      <Popup trigger={<button>Edit</button>}>
        <EditForm movie={movieData} />
      </Popup>
      <button onClick={likeMmovies}>Like{movieData.likes?.length}</button>
      <button onClick={handleDelete}>Delete</button>
      <textarea
        value={dataForm.comment}
        onChange={(e) => setDataForm({ ...dataForm, comment: e.target.value })}
      />
      <button onClick={commentMmovies}>Comment</button>
      <div>
        {movieData.comments?.map((comm) => (
          <div>
            <h2>{comm.comment}</h2>
            <h2>{comm.user.name}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default DetailsPage;
