import { Container, Grid, styled, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, ScrollRestoration, useLoaderData } from "react-router-dom";
import { Header } from "../components/Header";
import InfiniteScroll from "react-infinite-scroll-component";
import { PokemonCard } from "../components/PokemonCard";

const CustonLink = styled(Link)`
    text-decoration: none;
    height: 100%;
    display: block;
`;

export function HomePage() {
    const { pokemons, next } = useLoaderData() as { pokemons: any[], next: string };
    const [pokemonList, setPokemonList] = useState(
        pokemons.map((poke: any) => ({
            name: poke.name,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.url.split("/")[poke.url.split("/").length - 2]}.png`,
            id: poke.url.split("/")[poke.url.split("/").length - 2], // ID do Pokémon extraído da URL
        }))
    );
    const [nextPage, setNextPage] = useState(next);
    const [selectedType, setSelectedType] = useState("");

    const types = [
        "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", 
        "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", 
        "steel", "fairy"
    ];

    const fetchPokemonsByType = async (type: string) => {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await response.json();
        const pokemonsWithImages = await Promise.all(
            data.pokemon.map(async (poke: any) => {
                const pokemonData = await fetch(poke.pokemon.url).then(res => res.json());
                return {
                    name: poke.pokemon.name,
                    imageUrl: pokemonData.sprites.front_default,
                    id: pokemonData.id,
                };
            })
        );
        setPokemonList(pokemonsWithImages);
    };

    const fetchNextPage = async () => {
        const data = await fetch(nextPage).then(res => res.json()).catch(console.error);
        setPokemonList(prev => [
            ...prev,
            ...data.results.map((poke: any) => ({
                name: poke.name,
                imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.url.split("/")[poke.url.split("/").length - 2]}.png`,
                id: poke.url.split("/")[poke.url.split("/").length - 2],
            }))
        ]);
        setNextPage(data.next);
    };

    useEffect(() => {
        if (selectedType) {
            fetchPokemonsByType(selectedType);
        } else {
            setPokemonList(pokemons.map((poke: any) => ({
                name: poke.name,
                imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.url.split("/")[poke.url.split("/").length - 2]}.png`,
                id: poke.url.split("/")[poke.url.split("/").length - 2],
            })));
        }
    }, [selectedType]);

    return (
        <>
            <ScrollRestoration />
            <Header title="PokeDex" />
            <Container maxWidth="lg" sx={{ padding: "1.5rem" }}>
                <div>
                    {types.map((type) => (
                        <Button
                            key={type}
                            variant="contained"
                            onClick={() => setSelectedType(type)}
                            sx={{ margin: "0.5rem" }}
                        >
                            {type}
                        </Button>
                    ))}
                </div>
                <InfiniteScroll
                    dataLength={pokemonList.length}
                    next={fetchNextPage}
                    hasMore={!!nextPage}
                    loader={<Typography>Loading...</Typography>}
                >
                    <Grid container spacing={2}>
                        {pokemonList.map((item) => (
                            <Grid item key={item.id} xs={12} sm={6} md={4}>
                                <CustonLink to={`/pokemon/${item.id}`}> {}
                                    <PokemonCard 
                                        pokemonName={item.name} 
                                        pokemonNumber={item.id}
                                        pokemonImage={item.imageUrl}
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
