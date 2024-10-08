import Link from "next/link";
import { pokemons } from "../data/pokemon";
import Image from "next/image";

export default function Page() {
  return (
    <div className="container">
      <h1 className="text-center font-bold text-3xl py-5">ポケモンリスト</h1>
      {/* <div className="grid grid-cols-4 justify-items-center px-4 gap-2 ">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="p-5">
            <h2 className="font-bold text-center">{pokemon.name}</h2>
            <img
              src={pokemon.image}
              alt={pokemon.name}
              width={200}
              height={200}
            />
          </div>
        ))}
      </div> */}
      {/* flex と　grid の使い分けがわからない　*/}
      {/* footerのButtonのように調整されない理由を知りたい*/}
      <div className="flex flex-wrap py-4 items-center justify-center px-4 gap-2">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="p-5 border-2 rounded-2xl relative">
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
