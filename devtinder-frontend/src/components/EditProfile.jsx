import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
   const [firstName, setFirstName] = useState(user.firstName);
     const [lastName, setLastName] = useState(user.lastName);
     const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
     const [age,setAge] = useState(user.age || "");
     const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about);
        const [ showToast, setShowToast ] = useState(false);

    const dispatch = useDispatch();


     const [error, setError] = useState("");

     const saveProfile = async () => {
        setError("");
         try{
               const res = await axios.patch("http://localhost:3000/profile/edit",{
                firstName, lastName, photoUrl, age, gender, about
               },{withCredentials: true});
               setShowToast(true);
               setTimeout(() => {
                     setShowToast(false);
               },3000);
               dispatch(addUser(res?.data?.data));
               
               
               
         }
         catch(err){
             setError(err?.response?.data);
         }
     };

  return (
    <>
    <div className='flex justify-center my-10 mb-20'>
     <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center">Edit Profile</h2>
     <div className='py-4'>

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

<fieldset className="fieldset">
  <legend className="fieldset-legend">Photo Url</legend>
  <input type="text"
    value={photoUrl}
    placeholder='Type here'
    className='input'
    onChange={(e) => setPhotoUrl(e.target.value)}
    />
</fieldset>

</fieldset>
 <fieldset className="fieldset">
  <legend className="fieldset-legend">Age</legend>
  <input type="text"
    value={age}
    placeholder='Type here'
    className='input'
    onChange={(e) => setAge(e.target.value)}
    />
</fieldset>
 <fieldset className="fieldset">
  <legend className="fieldset-legend">Gender</legend>
  <input type="text"
    value={gender}
    placeholder='Type here'
    className='input'
    onChange={(e) => setGender(e.target.value)}
    />
</fieldset>
 <fieldset className="fieldset">
  <legend className="fieldset-legend">About</legend>
  <input type="text"
    value={about}
    placeholder='Type here'
    className='input'
    onChange={(e) => setAbout(e.target.value)}
    />
</fieldset>


     </div>
     <p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
    </div>
  </div>
</div></div>
   <UserCard user={{firstName, lastName, photoUrl, age, gender, about}}></UserCard>
</div>
{showToast && (
    <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile saved successfully.</span>
  </div>
</div>
)}

</>
  );
};

export default EditProfile;