import React, { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
const Cart = () => {
const{cartItem,food_list,removeCart,getTotalCartAmount,url} = useContext(StoreContext);
const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
          if(cartItem[item._id]>0){
            return(
              <div>
                <div className="cart-items-title cart-items-item">
                <img src={url+"/images/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItem[item._id]}</p>
                <p>${item.price*cartItem[item._id]}</p>
                <p onClick={()=>removeCart(item._id)} className='cross'>X</p>
              </div>
              <hr />
              </div>
              
            )
            
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-totals">
          <div className="cart-total">
          <h2 >Cart totals</h2>
        </div>
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>${getTotalCartAmount()}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Delivery Fee</p>
          {getTotalCartAmount()>0?
          <p>${2}</p>:
          <p>${0}</p>}
          
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Total</p>{getTotalCartAmount()>0?
          <p>${getTotalCartAmount()+2}</p>:
          <p>${0}</p>}
          
          
        </div>
        <hr />
        <button onClick={()=>navigate('/order')}>Proceed to check out</button>
          </div>
          
        <div className="cart-promocode">
           <div>
            <p>if you have promo code,enter here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Promo code' />
              <button>Submit</button>
            </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
