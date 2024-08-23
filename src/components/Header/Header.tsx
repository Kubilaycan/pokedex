import React, { useState } from 'react';
import './Header.css';
import pokedexLogo from '/logo.png'

function Header({onInputSubmit} : {onInputSubmit: (args0: string) => void}) {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleSubmit = () => {
        onInputSubmit(inputValue);
    }

    return (
        <div className='header-container'>
            <div className='logo-container'>
                <img src={pokedexLogo} height={48} width={48}></img>
                <div className='logo-text'>
                    Pokédex
                </div>
            </div>
            <div>
                <input 
                    placeholder='Search'
                    className='search-bar'
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={(e) => { if (e.key === 'Enter') { handleSubmit(); }}}></input>
            </div>
            <div>

            </div>
        </div>
    );
}

export default Header