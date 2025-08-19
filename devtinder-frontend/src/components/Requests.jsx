import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
  
  const requests = useSelector((state) => state.request);  // Changed from requests to request
  const dispatch = useDispatch();



  const reviewRequest = async (status, _id) => {
    try{
         const res = await axios.post(
          "http://localhost:3000/request/review/"+status+"/"+_id,
          {},
          {withCredentials:true}
        );
        dispatch(removeRequest(_id));

    }
    catch(err){
      console.error("Error reviewing request:", err);
    }
  }

  const fetchRequests = async () =>{

    try{
        const res = await axios.get("http://localhost:3000/user/requests/received",
          {withCredentials:true}
        );
        dispatch(addRequests(res.data.data));
    }
    catch(err){
      console.error("Error fetching requests:", err);
    }
  };
  
  useEffect(() =>{
   fetchRequests();
  },[]);

  if(requests === undefined || requests === null) return <div>Loading...</div>;
  if(requests.length === 0) return <div className='flex justify-center my-10'>No Requests Found</div>;

  return (
    <div className='text-center my-10'>
      <h1 className='text-bold text-white text-3xl'>Connection Requests</h1>
    {requests.map((request)=>
    {
      const {_id,firstName, lastName, photoUrl, age, gender, about} = request.fromUserId;
      return(
      <div key={_id} className='flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto'>
        <div>
          <img alt="photo" 
            className='w-20 h-20 rounded-full' 
            src={photoUrl}></img>
         </div>
         <div className='text-left mx-4'>
          <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
         </div>
        <div>
          <button className="btn btn-primary mx-2" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
         <button className="btn btn-secondary mx-2" onClick={() => reviewRequest("accepted",request._id)}>Accept</button>
        </div>
        </div>
    );
    })}
    </div>
  );
};

export default Requests;