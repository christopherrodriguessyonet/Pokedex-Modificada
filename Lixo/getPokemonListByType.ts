/*interface PokemonListByTypeResponse {
  pokemon: { pokemon: { name: string; url: string } }[];
}

export const getPokemonListByType = async (type: string): Promise<Pokemon[]> => {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data: PokemonListByTypeResponse = await response.json();
  
  const pokemonDetails = await Promise.all(
    data.pokemon.map(async (pokemonData) => {
      const pokemonId = pokemonData.pokemon.url.split("/").slice(-2, -1)[0];
      const details = await getPokemon(Number(pokemonId)); 
      return details;
    })
  );

  return pokemonDetails;
};
*/