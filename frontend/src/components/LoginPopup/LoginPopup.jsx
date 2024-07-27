import React, {  useState,useContext } from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets'
import {StoreContext} from '../../context/StoreContext.jsx'
import axios from "axios";

const LoginPopup = ({setShowLogin}) => {
    const {url,setToken,token} = useContext(StoreContext);


    const[currState, setCurrState] = useState('login')
    const [data , setData] = useState({
      name:"",
      email:"",
      password:""
    });

    const onChangehandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}));
    }

    const onLogin = async (event)=>{
    event.preventDefault();
    let newUrl = url;
    if(currState==="login"){
      newUrl += "/api/user/login"
    }
    else{
      newUrl +="/api/user/register"
    }
    const response =  await axios.post(newUrl,data);
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowLogin(false);
    }else{
      alert(response.data.message);
    }

    }




  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        <div className="login-popup-inputs">
           {currState==="login"?<></>: <input type="text" name='name' onChange={onChangehandler} value={data.name} placeholder='Your name' required />} 
            <input type="email" placeholder='Your email' required  name='email' onChange={onChangehandler} value={data.email}/>
            <input type="password" placeholder='password' required  name='password' onChange={onChangehandler} value={data.password}/>
        </div>

        <button type='submit' >{currState==='login'?"Login":"Create account"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to the term of use & privacy policy</p>
        </div>

        {currState==="login"?  <p>Create a new account? <span onClick={()=>setCurrState("sign up")}>Click here</span></p>:  <p>Already have an account ? <span onClick={()=>setCurrState("login")}>Login here</span></p>}
      
      

      </form>
    </div>
  )
}

export default LoginPopup
