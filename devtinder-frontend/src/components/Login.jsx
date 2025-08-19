import React from 'react';
import {useState} from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
      const navigate = useNavigate();


  const handleLogin = async() => {
    try{    
        const res = await axios.post("http://localhost:3000/login",{
        emailId,
        password,
    },
    {withCredentials: true}
    
  );
  dispatch(addUser(res.data));
      return navigate("/");

  }catch(err){
    setError(err?.response?.data);
  }

  };

  const hadleSignUp = async() => {
    try{
        const res = await axios.post("http://localhost:3000/signup",{
        firstName,
        lastName,
        emailId,
        password,
    },
    {withCredentials: true}
  );
  dispatch(addUser(res.data.data));
      return navigate("/profile");
  }catch(err){
    setError(err?.response?.data);
  }
  };  

  return (
    <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center">{isLogin ? "Login" : "Sign Up"}</h2>
     <div className='py-4'>

      {!isLogin && (

      <>
      <fieldset className="fieldset">
  <legend className="fieldset-legend">First Name</legend>
  <input type="text"
    value={firstName}
    placeholder='Type here'
    className='input'
    onChange={(e) => setFirstName(e.target.value)}
    />
</fieldset>

<fieldset className="fieldset">
  <legend className="fieldset-legend">Last Name</legend>
  <input type="text"
      value={lastName}
    placeholder='Type here'
    className='input'
        onChange={(e) => setLastName(e.target.value)}

    />
</fieldset>
</>
      )}

        <fieldset className="fieldset">
  <legend className="fieldset-legend">Email ID</legend>
  <input type="text"
    value={emailId}
    placeholder='Type here'
    className='input'
    onChange={(e) => setEmailId(e.target.value)}
    />
</fieldset>

<fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
  <input type="password"
      value={password}
    placeholder='Type here'
    className='input'
        onChange={(e) => setPassword(e.target.value)}

    />
</fieldset>

     </div>
     <p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={isLogin ? handleLogin : hadleSignUp}>
        {isLogin ? "Login" : "Sign Up"}
        </button>
    </div>
    <p className='m-auto cursor-pointer py-2' onClick={() => setIsLogin((value)=> !value)}>{!isLogin ? "Login here" : "Sign Up here"}</p>
  </div>
</div></div>
  );
};

export default Login;