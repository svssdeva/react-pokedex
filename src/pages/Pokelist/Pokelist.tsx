import PokemonCard from "../../components/PokemonCard.tsx";
import './Pokelist.css';
import {useCallback, useEffect, useRef, useState} from "react";
import { useNavigate } from 'react-router-dom';
interface Pokemon {
    name: string;
    url: string;
    index: number;
}
export default function Pokelist() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");
   // const [showScroll, setShowScroll] = useState(false);
    const [totalCount, setTotalCount] = useState<number>(0);
    const loader = useRef(null);
    const hasLoadedOnce = useRef(false);
    const navigate = useNavigate();
    const handleCardClick = (index: number) => {
        navigate(`/pokemon/${index}`);
    };
    const getPokemons = useCallback((offset: number, limit = 20) => {
        setIsLoading(true);
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
            .then(res => res.json())
            .then(data => {
                if (totalCount === 0) {
                    setTotalCount(data.count); // only set once
                }

                const enrichedResults = data.results.map((pokemon: any) => {
                    const match = pokemon.url.match(/\/pokemon\/(\d+)\//);
                    return {
                        ...pokemon,
                        index: match ? parseInt(match[1]) : null,
                    };
                });

                setPokemons(prev => {
                    const existingIndexes = new Set(prev.map(p => p.index));
                    const newUnique = enrichedResults.filter((p: { index: number; }) => !existingIndexes.has(p.index));
                    return [...prev, ...newUnique];
                });

                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch Pokemons", err);
                setIsLoading(false);
            });
    }, [totalCount]);

    useEffect(() => {
        if (!hasLoadedOnce.current) {
            getPokemons(offset); // initial load
            hasLoadedOnce.current = true;
        }
    }, [getPokemons]);
    useEffect(() => {
        if (offset !== 0) {
            getPokemons(offset);
        }
    }, [offset]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                const first = entries[0];
                if (first.isIntersecting && !isLoading) {
                    if (hasLoadedOnce.current && (totalCount === null || offset + 20 < totalCount)) {
                        setOffset(prev => prev + 20);
                    }
                }
            },
            { threshold: 1.0 }
        );

        const currentLoader = loader.current;
        if (currentLoader) observer.observe(currentLoader);

        return () => {
            if (currentLoader) observer.unobserve(currentLoader);
        };
    }, [isLoading]);

    useEffect(() => {
        if (search.trim()) {
            const filtered = pokemons.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredPokemons(filtered);
        } else {
            setFilteredPokemons(pokemons);
        }
    }, [search, pokemons]);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         setShowScroll(window.scrollY > 300);
    //     };
    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

   // const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Pokédex</h1>

            {/* Search */}
            <input
                type="text"
                placeholder="Search Pokémon..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full mb-4 p-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {(isLoading && pokemons.length === 0)
                    ? Array.from({ length: 10 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-gray-100 animate-pulse h-28 rounded-2xl"
                        />
                    ))
                    : filteredPokemons.map((pokemon) => (
                        <PokemonCard
                            key={`${pokemon.name}-${pokemon.index}`}
                            index={pokemon.index}
                            name={pokemon.name}
                            onClick={() => handleCardClick(pokemon.index)}
                        />
                    ))}
            </div>

            {/* Infinite Scroll Loader */}
            <div ref={loader} className="h-24 flex items-center justify-center">
                {isLoading && pokemons.length > 0 && (
                    <p className="text-gray-500 animate-pulse">Loading more Pokémon...</p>
                )}
            </div>

            {/*/!* Scroll to Top Button *!/*/}
            {/*{showScroll && (*/}
            {/*    <button*/}
            {/*        onClick={scrollToTop}*/}
            {/*        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition"*/}
            {/*    >*/}
            {/*        ⬆*/}
            {/*    </button>*/}
            {/*)}*/}
        </div>
    );
}

