import Link from "next/link";
import { pokemons } from "../../data/pokemon";
import Image from "next/image";

export default function Page() {
  return (
    <div className="container">
      <h1 className="text-center font-bold text-3xl py-5">ポケモンリスト</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 py-4 justify-items-center gap-2">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="py-5 px-7 border-2 rounded-2xl relative"
          >
            <h2 className="font-bold text-center pb-2">{pokemon.name}</h2>
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={200}
              height={200}
            />
            <Link href={`/pokemon/detail/${pokemon.id}`}>
              <span className="absolute inset-0"></span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
