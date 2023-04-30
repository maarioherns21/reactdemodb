import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const [userData, setUserData] = useState([]);
  const params = useParams();

  const fetchProfile = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/users/${params.id}`);
      const data = await res.json();
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if(!userData)  return "Loading..."

  return (
    <>
      <h1>{userData.person?.name}</h1>
      <h1>{userData.person?.email}</h1>
      <h2>Comments made</h2>
      <div>{userData.comments?.map((comm) => (
        <div key={comm._id}>
            <h1>{comm.comment}</h1>
        </div>
      ))}</div>
    </>
  );
};

export default ProfilePage;
