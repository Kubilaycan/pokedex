import { useEffect, useState } from 'react';
import './Sidebar.css';
import { PokemonData } from '../../types/Pokemon';

function Sidebar({pokemon} : {pokemon: PokemonData | undefined}) {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const outsideClick = () => {
        setIsVisible(false);
        pokemon = undefined;
    }

    useEffect(() => {
        if (pokemon) {
            console.log(pokemon);
            setIsVisible(true);
        }
    }, [pokemon]);

    return (
        <>
            {
                isVisible ? (
                    <div className='sidebar-backdrop' onClick={outsideClick}>
                        <div className='sidebar-container'>
                        <img className='sidebar-pokemon-image stroke' src={pokemon?.sprites.other.showdown.front_default} />
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }
        </>
    );
}
export default Sidebar
