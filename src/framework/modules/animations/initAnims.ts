import { initScrollAnims } from "./scrollAnims";
import { initButtonAnims } from "./buttonAnims";
import { initManufCard } from "./manufCard";
import { initNavAnims } from "./nav";
import { initContactAnims } from "./contactHover";

export function initAnims() {

    const cleanups = [
        initScrollAnims(),
        initButtonAnims(),
        initManufCard(),
        initNavAnims(),
        initContactAnims(),
    ]

    return () => {
        cleanups.forEach(cleanup => cleanup());
    };
    
}