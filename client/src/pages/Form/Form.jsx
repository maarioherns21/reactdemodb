import { useState } from "react";
import "./Style.css";
import FileBase from "react-file-base64";
import { useNavigate, useParams } from "react-router-dom";

const Form = ({ user }) => {
  const [formData, setFormData] = useState({
    name: "",
    body: "",
    image: "",
    user: user,
  });
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const router = useNavigate();


  const hadleForm = async (e) => {
    e.preventDefault();
    try {
      const movie = { ...formData };
      const res = await fetch("http://localhost:3001/api/movies/create", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(movie),
      });
      const data = await res.json();
      console.log(data);
      if (data) return router("/");
      setError(null);
      setIsPending(false);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };


  return (
    <>
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      <h1>Create</h1>
      <form className="form" onSubmit={hadleForm}>
        <input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
        />
        <FileBase
          type="file"
          value={formData.image}
          multiple={false}
          onDone={({ base64 }) => setFormData({ ...formData, image: base64 })}
        />
        <button>Submit</button>
      </form>
    </>
  );
};

export default Form;
