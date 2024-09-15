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
    const [nextUrl, setNextUrl] = useState<string>();

    const fetchInitialPokemonData = () => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=64&offset=0")
        .then((res) => res.json())
        .then((data) => {
            setPokemonGridData(data.results);
            setNextUrl(data.next);
        });
    }

    const fetchMorePokemonData = () => {
        if (nextUrl) {
            fetch(encodeURI(nextUrl))
            .then((res) => res.json())
            .then((data) => {
                setPokemonGridData(pokemonGridData?.concat(data.results));
                setNextUrl(data.next);
            });
        }
    }

    const fetchSinglePokemon = (pokemonName: string) => {
      let apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
      setPokemonGridData([
        {
            name: pokemonName,
            url: apiUrl
        }
      ]);
      setNextUrl(undefined);
    }
    
    useState(() => {
        fetchInitialPokemonData();
    });

    useEffect(() => {
        if (searchInputValue) {
            fetchSinglePokemon(searchInputValue.trim().toLowerCase());
        } else {
            fetchInitialPokemonData();
        }
    }, [searchInputValue])
    
    const onGridPokemonSelect = (pokemon: PokemonData | undefined, abilities: AbilityData[] | undefined) => {
        onPokemonSelect(pokemon, abilities);
    };
    
    return (
        <div>
            <div className="pokemon-grid dynamic-grid">
            {pokemonGridData?.map((pd) => {
                return (
                    <Tilt
                        tiltMaxAngleX={15}
                        tiltMaxAngleY={15}
                        scale={1.1}
                        transitionSpeed={1000}
                        key={pd.name}>
                            <Pokemon
                            url={pd.url}
                            onSelect={onGridPokemonSelect}
                            />
                    </Tilt>
                );
            })}
            </div>
            { nextUrl && 
                <div className="load-more-container">
                    <button className="load-more" onClick={fetchMorePokemonData}>
                        Load More
                    </button>
                </div>
            }
        </div>
    );
}
export default PokemonGrid;
