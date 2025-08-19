import React from 'react'
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import axios from 'axios';

const UserCard = ({user}) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
    const dispatch = useDispatch();
    
    const handleSendRequest = async (status, userId) => {
         try{
            const res = await axios.post("http://localhost:3000/request/send/"+status+"/"+userId,{},{
              withCredentials: true
            });
            dispatch(removeUserFromFeed(userId));
         }catch(err){
            console.error("Error sending request:", err);
         }
    };

  return  (
   
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={user.photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    <p>{age + ", " + gender}</p>
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
              <button className="btn btn-primary" onClick={()=> handleSendRequest("ignored", _id)}>Ignore</button>

      <button className="btn btn-secondary" onClick={()=> handleSendRequest("interested", _id)}>Interested</button>
    </div>
  </div>
</div>
  
);
};

export default UserCard;