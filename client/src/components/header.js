import './Header.css'
import { Link } from 'react-router-dom';


const Header = () => {
    return(
        <header className="Header">
            <a className='naslov'>zx99</a>
            <div className="header-right">
                <Link to={"/"}>Home</Link>
                <Link to={"/about"}>About</Link>
            </div>
        </header>
    )
}

export default Header