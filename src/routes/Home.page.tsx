import { Container, Grid, styled, Typography } from "@mui/material";
import React from "react";
import { Link, ScrollRestoration, useLoaderData } from "react-router-dom";
import { Header } from "../components/Header";
import InfiniteScroll from "react-infinite-scroll-component";
import { PokemonCard } from "../components/PokemonCard";

const CustonLink = styled(Link)`
    text-decoration: none;
    height: 100%;
    display: block;
`

export function HomePage() {
    const { pokemons, next } = useLoaderData() as { pokemons: any[], next: string };

    const [pokemonList, setPokemonList] = React.useState(pokemons)
    const [nextPage, setNextPage] = React.useState(next)

    const fetchNextPage = async () => {
        const data = await fetch(nextPage).then(res => res.json()).catch(console.error)
        setPokemonList(prev => [...prev, ...data.results])
        setNextPage(data.next)
    }
    
    return (
        <>
            <ScrollRestoration />
            <Header title="PokeDex"/>
            <Container maxWidth="lg" sx={{padding: "1.5rem"}}>
                <InfiniteScroll
                    dataLength={pokemonList.length}
                    next={fetchNextPage}
                    hasMore={!!nextPage}
                    loader={<Typography>Loading...</Typography>}
                >
                    <Grid container spacing={2}>
                        {pokemonList.map((item, index) => (
                            <Grid item key={item.name} xs={12} sm={6} md={4}>
                                <CustonLink to={`/pokemon/${index + 1}`}>
                                    <PokemonCard pokemonName={item.name} pokemonNumber={index + 1}/>
                                </CustonLink>
                            </Grid>
                        ))}
                    </Grid>
                </InfiniteScroll>
            </Container>
        </>
    )
}
