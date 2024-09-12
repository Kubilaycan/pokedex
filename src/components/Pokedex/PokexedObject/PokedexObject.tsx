import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion } from 'framer-motion-3d';
import PokedexModel from "../PokedexModel/PokedexModel";
import useScreenSize from "../../../hooks/useScreenSize";
import { useEffect, useState } from "react";
import { PokemonData } from "../../../types/Pokemon";
import { AbilityData } from "../../../types/Ability";
import Capitalize from "../../../helpers/CapitalizeHelper";

function PokedexObject({pokemon, abilities} : {pokemon: PokemonData | undefined, abilities: AbilityData[] | undefined}) {
    const screenSize = useScreenSize();
    const [modelScale, setModelScale] = useState<number>(calculateScale);

    const [pokemonImageUrl, setPokemonImageUrl] = useState<string>();
    const [pokemonName, setPokemonName] = useState<string>();
    const [pokemonAbilities, setPokemonAbilities] = useState<string[]>();
    const [pokemonStatsLeft, setPokemonStatsLeft] = useState<string[]>();
    const [pokemonStatsRight, setPokemonStatsRight] = useState<string[]>();

    const degree = Math.PI/180;

    useEffect(() => {
        setModelScale(calculateScale());
    }, [screenSize]);

    useEffect(() => {
        setPokemonImageUrl(pokemon?.sprites.front_default);
        setPokemonName(Capitalize(pokemon?.name));

        let abilityArray: string[] = [];
        abilities?.forEach((ability) => {
            let line = Capitalize(ability.name, '-') + ': ' + ability.effect_entries.find(p => p.language.name === 'en')?.short_effect;
            let lines = line.match(/.{1,52}/g);
            lines?.forEach(p => {
                abilityArray.push(p);
            })
        })
        setPokemonAbilities(abilityArray);

        let statLeftArray: string[] = [];
        let statRightArray: string[] = [];
        pokemon?.stats.forEach((stat) => {
            if (stat.stat.name == 'hp' || stat.stat.name == 'attack' || stat.stat.name == 'special-attack') {
                let line = stat.stat.name.toUpperCase().replace('-', ' ') + ': ' + stat.base_stat;
                statLeftArray.push(line);
            }
            if (stat.stat.name == 'defense' || stat.stat.name == 'special-defense' || stat.stat.name == 'speed') {
                let line = stat.stat.name.toUpperCase().replace('-', ' ') + ': ' + stat.base_stat;
                statRightArray.push(line);
            }
        });
        setPokemonStatsLeft(statLeftArray);
        setPokemonStatsRight(statRightArray);
    }, [pokemon]);

    function calculateScale(): number {
        if (screenSize.width > 1100) {
            return 3;
        } else 
        if (screenSize.width <= 1100 && screenSize.width > 720){
            return 2;
        } else 
        if (screenSize.width <= 720) {
            return 1;
        }
        return 1;
    }

    return (
        <Canvas>
            <ambientLight intensity={2} color={'#fdfbd3'}/>
            <directionalLight intensity={2} position={[2, 2, 2]} color={'#fdfbd3'}/>
            <motion.mesh scale={modelScale} animate={{scale: modelScale}}>
                <PokedexModel imageUrl={pokemonImageUrl} name={pokemonName} abilities={pokemonAbilities} statsLeft={pokemonStatsLeft} statsRight={pokemonStatsRight}/>
            </motion.mesh>
            <OrbitControls
                minAzimuthAngle={-(15 * degree)}
                maxAzimuthAngle={15 * degree}
                minPolarAngle={75 * degree}
                maxPolarAngle={105 * degree}
                enableDamping
                enableZoom={false}
                enablePan={false}/>
        </Canvas>
    )
}
export default PokedexObject