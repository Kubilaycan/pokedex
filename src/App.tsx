import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import PokemonGrid from './components/PokemonGrid/PokemonGrid'
import Sidebar from './components/Sidebar/Sidebar'
import { PokemonData } from './types/Pokemon'

function App() {
  const [sidebarPokemon, setSidebarPokemon] = useState<PokemonData>();
  
  const setPokemonForSidebar = (pokemon: PokemonData | undefined) => {
    setSidebarPokemon(pokemon);
  }

  return (
    <>
      <Header />
      <Sidebar pokemon={sidebarPokemon}/>
      <PokemonGrid onPokemonSelect={setPokemonForSidebar}/>
    </>
  )
}

export default App
