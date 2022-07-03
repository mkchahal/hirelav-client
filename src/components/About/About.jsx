import React from 'react';
import './About.scss';
import about from '../../assets/images/about.png';

function About({ image, title, button }) {

    return (
        <div className='about'>
            <div className="about__image">
                <img src={about} alt="group" />
            </div>
            <div className="about__text">
                <h2> About HireLav </h2><br />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ipsam veniam, eaque modi quod sunt quae architecto? Amet assumenda voluptas repudiandae aspernatur natus maiores, iure qui, sit soluta veritatis, dignissimos ullam est aut placeat velit!</p>
                <button>Contact Us</button>
            </div>
        </div>
    )
}

export default About;