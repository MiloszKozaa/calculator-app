import './Header.css';
import { NavTypes } from '../types/App.types';


const Header = ({ darkMode }: NavTypes) => {
  return (
    <div className='headerWrapper'>
      <div className='headerLogo'>
        <a
          className={darkMode ? 'link' : 'link_l'}
          target='_blank'
          href='https://github.com/MiloszKozaa/calculator-app'>
          calculator
        </a>
        app
      </div>
      <div className='headerMade'>
        Site made by
        <a
          className={darkMode ? 'link' : 'link_l'}
          target='_blank'
          href='https://github.com/MiloszKozaa'>
          Miłosz Koza
        </a>
      </div>
    </div>
  );
};

export default Header;
