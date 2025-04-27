import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import type {PokemonDetail} from "../../types/pokemonDetails";
import ErrorBoundary from "../../components/ErrorBoundary.tsx";

export default function PokemonDetailPage() {
    return (
        <ErrorBoundary>
            <PokemonDetail />
        </ErrorBoundary>
    )
}

function PokemonDetail() {
    const { index } = useParams();
    const [pokemon, setPokemon] = useState({} as PokemonDetail);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    useEffect(() => {
        setLoading(true);
        async function getPokemon() {
            try {
                const url = `https://pokeapi.co/api/v2/pokemon/${index}`;
                const res = await fetch(url);
                const json = await res.json();
                const mappedPokemon: PokemonDetail = {
                    id: json.id,
                    name: json.name,
                    moves: json.moves.map((moveObj: any) => moveObj.move.name),
                    height: json.height,
                    weight: json.weight,
                    abilities: json.abilities.map((abilityObj: any) => abilityObj.ability.name),
                    forms: json.forms.map((formObj: any) => formObj.name),
                    cries: {
                        legacy: json.cries?.legacy ?? '',
                        latest: json.cries?.latest ?? '',
                    },
                    species: json.species?.name ?? '',
                    stats: {
                        hp: json.stats.find((s: any) => s.stat.name === "hp")?.base_stat ?? 0,
                        attack: json.stats.find((s: any) => s.stat.name === "attack")?.base_stat ?? 0,
                        defense: json.stats.find((s: any) => s.stat.name === "defense")?.base_stat ?? 0,
                        specialAttack: json.stats.find((s: any) => s.stat.name === "special-attack")?.base_stat ?? 0,
                        specialDefense: json.stats.find((s: any) => s.stat.name === "special-defense")?.base_stat ?? 0,
                        speed: json.stats.find((s: any) => s.stat.name === "speed")?.base_stat ?? 0,
                    },
                    types: json.types.map((typeObj: any) => typeObj.type.name),
                };

                setPokemon(mappedPokemon);
                if (json.cries?.latest) {
                    const cryAudio = new Audio(json.cries.latest);
                    setAudio(cryAudio);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
       getPokemon();
    }, [index]);
    useEffect(() => {
        if (pokemon && pokemon.name) {
            console.log("Pokemon loaded:", pokemon);
        }
    }, [pokemon]);

    if (loading) {
        return <div className="p-4 text-center">Loading...</div>;
    }
    if (!pokemon.id) {
        return <div className="p-4 text-center text-red-500">Failed to load Pokémon.</div>;
    }
    const handlePlayCry = () => {
        audio?.play();
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
                <div className="flex flex-col items-center">
                    {/* Pokémon Images */}
                    <div className="flex gap-4 items-center">
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}
                            alt={`Pokemon ${index}`}
                            className="w-24 h-24"
                        />
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${index}.png`}
                            alt={`Pokemon Shiny ${index}`}
                            className="w-24 h-24"
                        />
                    </div>

                    {/* Name and ID */}
                    <h1 className="text-3xl font-bold capitalize mt-4">{pokemon.name}</h1>
                    <p className="text-gray-600">#{pokemon.id}</p>

                    {/* Cry button */}
                    <button
                        onClick={handlePlayCry}
                        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                    >
                        Play Cry
                    </button>
                </div>

                {/* Info Section */}
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                        <p className="font-semibold">Height:</p>
                        <p>{pokemon.height / 10} m</p>
                    </div>
                    <div>
                        <p className="font-semibold">Weight:</p>
                        <p>{pokemon.weight / 10} kg</p>
                    </div>
                    <div className="col-span-2">
                        <p className="font-semibold">Types:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {pokemon.types.map((type) => (
                                <span key={type} className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs capitalize">
                                    {type}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Stats</h2>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <StatItem label="HP" value={pokemon.stats.hp} />
                        <StatItem label="Attack" value={pokemon.stats.attack} />
                        <StatItem label="Defense" value={pokemon.stats.defense} />
                        <StatItem label="Sp. Atk" value={pokemon.stats.specialAttack} />
                        <StatItem label="Sp. Def" value={pokemon.stats.specialDefense} />
                        <StatItem label="Speed" value={pokemon.stats.speed} />
                    </div>
                </div>

                {/* Abilities */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Abilities</h2>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                        {pokemon.abilities.map((ability) => (
                            <li key={ability} className="capitalize">{ability}</li>
                        ))}
                    </ul>
                </div>

                {/* Moves */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Moves</h2>
                    <div className="grid grid-cols-3 gap-2 text-sm text-gray-700">
                        {pokemon.moves.map((move) => (
                            <div key={move} className="capitalize">{move}</div>
                        ))}
                    </div>
                </div>

                {/* Back Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
                    >
                        Back to Pokédex
                    </button>
                </div>
            </div>
        </div>
    );
}

function StatItem({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex justify-between">
            <span>{label}</span>
            <span className="font-bold">{value}</span>
        </div>
    );
}