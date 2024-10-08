import './Pokedex.css';
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';
import PokedexObject from './PokexedObject/PokedexObject';
import { PokemonData } from '../../types/Pokemon';
import { AbilityData } from '../../types/Ability';

function Pokedex({visible, onPokedexHide, pokemon, abilities} : {visible: boolean | undefined, onPokedexHide: () => void, pokemon: PokemonData | undefined, abilities: AbilityData[] | undefined }) {
    const [isVisible, setIsVisible] = useState<boolean | undefined>(false);

    useEffect(() => {
        setIsVisible(visible);
    }, [visible]);

    const closeSidebar = () => {
        onPokedexHide();
    }

    return (
        <AnimatePresence>
            {
                isVisible && (
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0, transition: {delay: 0.5}}} className='pokedex-backdrop'>
                        <div className='pokedex-close-button' onClick={closeSidebar}>
                            <IoCloseOutline color='black' size={48} />
                        </div>
                        <motion.div initial={{opacity: 0.5}} animate={{opacity: 1}} exit={{opacity: 0.5, transition: {delay: 0.5}}} transition={{duration: 0.5, type: 'spring'}} className='pokedex-container'>
                            <PokedexObject pokemon={pokemon} abilities={abilities}/>
                        </motion.div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}
export default Pokedex