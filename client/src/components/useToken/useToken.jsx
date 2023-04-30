import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useToken = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storeUser = Cookies.get("user");
    if (storedToken) {
      setToken(storedToken);
      setUser(storeUser);
    }
  }, []);

  const removeCookieToken = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setToken(null);
  };

  return {
    token,
    removeCookieToken,
    user,
  };
};

export default useToken;
