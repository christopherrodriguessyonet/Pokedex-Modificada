import { getPokemonList } from "../services/getPokemonList";

export async function HomePageLoader() {
    const data  = await getPokemonList()
    return { pokemons: data.results, next: data.next }
}
