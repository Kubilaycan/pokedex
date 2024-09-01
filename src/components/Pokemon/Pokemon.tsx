import './Pokemon.css'
import { useEffect, useState } from 'react'
import { PokemonData } from '../../types/Pokemon'
import { Tooltip } from 'react-tooltip';
import { AbilityData } from '../../types/Ability';
import Capitalize from '../../helpers/CapitalizeHelper';
import TypeColor from '../../helpers/ColorHelper';

function Pokemon({url, onSelect} : {url: string, onSelect: (arg0: PokemonData | undefined, args1: AbilityData[] | undefined) => void}) {
    const [pokemon, setPokemon] = useState<PokemonData>();
    const [abilities, setAbilities] = useState<AbilityData[]>();

    useEffect(()=> {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setPokemon(data);
                
                Promise.all((data as PokemonData).abilities.map(a => 
                    fetch(a.ability.url).then(abilityResponse => abilityResponse.json())
                )).then(ab => {
                    setAbilities(ab);
                });
            });
    }, []);

    const onPokemonSelect = () => {
        onSelect(pokemon, abilities);
    }

    return (
        <>
            {
                pokemon &&
                <div className='card'  onClick={onPokemonSelect}>
                    <img className='card-background' src={'type-backgrounds/' + pokemon?.types[0].type.name + '.png'} />
                    <div className='card-content-container'>
                        <div className='card-content'>
                            <div className='pokemon-name-type-container'>
                                <div className='pokemon-name'>
                                    {Capitalize(pokemon?.name)}
                                </div>
                                <div className='hp-type-container'>
                                    <div className='hp'>
                                        {pokemon?.stats.find(p => p.stat.name == 'hp')?.base_stat} HP
                                    </div>
                                    <img className='type-icon' height={32} width={32} src={'type-icons/' + pokemon?.types[0].type.name + '.svg'} data-tooltip-id={pokemon?.id + pokemon?.types[0].type.name} />
                                    <Tooltip id={pokemon?.id + pokemon?.types[0].type.name} content={Capitalize(pokemon?.types[0].type.name)} place='top' style={{backgroundColor: '#F5FFFA', borderRadius: 12, fontSize: 16, color: '#2F4F4F'}} border='2px solid #E6E6FA' opacity={1} />
                                </div>
                            </div>
                            <div className='pokemon-image-border' style={{background: TypeColor(pokemon?.types[0].type.name)}}>
                                {/* <img className='pokemon-image stroke' src={pokemon?.sprites.front_default} /> */}
                                <img className='pokemon-image stroke' src={pokemon?.sprites.other['official-artwork'].front_default} />
                                {/* <img className='pokemon-image stroke' src={pokemon?.sprites.other.home.front_default} /> */}
                                {/* <img className='pokemon-image stroke' src={pokemon?.sprites.other.showdown.front_default} /> */}
                                {/* <img className='pokemon-image stroke' src={pokemon?.sprites.versions['generation-v']['black-white'].animated.front_default} /> */}
                            </div>

                            <div className='pokemon-height-weight'>
                                {Capitalize(pokemon?.types[0].type.name)} Pokemon
                                Length: {pokemon?.height / 10} m, Weight: {pokemon?.weight / 10} kgs.
                            </div>

                            <div className='pokemon-id'>
                                #{pokemon?.id.toString().padStart(4, '0')}
                            </div>
                            <div className='abilities-list'>
                                {abilities?.map((ab, key) => {
                                    return (
                                        <div key={key}>
                                            <div className='ability' data-tooltip-id={ab.name + ab.id}>
                                                {Capitalize(ab.name, '-')}
                                            </div>
                                            {/* <Tooltip id={ab.name + ab.id} content={ab.effect_entries.find(p => p.language.name === 'en')?.short_effect} place='top' style={{backgroundColor: '#F5FFFA', borderRadius: 12, fontSize: 16, color: '#2F4F4F'}} border='2px solid #E6E6FA' opacity={1} /> */}
                                            {
                                                key != abilities?.length -1 &&
                                                <hr className='ability-divider'/>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default Pokemon
