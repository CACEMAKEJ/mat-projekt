import { useState } from 'react';
import Link from 'next/link';
import { Button } from 'semantic-ui-react';
import UserProvider, { UserContext } from '../components/UserContext';

const Header = () => {
  const [open, setOpen] = useState(false);
  const onClick = () => setOpen(!open);

  return (
    <div className='rehamza-header'>
      <div className='header-logo'>
        <Link href='/'>
          <img src='/logo.svg' alt='Rehamza' className='header-logo-svg'></img>
        </Link>
      </div>
      <div className={`header-links ${open ? 'active' : 'inactive'}`}>
        <ul>
          <li>
            <a href='/#about'>O Nás</a>
          </li>
          <li>
            <a href='/produkty'>Produkty</a>
          </li>
          <li>
            <a href='/#team'>Tým</a>
          </li>
          <li>
            <a href='/#contact'>Kontakt</a>
          </li>
        </ul>
        <UserContext.Consumer>
          {(value) =>
            !value.user && (
              <Link href='/login'>
                <Button
                  basic
                  color='black'
                  size='large'
                  className='header-login-button'
                >
                  Přihlásit se
                </Button>
              </Link>
            )
          }
        </UserContext.Consumer>
        <UserContext.Consumer>
          {(value) =>
            value.user && (
              <Button
                onClick={value.logout}
                basic
                color='black'
                size='large'
                className='header-login-button'
              >
                Odhlásit se
              </Button>
            )
          }
        </UserContext.Consumer>
      </div>
      <a href='#' className='toggle-button' onClick={onClick}>
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
      </a>
    </div>
  );
};
export default Header;
