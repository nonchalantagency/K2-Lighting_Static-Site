import { initScrollAnims } from "./scrollAnims";
import { initButtonAnims } from "./buttonAnims";
import { initManufCard } from "./manufCard";
import { initNavAnims } from "./nav";

export function initAnims() {

    const cleanups = [
        initScrollAnims(),
        initButtonAnims(),
        initManufCard(),
        initNavAnims(),
    ]

    return () => {
        cleanups.forEach(cleanup => cleanup());
    };
    
}