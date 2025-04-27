import './PokemonCard.css';
interface Props {
    name: string;
    index: number;
    onClick?: () => void
}

export default function PokemonCard({ name, index, onClick }: Props) {
    const getPokeImage = (index: number) => {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;
    };

    return (
        <div   onClick={onClick} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 text-center flex flex-col items-center">
            <img
                src={getPokeImage(index)}
                alt={name}
                className="w-20 h-20 mb-2"
                loading="lazy"
            />
            <p className="capitalize text-sm font-medium">{name}</p>
        </div>
    );
}