import { useState } from 'react'
import Pokemon from '../Pokemon/Pokemon'
import './PokemonGrid.css'
import { PokemonData } from '../../types/Pokemon';

interface ListResponse {
    name: string,
    url: string
}

function PokemonGrid({onPokemonSelect} : {onPokemonSelect: (arg0: PokemonData | undefined) => void}) {
    const [pokemonGridData, setPokemonGridData] = useState<ListResponse[]>();

    useState(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=32&offset=0')
            .then(res => res.json())
            .then(data => {
                setPokemonGridData(data.results);
            });
    });

    const onGridPokemonSelect = (pokemon: PokemonData | undefined) => {
        onPokemonSelect(pokemon);
    }

    return (
        <div className='pokemon-grid dynamic-grid'>
            {
                pokemonGridData?.map((pd, index) => {
                    return <Pokemon key={index} name={pd.name} url={pd.url} onSelect={onGridPokemonSelect}/>
                })
            }
        </div>
    )
}
export default PokemonGrid
