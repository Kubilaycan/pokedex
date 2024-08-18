import './Pokemon.css'
import { useEffect, useState } from 'react'
import { PokemonData } from '../../types/Pokemon'
import { Tooltip } from 'react-tooltip';
import { AbilityData } from '../../types/Ability';
import Capitalize from '../../helpers/CapitalizeHelper';

function Pokemon({name, url, onSelect} : {name: string, url: string, onSelect: (arg0: PokemonData | undefined) => void}) {
    const [pokemon, setPokemon] = useState<PokemonData>();
    const [abilities, setAbilities] = useState<AbilityData[]>();

    useEffect(()=> {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setPokemon(data);
                Promise.all((data as PokemonData).abilities.map(a => 
                    fetch(a.ability.url).then(res2 => res2.json())
                )).then(ab => {
                    setAbilities(ab);
                });
            });
    }, []);

    const onPokemonSelect = () => {
        onSelect(pokemon);
    }

    return (
        <>
            {
                pokemon &&
                <div className='card'  onClick={onPokemonSelect}>
                    <img style={{width: '100%', height: '100%', borderRadius: 10, gridRowStart: 1, gridColumnStart: 1}} src={'type-backgrounds/' + pokemon?.types[0].type.name + '.png'} />
                    <div style={{width: '100%', height: '100%', gridRowStart: 1, gridColumnStart: 1}}>
                        <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: 8}}>
                                <div style={{fontFamily: 'Gill-Sans-Bold', color: 'black', fontSize: 24, marginLeft: 12}}>
                                    {Capitalize(pokemon?.name)}
                                </div>
                                <div className='type' style={{marginRight: 12, display: 'flex'}}>
                                    <div style={{alignSelf: 'center', fontFamily: 'Gill-Sans-Bold', fontSize: 16, marginRight: 8}}>
                                        {pokemon?.stats.find(p => p.stat.name == 'hp')?.base_stat} HP
                                    </div>
                                    <img height={32} width={32} src={'type-icons/' + pokemon?.types[0].type.name + '.svg'} data-tooltip-id={pokemon?.id + pokemon?.types[0].type.name} />
                                    <Tooltip id={pokemon?.id + pokemon?.types[0].type.name} content={Capitalize(pokemon?.types[0].type.name)} place='top' style={{backgroundColor: '#F5FFFA', borderRadius: 12, fontSize: 16, color: '#2F4F4F'}} border='2px solid #E6E6FA' opacity={1} />
                                </div>
                            </div>
                            <img className='pokemon-image stroke' src={pokemon?.sprites.front_default} />
                            {/* <img className='pokemon-image stroke' src={pokemon?.sprites.other.home.front_default} /> */}
                            {/* <img className='pokemon-image stroke' src={pokemon?.sprites.other.showdown.front_default} /> */}
                            {/* <img className='pokemon-image stroke' src={pokemon?.sprites.versions['generation-v']['black-white'].animated.front_default} /> */}
                            <div className='pokemon-id'>
                                #{pokemon?.id.toString().padStart(4, '0')}
                            </div>
                            <div style={{marginRight: 12, marginLeft: 12}}>
                                {abilities?.slice(0, 2).map((ab, key) => {
                                    return (
                                        <div key={key}>
                                            <div style={{fontFamily: 'Gill-Sans', color: 'black', fontSize: 14}}>
                                                <span style={{fontFamily: 'Gill-Sans-Bold', fontSize: 16}}>{Capitalize(ab.name, '-')}: </span>
                                                {ab.effect_entries.find(p => p.language.name == 'en')?.short_effect}
                                            </div>
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
