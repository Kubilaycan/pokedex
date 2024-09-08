import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import PokemonGrid from './components/PokemonGrid/PokemonGrid'
import Sidebar from './components/Sidebar/Sidebar'
import { PokemonData } from './types/Pokemon'
import { AbilityData } from './types/Ability'
import Pokedex from './components/Pokedex/Pokedex'

function App() {
  const [sidebarPokemon, setSidebarPokemon] = useState<PokemonData>();
  const [sidebarAbilities, setSidebarAbilities] = useState<AbilityData[]>();
  const [headerInput, setHeaderInput] = useState<string>();

  const [pokedexVisible, setPokedexVisible] = useState<boolean>();
  
  const setPokemonForSidebar = (pokemon: PokemonData | undefined, abilities: AbilityData[] | undefined) => {
    setSidebarPokemon(pokemon);
    setSidebarAbilities(abilities);

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
      {/* <Sidebar pokemon={sidebarPokemon} abilities={sidebarAbilities}/> */}
      <PokemonGrid onPokemonSelect={setPokemonForSidebar} searchInputValue={headerInput}/>
      <Pokedex visible={pokedexVisible} onPokedexHide={handlePokedexHide}/>
    </>
  )
}

export default App
