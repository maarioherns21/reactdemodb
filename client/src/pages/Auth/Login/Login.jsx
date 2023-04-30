import { useState } from "react"
import "./Style.css"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"

const Login = ({setToken}) => {
    const [formData, setFormData]  = useState({ email :"" , password: ""})
    const [error, setError] =useState(null)
    const [isLoading, setIsLoading] =useState(false)

    const fetchData = async (e) => {
      e.preventDefault();
      try {
        const token = { ...formData };
        console.log(token);
        setIsLoading(true);
        const res = await fetch("http://localhost:3001/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(token),
        });
        const data = await res.json();
        if (data.token) {
            Cookies.set("token", data.token, { expires: 1 });
            Cookies.set("user", data.user.id, { expires: 1 });
            console.log(data.user);
            setError(null);  
            setIsLoading(false);
          } else {
            setError(error);
            setIsLoading(false)
          }
        // console.log(data)
        // setToken(data);
        setError(null);
      } catch (error) {
        setError({ message: error.message });
        setIsLoading(false);
      }
    };
    
    return (
      <>
        {error && <p>{error}</p>}
        {isLoading && <p>Loading... </p>}
        <h1>Log in</h1>
        <form onSubmit={fetchData} className="form">
          <input
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="email"
          />
          <input
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="password"
          />
          <button>Submit</button>
        </form>
        <Link to={"/signup"}>Sign up</Link>
      </>
    );
}

export default Login