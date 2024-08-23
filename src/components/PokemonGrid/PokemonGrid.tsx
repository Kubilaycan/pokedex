import { useEffect, useState } from "react";
import Pokemon from "../Pokemon/Pokemon";
import "./PokemonGrid.css";
import { PokemonData } from "../../types/Pokemon";
import { AbilityData } from "../../types/Ability";
import Tilt from "react-parallax-tilt";

interface ListResponse {
    name: string;
    url: string;
}

function PokemonGrid({
    searchInputValue,
    onPokemonSelect,
}: {
    searchInputValue: string | undefined,
    onPokemonSelect: (arg0: PokemonData | undefined, args1: AbilityData[] | undefined) => void;
}) {
    const [pokemonGridData, setPokemonGridData] = useState<ListResponse[]>();

    const fetchPokemonData = () => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=32&offset=0")
        .then((res) => res.json())
        .then((data) => {
            setPokemonGridData(data.results);
        });
    }

    const fetchSinglePokemon = (pokemonName: string) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then((res) => res.json())
            .then((data) => {
                setPokemonGridData([data]);
            });
    }
    
    useState(() => {
        fetchPokemonData();
    });

    useEffect(() => {
        if (searchInputValue) {
            fetchSinglePokemon(searchInputValue.trim().toLowerCase());
        } else {
            fetchPokemonData();
        }
    }, [searchInputValue])
    
    const onGridPokemonSelect = (pokemon: PokemonData | undefined, abilities: AbilityData[] | undefined) => {
        onPokemonSelect(pokemon, abilities);
    };
    
    return (
        <div className="pokemon-grid dynamic-grid">
        {pokemonGridData?.map((pd) => {
            return (
                <Tilt
                    tiltMaxAngleX={15}
                    tiltMaxAngleY={15}
                    scale={1.1}
                    transitionSpeed={600}
                    key={pd.name}>
                        <Pokemon
                        url={pd.url}
                        onSelect={onGridPokemonSelect}
                        />
                </Tilt>
            );
        })}
        </div>
    );
}
export default PokemonGrid;
