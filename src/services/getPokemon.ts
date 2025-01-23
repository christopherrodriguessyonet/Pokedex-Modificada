import type { Pokemon } from "../types";

export const getPokemon = (pokemonId: number): Promise<Pokemon> => 
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => response.json())
        .catch(console.error)