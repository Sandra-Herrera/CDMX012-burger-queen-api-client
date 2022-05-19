import React from 'react'
import { useContext, useState } from 'react';
import { UserContext } from '../../database/UserProvider';
// import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  
  // const navigate = useNavigate();

  const {createUser} = useContext(UserContext);

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(email, password, username);
    try{
      await createUser (email, password, username);
      // navigate('/home');
    } catch (error){
      console.log(error);
    }
    };

  return (
    <React.Fragment>
    <h1>Crear usuario</h1>
    <br/>
    <form onSubmit={handleSubmit}>
    <input type={'email'} placeholder='E-mail' className='inputLogin' id='inputEmail' value={email} onChange={(e) => setEmail(e.target.value)}/>
    <br/>
    <input type={'password'} placeholder='Password' className='inputLogin' id='inputPassword' value={password} onChange={(e) => setPassword(e.target.value)}/>
    <br/>
    <input type={'text'} placeholder='Username' className='inputLogin' id='inputUsername' value={username} onChange={(e) => setUsername(e.target.value)}/>
    <br/>
    <select>
        <option>Mesero</option>
        <option>Cocina</option>
        <option>Administrador</option>
    </select>
    <br/>
    <button type= 'submit' id='buttonContinue'>
        Ingresar
    </button>
    </form>
  </React.Fragment>
  )
}

export default Signup