import { Container, Grid, styled, Typography } from "@mui/material";
import React from "react";
import { Link, ScrollRestoration, useLoaderData } from "react-router-dom";
import { Header } from "../components/Header";
import InfiniteScroll from "react-infinite-scroll-component";
import { PokemonCard } from "../components/PokemonCard";
import { PokemonFilter } from "../components/PokemonFilter";

const CustonLink = styled(Link)`
    text-decoration: none;
    height: 100%;
    display: block;
`;

export function HomePage() {
    const { pokemons, next } = useLoaderData() as { pokemons: any[], next: string };
    const [pokemonList, setPokemonList] = React.useState(
        pokemons.map((poke: any) => ({
            name: poke.name,
            id: parseInt(poke.url.split("/").slice(-2, -1)[0]), // Obtém o ID correto da URL
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                poke.url.split("/").slice(-2, -1)[0]
            }.png`,
        }))
    );
    const [nextPage, setNextPage] = React.useState(next);

    const fetchNextPage = async () => {
        const data = await fetch(nextPage).then((res) => res.json()).catch(console.error);

        const pokemonsWithImages = await Promise.all(
            data.results.map(async (poke: any) => {
                const response = await fetch(poke.url);
                const pokemonData = await response.json();

                return {
                    name: pokemonData.name,
                    id: pokemonData.id, // Usa o ID correto do Pokémon
                    imageUrl: pokemonData.sprites.front_default || 
                              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`,
                };
            })
        );

        setPokemonList((prev) => [...prev, ...pokemonsWithImages]);
        setNextPage(data.next);
    };

    return (
        <>
            <ScrollRestoration />
            <Header title="PokeDex" />
            <Container maxWidth="lg" sx={{ padding: "1.5rem" }}>
                <PokemonFilter setPokemonList={setPokemonList} />
                <InfiniteScroll
                    dataLength={pokemonList.length}
                    next={fetchNextPage}
                    hasMore={!!nextPage}
                    loader={<Typography>Loading...</Typography>}
                >
                    <Grid container spacing={2}>
                        {pokemonList.map((item) => (
                            <Grid item key={item.id} xs={12} sm={6} md={4}>
                                <CustonLink to={`/pokemon/${item.id}`}>
                                    <PokemonCard pokemonName={item.name} pokemonNumber={item.id} />
                                </CustonLink>
                            </Grid>
                        ))}
                    </Grid>
                </InfiniteScroll>
            </Container>
        </>
    );
}
