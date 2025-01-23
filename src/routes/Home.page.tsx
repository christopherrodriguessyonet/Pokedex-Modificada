import { Container, Grid, styled, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, ScrollRestoration, useLoaderData, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import InfiniteScroll from "react-infinite-scroll-component";
import { PokemonCard } from "../components/PokemonCard";
import { PokemonFilter } from "../components/PokemonFilter";
import { mapPokemons } from "../services/pokemonUtils";

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

    // Restaura o estado inicial se vier da página de batalha
    useEffect(() => {
        if (location.state?.resetHome) {
            setPokemonList(mapPokemons(pokemons));
            setNextPage(next);
        }
    }, [location.state, pokemons, next]);

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
