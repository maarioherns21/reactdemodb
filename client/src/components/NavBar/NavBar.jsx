import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const NavBar = ({ removeCookieToken, token }) => {
  const user = Cookies.get("user");

  return (
    <>
      <Link to={"/"}>Home</Link>
      {token ? (
        <>
          <Link to={"/form"}>Create</Link>
          <Link to={`/user/${user}`}>Profile</Link>
          <button onClick={removeCookieToken}>logout</button>
        </>
      ) : (
        <>
          <Link to={"/signup"}>Sign in</Link>
        </>
      )}
    </>
  );
};

export default NavBar;
