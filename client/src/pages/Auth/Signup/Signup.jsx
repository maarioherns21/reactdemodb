import { useState } from "react"
import "./Style.css"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"



const Signup = ({setToken}) => {
const [formData, setFormData]  = useState({ name: "" , email :"" , password: ""})
const [error, setError] =useState(null)
const [isLoading, setIsLoading] =useState(false)

const fetchData = async (e) => {
  e.preventDefault();
  try {
    const token = { ...formData };
    console.log(token);
    setIsLoading(true);
    const res = await fetch("http://localhost:3001/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(token),
    });
    const data = await res.json();
    if (data) {
        Cookies.set("token", data.token, { expires: 1 });
        Cookies.set("user", data.user.id, { expires: 1 });
        console.log(data.user);
        setError(null);  
        setIsLoading(false);
      } else {
        setError(data.message);
      }
  } catch (error) {
    setError({ message: error.message });
    setIsLoading(false);
  }
};

return (
        <>
        {error && <p>{error.message}</p>}
        {isLoading && <p>Loading... </p>}
        <h1>Register</h1>
       <form onSubmit={fetchData} className="form">
        <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}  placeholder="name"/>
        <input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}  placeholder="email" />
        <input value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}  placeholder="password" />
        <button>Submit</button>
       </form>
       <Link to={"/login"}>Log in</Link>
        </>
    )
}

export default Signup