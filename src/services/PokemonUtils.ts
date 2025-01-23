export const mapPokemons = (results: any[]) => {
    return results.map((poke: any) => ({
        name: poke.name,
        id: parseInt(poke.url.split("/").slice(-2, -1)[0]),
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            poke.url.split("/").slice(-2, -1)[0]
        }.png`,
    }));
};
