import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);


    const fetchUser = async () => {
        if(userData) return; // If user data already exists, no need to fetch again
        try{
        const res = await axios.get("http://localhost:3000/profile/view",{
            withCredentials:true,
        });
        dispatch(addUser(res.data));

    }
    
    catch(err){
        if(err.status === 401)
        {
        navigate("/login");
        }
        console.error(err);
    }
};
   
useEffect(() => {
    fetchUser();
},[]);

    return (
        <div>
            <NavBar/>
            <Outlet />
            <Footer />
        </div>
    );
};

export default Body;
