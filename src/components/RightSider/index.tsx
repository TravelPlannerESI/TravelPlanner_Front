import { useState } from 'react';
import styles from './style.less';

const RightSider = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`${styles.sidebarMenu}${isMenuOpen === true ? ' open' : ''}`}>
      <button
        type="button"
        className="button small float-right"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
          console.log(isMenuOpen);
          console.log(`${styles.sidebarMenu}${isMenuOpen === true ? ' open' : ''}`);
        }}
      >
        Toggle Menu
      </button>
      <ul className="vertical menu">
        <li>
          <a>Menu Item</a>
        </li>
        <li>
          <a>Menu Item</a>
        </li>
        <li>
          <a>Menu Item</a>
        </li>
        <li>
          <a>Menu Item</a>
        </li>
        <li>
          <a>Menu Item</a>
        </li>
      </ul>
    </div>
  );
};

export default RightSider;
