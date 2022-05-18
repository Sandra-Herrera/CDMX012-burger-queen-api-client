import React, { useContext, useState } from 'react'
import { UserContext } from '../database/UserProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const {loginUser} = useContext(UserContext);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      await loginUser (email, password, username);
      console.log('Inició sesión')
      navigate('/home');
    } catch (error){
      console.log(error);
    }
    };

  return (
    <React.Fragment>
        <h1>Iniciar sesión</h1>
        <br/>
        <form onSubmit={handleSubmit}>
        <input type={'email'} placeholder='Ingresa tu correo' className='inputLogin' id='inputEmail' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <br/>
        <input type={'password'} placeholder='Ingresa tu contraseña' className='inputLogin' id='inputPassword' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <br/>
        <input type={'text'} placeholder='Username' className='inputLogin' id='inputUsername' value={username} onChange={(e) => setUsername(e.target.value)}/>
        <br/>
        <button type= 'submit' id='buttonContinue'>
            Ingresar
          </button>
          </form>
      </React.Fragment>
  )
}

export default Login