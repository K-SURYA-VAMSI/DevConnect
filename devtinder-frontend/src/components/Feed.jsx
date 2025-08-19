import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {

  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if(feed) return;
    try{const res = await axios.get("http://localhost:3000/feed",{withCredentials: true});
    dispatch(addFeed(res?.data?.data));}
    catch(err){
      console.error(console.error(err));
    }


  };

  useEffect(() => {
    getFeed();
  },[]);

  if(!feed) return;

  if(feed.length <= 0) return <div className='flex justify-center my-10'>No new users found!</div>; 

  return (
    feed && (
    <div className='flex justify-center my-10'>
      <UserCard user= {feed[0]}></UserCard>
    </div>
  )
);
};

export default Feed;