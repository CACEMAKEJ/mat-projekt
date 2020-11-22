import Link from 'next/link';
import { Button } from 'semantic-ui-react';
import UserProvider, { UserContext } from '../components/UserContext';

const Header = () => (
  <div className='rehamza-header'>
    <div className='header-logo'>
      <Link href='/'>
        <img
          src='/logo.svg'
          alt='Rehamza'
          width='200'
          height='200'
          className='header-logo-svg'
        ></img>
      </Link>
    </div>
    <div className='header-links'>
      <span>
        <a href='#about' className='header-link'>
          O Nás
        </a>
      </span>
      <span>
        <a href='#projects' className='header-link'>
          Projekty
        </a>
      </span>
      <span>
        <a href='#' className='header-link'>
          Tým
        </a>
      </span>
      <span>
        <a href='#' className='header-link'>
          Kontakt
        </a>
      </span>

      <UserContext.Consumer>
        {(value) =>
          !value.user && (
            <Link href='/login'>
              <Button
                basic
                color='black'
                size='large'
                style={{ fontWeight: 'bold' }}
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
              style={{ fontWeight: 'bold' }}
            >
              Odhlásit se
            </Button>
          )
        }
      </UserContext.Consumer>
    </div>
  </div>
);
export default Header;
