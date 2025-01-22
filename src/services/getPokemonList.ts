export const getPokemonList = (limit = 20) => 
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
        .then(response => response.json())
        .catch(console.error)
