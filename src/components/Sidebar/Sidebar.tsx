import { useEffect, useState } from 'react';
import './Sidebar.css';
import { PokemonData } from '../../types/Pokemon';

import { IoCloseOutline } from 'react-icons/io5';
import { GiHealthNormal } from "react-icons/gi";
import { GiSpinningSword } from "react-icons/gi";
import { GiShield } from "react-icons/gi";
import { GiBouncingSword } from "react-icons/gi";
import { GiCheckedShield } from "react-icons/gi";
import { GiRun } from "react-icons/gi";

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

    const statIcon = (statName: string) => {
        switch (statName) {
            case 'hp':
                return <GiHealthNormal size={40} color='black' />
                break;
            case 'attack':
                return <GiSpinningSword size={40} color='black' />
                break;
            case 'defense':
                return <GiShield size={40} color='black' />
                break;
            case 'special-attack':
                return <GiBouncingSword size={40} color='black' />
                break;
            case 'special-defense':
                return <GiCheckedShield size={40} color='black' />
                break;
            case 'speed':
                return <GiRun size={40} color='black' />
                break;
            default:
                return <></>
                break;
        }
    }

    return (
        <>
            {
                isVisible ? (
                    <div className='sidebar-backdrop' onClick={outsideClick}>
                        <div className='sidebar-container'>
                            <div className='sidebar-content'>
                                <div className='sidebar-close-button'>
                                    <IoCloseOutline color='black' size={32} />
                                </div>
                                <div className='sidebar-pokemon-image-container'>
                                    <img className='sidebar-pokemon-image' src={pokemon?.sprites.other.showdown.front_default} />
                                </div>
                                <div className='sidebar-pokemon-name'>
                                    {pokemon?.name.toUpperCase()}
                                </div>
                                <div className='sidebar-stat-grid'>
                                    {pokemon?.stats.map((stat, index) => {
                                        return (
                                            <div className='sidebar-stat-container' key={index}>
                                                {statIcon(stat.stat.name)}
                                                <div>
                                                    <div className='stat-name'>{stat.stat.name.toUpperCase()}</div>
                                                    <div className='stat-value'>{stat.base_stat}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
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
