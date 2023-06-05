import './Header.css'
import { Link } from 'react-router-dom';


const Header = () => {
    return(
        <header className="Header">
            <a className='naslov'>zx99</a>
            <div className="header-right">
                <a><Link to={"/"}>Home</Link></a>
                <a><Link to={"/about"}>About</Link></a>
            </div>
        </header>
    )
}

export default Header