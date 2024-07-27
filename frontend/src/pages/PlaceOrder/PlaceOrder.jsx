import React, { useContext, useState,useEffect } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
 const{getTotalCartAmount,token,food_list,cartItem,url} = useContext(StoreContext);

 const [data , setData] = useState({
  firstName:"",
  lastName:"",
  email:"",
  street:"",
  city:"",
  state:"",
  zipcode:"",
  phone:""

 })
 const onChangeHandler = (event)=>{
  const name = event.target.name;
  const value = event.target.value;
  setData(data=>({...data,[name]:value}))
 }

 const navigate = useNavigate();
 
 const placeOrder = async (e)=>{
  e.preventDefault();
  let orderItems = [];
  food_list.map((item)=>{
    if(cartItem[item._id]>0){
     let itemInfo = item;
     itemInfo["quantity"] = cartItem[item._id];
     orderItems.push(itemInfo);
    }
  })

  let orderData = {
    address:data,
    items:orderItems,
    amount:getTotalCartAmount()+2
  }

  let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
  try {
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  if (!token) {
    
      navigate('/cart')
  }
  else if (getTotalCartAmount() === 0) {
      navigate('/cart')
  }
}, [token])
  
 

  return (
   <form onSubmit={placeOrder} className='place-order' >
    <div className="place-order-left">
      <p className='title'>Delivery information</p>
      <div className="multi-feilds">
        <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
        <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
      </div>
      <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
      <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='street' />
      <div className="multi-feilds">
        <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
        <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
      </div>
      <div className="multi-feilds">
        <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='zip-code' />
        <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='country' />
      </div>
      <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='phone' />
    </div>
    <div className="place-order-right">
    
        <div className="cart-totals">
          <div className="cart-heading">
          <h2>Cart totals</h2>
        </div>
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>{getTotalCartAmount()}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Delivery Fee</p>
          {getTotalCartAmount()>0?
          <p>{2}</p>:
          <p>{0}</p>}
          
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Total</p>{getTotalCartAmount()>0?
          <p>{getTotalCartAmount()+2}</p>:
          <p>{0}</p>}  
        </div>
        <hr />
        <button type='submit'>Proceed to payment</button>
          </div>
    </div>


   </form>
  )
}

export default PlaceOrder
