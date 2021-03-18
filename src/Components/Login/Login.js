import React, { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';

const Login = () => {
    initializeLoginFramework();
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    const [newUser,setNewUser]=useState(false);
    let history=useHistory();
    let location=useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [user,setUser]=useState({
      isSignedIn:false,
      name:'',
      email:'',
      password:'',
      photo:'',
      error:'',
      success: false,
    })
  
    const googleSignIn=() => {
        handleGoogleSignIn()
        .then(res=>{
            handleRedirect(res,true);
        })
    }

    const signOut=() => {
        handleSignOut()
        .then(res=>{
            handleRedirect(res,false);
        })
    }

    const fbSignIn=() => {
        handleFbSignIn()
        .then(res=>{
            handleRedirect(res,true);
        })
    }

    const handleSubmit=(e)=>{
        if(newUser && user.email && user.password){
         createUserWithEmailAndPassword(user.name,user.email,user.password)
         .then(res=>{
          handleRedirect(res,true);
         })
        }else{
         signInWithEmailAndPassword(user.email,user.password)
         .then(res=>{
          handleRedirect(res,true)
         })
        }
        e.preventDefault();
    }
    const handleBlur=(event)=>{
        let isFieldValid=true;
        if(event.target.name==='email'){
           isFieldValid=/\S+@\S+\.\S+/.test(event.target.value);
        }
        if(event.target.name==='password'){
          isFieldValid= /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/.test(event.target.value);
        }
        if(isFieldValid){
          const newUserInfo={...user};
          newUserInfo[event.target.name]=event.target.value;
          setUser(newUserInfo);
        }
        console.log(user);
        
    }

    const handleRedirect=(res,doRedirect) => {
      setUser(res);
      setLoggedInUser(res);
      doRedirect && history.replace(from);
    }
 
    return (
      <div style={{textAlign:'center'}}>
        <h1>Hello,World!</h1>
        {
          user.isSignedIn ?
          <button onClick={signOut}>Sign Out</button> :
          <button onClick={googleSignIn}>Sign In</button>
        }
        <br/>
        <button onClick={fbSignIn}>Log in using facebook</button>
        {
          user.isSignedIn && 
          <div>
            <p>Welcome, {user.name}</p>
            <p>Email: {user.email}</p>
            <img src={user.photo} alt=""/>
          </div>
        }
  
        <h1>Our Authentication</h1>
        <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id=""/>
        <label htmlFor="newUser">New User For Sign Up</label>
        <form onSubmit={handleSubmit}>
        {
          newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Name"/> 
        }<br/>
        <input type="text" name="email" onBlur={handleBlur} placeholder="Email" required/> <br/>
        <input type="password" name="password" onBlur={handleBlur} placeholder="Password" required/> <br/>
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
        </form>
        {
          user.success ? <p style={{color:'green'}}>User {newUser ? 'created' : 'logged in'} successfully </p> : <p style={{color:'red'}}>{user.error}</p>
        }
        
      </div>
    );
};

export default Login;