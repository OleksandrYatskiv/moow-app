import React from 'react'
import moowLogo from '../../images/Frame 32.svg';
import messageIcon from '../../images/message-square.svg';
import userIcon from '../../images/icons.svg';
import bellIcon from '../../images/icons (1).svg';
import optionsIcon from '../../images/icons (2).svg';
import moreIcon from '../../images/icons (3).svg';
import homeIcon from '../../images/Vector 65.svg';
import facebookIcon from '../../images/footer-facebook.svg'
import instagramIcon from '../../images/footer-instagram.svg';
import mailIcon from '../../images/footer-mail.svg';
import mapIcon from '../../images/footer-map.svg';
import tgIcon from '../../images/footer-tg.svg';
import viberIcon from '../../images/footer-viber.svg';
import youtubeIcon from '../../images/footer-youtube.svg';
import moowStar from '../../images/moow-star.svg';
import getAppImg from '../../images/apple-store.svg';
import paymentSystem from '../../images/visa.svg';
import burger from '../../images/burger.svg';
import './layout.sass';

export default function Layout(props) {
  return (
    <>
      <header> 
        <nav>
          <a href="/"><img src={moowLogo} alt="moow-logo" /></a>
          <button className='categories'>Категорії</button>
          <input className='search' type="search" name="" id="" />

          <button className='create-btn'>Створити оголошення</button>
          <div className='icons-wrapper'>
            <a href="/"><img src={messageIcon} alt="message-icon" /></a>
            <a href="/"><img src={homeIcon} alt="home-icon" /></a>
            <a href="/"><img src={userIcon} alt="user-icon" /></a>
            <a href="/"><img src={bellIcon} alt="bell-icon" /></a>
            <a href="/"><img src={optionsIcon} alt="options-Icon" /></a>
            <div className='lan-toggler'>
              <span>УКР</span>
              <img src={moreIcon} alt="more-Icon" />
            </div>
          </div>
          <div className="burger-wrap">
            <img src={burger} alt="burger" />
          </div>
        </nav>
      </header>
      {props.children}
      <footer>
        <div className='footer-logo'>
          <a href="/"><img src={moowLogo} alt="moow-logo" /></a>
        </div>
        <div className="links-container">
          <div className="footer-links">
            <div>
              <img src={moowStar} alt="moow star" />
              <span>Сторінки</span>
            </div>
            <div className="links-wrapper">
              <a href="/">Про нас</a>
            </div>
            <div className="links-wrapper">
              <a href="/">Про сервіс</a>
            </div>
            <div className="links-wrapper">
              <a href="/">FAQ</a>
            </div>
            <div className="links-wrapper">
              <a href="/">Команда</a>
            </div>
          </div>
          <div className="footer-links">
            <div>
              <img src={moowStar} alt="moow star" />
              <span>Контакти</span>
            </div>
            <div className="links-wrapper">
              <img src={mapIcon} alt="map icon" />
              <a href="/">Київ-03188</a>
            </div>
            <div className="links-wrapper">
              <img src={mailIcon} alt="mail icon" />
              <a href="mailto:">moow.ltd@gmail.com</a>
            </div>
            <div className="links-wrapper">
              <img src={tgIcon} alt="telegram icon" />
              <a href="/">Telegram link</a>
            </div>
            <div className="links-wrapper">
              <img src={viberIcon} alt="viber icon" />
              <a href="/">Viber</a>
            </div>
          </div>
          <div className="footer-links">
            <div>
              <img src={moowStar} alt="moow star" />
              <span>Соціальні мережі</span>
            </div>
            <div className='social-media'>
              <a href="/"><img src={facebookIcon} alt="facebook icon" /></a>
              <a href="/"><img src={instagramIcon} alt="instagram icon" /></a>
              <a href="/"><img src={youtubeIcon} alt="youtube icon" /></a>
            </div>
          </div>
          <div className="footer-links">
            <div>
              <img src={moowStar} alt="moow star" />
              <span>Документи</span>
            </div>
          </div>
          <div className='get-app-container'>
            <p>Встанови безкоштовний додаток на смартфон</p>
            <img src={getAppImg} alt="get app" />
            <img src={paymentSystem} alt="payment system" />
          </div>
        </div>
        <p className='footer-copyright'>©ТОВ «Діджітал інвест адвайзор», 2021-2023</p>
      </footer>
    </>
  )
}
