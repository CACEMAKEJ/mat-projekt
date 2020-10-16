import Link from 'next/link'
import { Button } from 'semantic-ui-react'

const Header = () =>
<div className='header'>
    <div className='header-logo'>
        <img src='/logo.svg' alt='Rehamza' width='200' height='200' className='header-logo-svg'></img>
    </div>
    <div className='header-links'>
        <span><a href='#' className='header-link'>O Nás</a></span>
        <span><a href='#' className='header-link'>Projekty</a></span>
        <span><a href='#' className='header-link'>Tým</a></span>
        <span><a href='#' className='header-link'>Kontakt</a></span>
        <Link href='/login'><Button basic color='black' size='large' style={{fontWeight:'bold'}}>Přihlásit se</Button></Link>
    </div>
</div>
export default Header
            