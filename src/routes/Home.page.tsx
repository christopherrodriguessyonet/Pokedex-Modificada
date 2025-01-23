import { Container, Grid, styled, Typography } from "@mui/material";
import React, { useEffect, useCallback } from "react";
import { Link, ScrollRestoration, useLoaderData, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import InfiniteScroll from "react-infinite-scroll-component";
import { PokemonCard } from "../components/PokemonCard";
import { PokemonFilter } from "../components/PokemonFilter";
import { mapPokemons } from "../services/pokemonsUtils";

const CustonLink = styled(Link)`
    text-decoration: none;
    height: 100%;
    display: block;
`;

export function HomePage() {
    const { pokemons, next } = useLoaderData() as { pokemons: any[], next: string };
    const location = useLocation();

    const [pokemonList, setPokemonList] = React.useState(mapPokemons(pokemons));
    const [nextPage, setNextPage] = React.useState(next);

    // Reseta os dados iniciais ao clicar em "Home"
    const resetToInitialState = useCallback(() => {
        setPokemonList(mapPokemons(pokemons));
        setNextPage(next);
    }, [pokemons, next]);

    // Detecta mudanças na rota e reseta quando necessário
    useEffect(() => {
        if (location.pathname === "/") {
            resetToInitialState();
        }
    }, [location.pathname, resetToInitialState]);

    const fetchNextPage = async () => {
        const data = await fetch(nextPage).then((res) => res.json()).catch(console.error);
        setPokemonList((prev) => [...prev, ...mapPokemons(data.results)]);
        setNextPage(data.next);
    };

    return (
        <>
            <ScrollRestoration />
            <Header title="PokeDex" />
            <Container maxWidth="lg" sx={{ padding: "1.5rem" }}>
                {/* Botões para filtrar Pokémon por tipo */}
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
                                    <PokemonCard
                                        pokemonName={item.name}
                                        pokemonNumber={item.id}
                                    />
                                </CustonLink>
                            </Grid>
                        ))}
                    </Grid>
                </InfiniteScroll>
            </Container>
        </>
    );
}