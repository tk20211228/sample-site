import { pokemons } from "@/app/data/pokemon";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const {
    id
  } = params;

  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  return (
    <div>
      <h1>{pokemon?.name}</h1>
      {/* <Image src={pokemon?.image} alt={pokemon?.name} width={200} height={200} /> */}

      <p>ここにポケモンの詳細情報が表示されます。</p>
    </div>
  );
}
