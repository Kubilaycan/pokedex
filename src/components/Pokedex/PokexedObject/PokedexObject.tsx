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
    const [canZoom, setCanZoom] = useState<boolean>();
    const [canPan, setCanPan] = useState<boolean>();

    const [pokemonImageUrl, setPokemonImageUrl] = useState<string>();
    const [pokemonName, setPokemonName] = useState<string>();
    const [pokemonAbilities, setPokemonAbilities] = useState<string[]>();
    const [pokemonStatsLeft, setPokemonStatsLeft] = useState<string[]>();
    const [pokemonStatsRight, setPokemonStatsRight] = useState<string[]>();

    useEffect(() => {
        setModelScale(calculateScale());
        calculateZoomAndPanConditions();
    }, [screenSize]);

    useEffect(() => {
        setPokemonImageUrl(pokemon?.sprites.front_default);
        setPokemonName(Capitalize(pokemon?.name));

        const abilityArray: string[] = [];
        abilities?.forEach((ability) => {
            const line = Capitalize(ability.name, '-') + ': ' + ability.effect_entries.find(p => p.language.name === 'en')?.short_effect;
            const lines = line.match(/.{1,52}/g);
            lines?.forEach(p => {
                abilityArray.push(p);
            })
        })
        setPokemonAbilities(abilityArray);

        const statLeftArray: string[] = [];
        const statRightArray: string[] = [];
        pokemon?.stats.forEach((stat) => {
            if (stat.stat.name == 'hp' || stat.stat.name == 'attack' || stat.stat.name == 'special-attack') {
                const line = stat.stat.name.toUpperCase().replace('-', ' ') + ': ' + stat.base_stat;
                statLeftArray.push(line);
            }
            if (stat.stat.name == 'defense' || stat.stat.name == 'special-defense' || stat.stat.name == 'speed') {
                const line = stat.stat.name.toUpperCase().replace('-', ' ') + ': ' + stat.base_stat;
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

    function calculateZoomAndPanConditions(): void {
        if (screenSize.width > 1100) {
            setCanPan(false);
            setCanZoom(false);
        } else 
        if (screenSize.width <= 1100 && screenSize.width > 720){
            setCanPan(false);
            setCanZoom(false);
        } else 
        if (screenSize.width <= 720) {
            setCanPan(true);
            setCanZoom(true);
        }
    }

    return (
        <Canvas>
            <ambientLight intensity={2} />
            <directionalLight position={[2, 2, 2]} />
            <motion.mesh scale={modelScale} animate={{scale: modelScale}}>
                <PokedexModel imageUrl={pokemonImageUrl} name={pokemonName} abilities={pokemonAbilities} statsLeft={pokemonStatsLeft} statsRight={pokemonStatsRight}/>
            </motion.mesh>
            <OrbitControls
                minAzimuthAngle={-Math.PI / 4}
                maxAzimuthAngle={Math.PI / 4}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI - Math.PI / 6}
                enableDamping
                enableZoom={canZoom}
                enablePan={canPan}/>
        </Canvas>
    )
}
export default PokedexObject