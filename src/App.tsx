import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import PokemonGrid from './components/PokemonGrid/PokemonGrid'
import { PokemonData } from './types/Pokemon'
import { AbilityData } from './types/Ability'
import Pokedex from './components/Pokedex/Pokedex'

function App() {
  const [pokemon, setPokemon] = useState<PokemonData>();
  const [abilities, setAbilities] = useState<AbilityData[]>();
  const [headerInput, setHeaderInput] = useState<string>();

  const [pokedexVisible, setPokedexVisible] = useState<boolean>();
  
  const setPokemonForPokedex = (pokemon: PokemonData | undefined, abilities: AbilityData[] | undefined) => {
    setPokemon(pokemon);
    setAbilities(abilities);

    setPokedexVisible(true);
  }

  const handleHeaderInputSubmit = (inputValue: string) => {
    setHeaderInput(inputValue);
  }

  const handlePokedexHide = () => {
    setPokedexVisible(false);
  }

  return (
    <>
      <Header onInputSubmit={handleHeaderInputSubmit}/>
      <PokemonGrid onPokemonSelect={setPokemonForPokedex} searchInputValue={headerInput}/>
      <Pokedex visible={pokedexVisible} onPokedexHide={handlePokedexHide} pokemon={pokemon} abilities={abilities}/>
    </>
  )
}

export default App
