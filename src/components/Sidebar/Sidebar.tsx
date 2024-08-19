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
import { SlSymbleFemale } from "react-icons/sl";
import { SlSymbolMale } from "react-icons/sl";
import { Type2 } from '../../types/Pokemon';
import { AbilityData } from '../../types/Ability';
import Capitalize from '../../helpers/CapitalizeHelper';

function Sidebar({pokemon, abilities} : {pokemon: PokemonData | undefined, abilities: AbilityData[] | undefined}) {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [genders, setGenders] = useState<string[]>();

    useEffect(() => {
        if (pokemon) {
            setIsVisible(true);
            fetch("https://pokeapi.co/api/v2/gender/?name=" + pokemon.name)
                .then((res) => res.json())
                .then((data) => {
                    setGenders(data.results.map((p: Type2) => p.name));
                });
        }
    }, [pokemon]);

    const closeSidebar = () => {
        setIsVisible(false);
        pokemon = undefined;
    }

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

    const genderIcon = (gender: string) => {
        switch (gender) {
            case 'male':
                return <SlSymbolMale size={32} color='#1E90FF' />
                break;
            case 'female':
                return <SlSymbleFemale size={32} color='#FF1493' />
                break;
        }
    }

    return (
        <>
            {
                isVisible ? (
                    <div className='sidebar-backdrop'>
                        <div className='sidebar-container'>
                            <div className='sidebar-content'>
                                <div className="sidebar-header">
                                    <div className='sidebar-pokemon-name'>
                                        {pokemon?.name.toUpperCase()}
                                    </div>
                                    <div className='sidebar-close-button' onClick={closeSidebar}>
                                        <IoCloseOutline color='black' size={32} />
                                    </div>
                                </div>
                                <div className='sidebar-pokemon-image-container'>
                                    <img className='sidebar-pokemon-image' src={pokemon?.sprites.other.showdown.front_default} />
                                </div>
                                <div className='type-with-name-grid'>
                                    {pokemon?.types.map((pt, key) => {
                                        return (
                                            <div className='type-with-name' key={key}>
                                                <img height={32} width={32} src={'type-icons/' + pt.type.name + '.svg'} data-tooltip-id={pokemon?.id + pt.type.name} />
                                                <div>
                                                    {pt.type.name.charAt(0).toUpperCase() + pt.type.name.slice(1)}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className='sidebar-stat-grid'>
                                    {pokemon?.stats.map((stat, index) => {
                                        return (
                                            <div className='sidebar-stat-container' key={index}>
                                                {statIcon(stat.stat.name)}
                                                <div>
                                                    <div className='stat-name'>{stat.stat.name.toUpperCase().replace('-', ' ')}</div>
                                                    <div className='stat-value'>{stat.base_stat}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className='genders'>
                                    {genders?.map((gender, index) => {
                                        return (
                                            <div key={index} style={{color: 'black'}}>
                                                {genderIcon(gender)}
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className='abilities-list'>
                                    {abilities?.map((ab, key) => {
                                        return (
                                            <div key={key}>
                                                <div className='ability'>
                                                    <div style={{fontFamily: 'Gill-Sans', color: 'black', fontSize: 18}}>
                                                        <span style={{fontFamily: 'Gill-Sans-Bold', fontSize: 20}}>{Capitalize(ab.name, '-')}: </span>
                                                        {ab.effect_entries.find(p => p.language.name == 'en')?.short_effect}
                                                    </div>
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
