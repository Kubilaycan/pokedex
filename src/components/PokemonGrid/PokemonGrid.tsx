import { useState } from "react";
import Pokemon from "../Pokemon/Pokemon";
import "./PokemonGrid.css";
import { PokemonData } from "../../types/Pokemon";
import { AbilityData } from "../../types/Ability";
import { Tilt } from "react-tilt";

interface ListResponse {
  name: string;
  url: string;
}

const defaultOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            15,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}

function PokemonGrid({
  onPokemonSelect,
}: {
  onPokemonSelect: (arg0: PokemonData | undefined, args1: AbilityData[] | undefined) => void;
}) {
  const [pokemonGridData, setPokemonGridData] = useState<ListResponse[]>();

  useState(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=32&offset=0")
      .then((res) => res.json())
      .then((data) => {
        setPokemonGridData(data.results);
      });
  });

  const onGridPokemonSelect = (pokemon: PokemonData | undefined, abilities: AbilityData[] | undefined) => {
    onPokemonSelect(pokemon, abilities);
  };

  return (
    <div className="pokemon-grid dynamic-grid">
      {pokemonGridData?.map((pd, index) => {
        return (
          <Tilt options={defaultOptions} key={index}>
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
