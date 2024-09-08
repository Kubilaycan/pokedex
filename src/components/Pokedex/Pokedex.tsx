import './Pokedex.css';
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';
import PokedexObject from './PokexedObject/PokedexObject';

function Pokedex({visible, onPokedexHide} : {visible: boolean | undefined, onPokedexHide: () => void}) {
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
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className='pokedex-backdrop'>
                        <div className='pokedex-close-button' onClick={closeSidebar}>
                            <IoCloseOutline color='black' size={48} />
                        </div>
                        <motion.div initial={{opacity: 0, y: 128}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 128}} className='pokedex-container'>
                            <PokedexObject />
                        </motion.div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}
export default Pokedex