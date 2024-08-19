import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import PokemonGrid from './components/PokemonGrid/PokemonGrid'
import Sidebar from './components/Sidebar/Sidebar'
import { PokemonData } from './types/Pokemon'
import { AbilityData } from './types/Ability'

function App() {
  const [sidebarPokemon, setSidebarPokemon] = useState<PokemonData>();
  const [sidebarAbilities, setSidebarAbilities] = useState<AbilityData[]>();
  
  const setPokemonForSidebar = (pokemon: PokemonData | undefined, abilities: AbilityData[] | undefined) => {
    setSidebarPokemon(pokemon);
    setSidebarAbilities(abilities);
  }

  return (
    <>
      <Header />
      <Sidebar pokemon={sidebarPokemon} abilities={sidebarAbilities}/>
      <PokemonGrid onPokemonSelect={setPokemonForSidebar}/>
    </>
  )
}

export default App
