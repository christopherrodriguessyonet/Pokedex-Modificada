import { getPokemon } from "../services/getPokemon"
import { LoaderFunctionArgs } from "react-router-dom"


export async function pokemonDetailsPageLoader({params: { id }}: LoaderFunctionArgs) {
    if (!id) {
        throw new Error("Id não definido")
    }
    return getPokemon(+id);
}