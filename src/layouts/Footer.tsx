import './Footer.css';
import { NavTypes } from '../types/App.types';


const Footer = ({darkMode }: NavTypes) => {
  return (
    <div className='footerWrapper'>
      <div> All rights reserved by</div>
      <a className={darkMode ? 'link' : 'link_l'} target='_blank' href='https://github.com/MiloszKozaa'>
      Miłosz Koza
    </a>
    </div>
  );
};

export default Footer;
