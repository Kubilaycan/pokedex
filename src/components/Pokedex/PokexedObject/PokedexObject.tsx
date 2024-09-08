import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion } from 'framer-motion-3d';
import PokedexModel from "../PokedexModel/PokedexModel";
import useScreenSize from "../../../hooks/useScreenSize";
import { useEffect, useState } from "react";

function PokedexObject() {
    const screenSize = useScreenSize();
    const [modelScale, setModelScale] = useState<number>(calculateScale);

    useEffect(() => {
        setModelScale(calculateScale());
    }, [screenSize])

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
    }

    return (
        <Canvas>
            <ambientLight intensity={2} />
            <directionalLight position={[2, 2, 2]} />
            <motion.mesh scale={modelScale} animate={{scale: modelScale}}>
                <PokedexModel />
            </motion.mesh>
            <OrbitControls
                minAzimuthAngle={-Math.PI / 4}
                maxAzimuthAngle={Math.PI / 4}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI - Math.PI / 6}
                enableDamping
                enableZoom={false}
                enablePan={false}/>
        </Canvas>
    )
}
export default PokedexObject