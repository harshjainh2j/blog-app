import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function Protected({authentication=true,children}){
const authstatus=useSelector(state=>state.auth.status);
const [loader,setLoader]=useState(true);
const navigate=useNavigate();

useEffect(()=>{
    if(authentication && authstatus!==authentication){
        navigate('/login');
    }
    else if(!authentication && authstatus!==authentication){
        navigate('/');
    }
    setLoader(false);
},[navigate,authstatus,authentication]);


return loader?<h1>Loading...</h1>:<>{children}</>;



}