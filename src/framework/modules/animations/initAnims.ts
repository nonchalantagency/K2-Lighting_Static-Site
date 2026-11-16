import { initScrollAnims } from "./scrollAnims";
import { initButtonAnims } from "./buttonAnims";
import { initManufCard } from "./manufCard";

export function initAnims() {

    const cleanups = [
        initScrollAnims(),
        initButtonAnims(),
        initManufCard(),
    ]

    return () => {
        cleanups.forEach(cleanup => cleanup());
    };
    
}