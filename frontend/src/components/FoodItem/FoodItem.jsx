import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext'
const FoodItem = ({name,image,description,price,id}) => {

   const {cartItem,addToCart,removeCart,url}= useContext(StoreContext)

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-img' src={url+"/images/"+image} alt="" />
            {!cartItem[id]
            ? <img onClick={()=>addToCart(id)} className="add"src={assets.add_icon_white} alt="" />:

            <div className="food-item-counter">
             <img onClick={()=>removeCart(id)} src={assets.remove_icon_red} alt="" />
             <p>{cartItem[id]}</p>
             <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
            </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desription">{description}
            </p>
            <p className='food-item-price'>${price}</p>

        </div>
      
    </div>
  )
}

export default FoodItem
