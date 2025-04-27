export interface PokemonDetail {
    id: number;
    name: string;
    moves: string[];
    height: number;
    weight: number;
    abilities: string[];
    forms: string[];
    cries: Cries;
    species: string;
    stats: Stats;
    types: string[];
}

interface Cries {
    legacy: string
    latest: string
}
interface Stats {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
}