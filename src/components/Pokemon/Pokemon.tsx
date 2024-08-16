import './Pokemon.css'
import { useEffect, useState } from 'react'
import { PokemonData } from '../../types/Pokemon'
import { Tooltip } from 'react-tooltip';

function Pokemon({name, url, onSelect} : {name: string, url: string, onSelect: (arg0: PokemonData | undefined) => void}) {
    const [pokemon, setPokemon] = useState<PokemonData>();

    useEffect(()=> {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setPokemon(data);
            });
    }, []);

    const onPokemonSelect = () => {
        onSelect(pokemon);
    }

    return (
        <div className='card' onClick={onPokemonSelect}>
            <div className='card-content'>
                <img className='pokemon-image stroke' src={pokemon?.sprites.front_default} />
                {/* <img className='pokemon-image stroke' src={pokemon?.sprites.other.home.front_default} /> */}
                {/* <img className='pokemon-image stroke' src={pokemon?.sprites.other.showdown.front_default} /> */}
                {/* <img className='pokemon-image stroke' src={pokemon?.sprites.versions['generation-v']['black-white'].animated.front_default} /> */}
                <div className='pokemon-id'>
                    #{pokemon?.id.toString().padStart(4, '0')}
                </div>
                <div className='pokemon-name'>
                    {pokemon?.name.toUpperCase()}
                </div>
                <div className='type-grid'>
                    {pokemon?.types.map((pt, key) => {
                        return (
                            <div className='type' key={key}>
                                <img height={32} width={32} src={'type-icons/' + pt.type.name + '.svg'} data-tooltip-id={pokemon?.id + pt.type.name} />
                                <Tooltip id={pokemon?.id + pt.type.name} content={pt.type.name.charAt(0).toUpperCase() + pt.type.name.slice(1)} place='top' style={{backgroundColor: '#F5FFFA', borderRadius: 12, fontSize: 16, color: '#2F4F4F'}} border='2px solid #E6E6FA' opacity={1} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default Pokemon
