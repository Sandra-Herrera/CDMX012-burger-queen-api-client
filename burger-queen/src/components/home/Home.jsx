import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../database/UserProvider';

const Home = () => {
  const { logOut } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClickLogout = async () => {
    try {
      await logOut();
      console.log('cerró sesión');
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
    <h1>Welcome home</h1>
    <button onClick={handleClickLogout}>Log out</button>
    </React.Fragment>
  )
}

export default Home