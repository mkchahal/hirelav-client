import React from 'react';
import './About.scss';
import about from '../../assets/images/about.png';

function About({ image, title, button }) {

    return (
        <div className='about' id='about'>
            <div className="about__image">
                <img src={about} alt="group" />
            </div>
            <div className="about__text">
                <h2> About HireLav </h2><br />
                <p>HireLav provide powerful tools for recruitment solutions but not at the cost of design. Visual and intuitive design enables user to use the website without any prior training. Some additional features you would like to see? Any comments or feedback? Connect with us! 💟</p>
                <a href='/#contact'>Contact Us</a>
            </div>
        </div>
    )
}

export default About;