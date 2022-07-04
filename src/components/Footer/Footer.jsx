import React from 'react';
import './Footer.scss';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

function Footer() {
  return (
    <div className='footer'>
      <div class='footer__contact'>
        <div className='footer__contact--social'>
          <p>Conect with me: </p>
          <ul>
            <li className='footer__icons'>
              <a href='https://github.com/mkchahal' rel='noreferrer' target='_blank'>
                <FaGithub />
              </a>
            </li>
            <li className='footer__icons'>
              <a href='"mailto:chahal.mandeep@outlook.com"' rel='noreferrer' target='_blank'>
                <FiMail />
              </a>
            </li>
            <li className='footer__icons'>
              <a href='https://www.linkedin.com/in/mkchahal' rel='noreferrer' target='_blank'>
                <FaLinkedinIn />
              </a>
            </li>
          </ul>
        </div>

        <div className='footer__contact--address'>
          <p>I ❤️ handwritten letters, write to me at: </p>
          <address>
            8256 18th Avenue, <br />
            Burnaby BC <br />
            V3N 1K3
          </address>
        </div>
        </div>
      <p className='footer__text'>© 2022, made with ♥ by <strong>Mandeep K Chahal</strong>.</p>
    </div>
  )
}

export default Footer;