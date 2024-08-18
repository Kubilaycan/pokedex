import './Header.css';
import pokedexLogo from '/logo.png'

function Header() {
    return (
        <div className='header-container'>
            <div className='logo-container'>
                <img src={pokedexLogo} height={48} width={48}></img>
                <div className='logo-text'>
                    Pokédex
                </div>
            </div>
            <div>
                <input placeholder='Search'className='search-bar'></input>
            </div>
            <div>

            </div>
        </div>
    );
}

export default Header