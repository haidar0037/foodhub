import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <h1>FoodHub.</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis amet temporibus a rem odio id!</p>
                <div className="footer-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>

            </div>
            <div className="footer-content-right">
                <h2>Get In Touch</h2>
                <ul>
                    <li>+91-8084935222</li>
                    <li>contact@gmail.com</li>
                </ul>

            </div>
        </div>
      <hr />
      <p className='footer-copyright'> Copyright2024@FoodHub.com-All Right Reserved</p>
    </div>
  )
}

export default Footer
