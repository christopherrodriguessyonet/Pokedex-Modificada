import { ScrollRestoration, useLoaderData, useNavigate} from "react-router-dom"
import { Header } from "../components/Header"
import { capitalize, Container, Typography } from "@mui/material"
import type { Pokemon } from "../types";

import { useCallback, useMemo } from "react";
import { Details } from "../components/Details";


export const PokemonDetailsPage = () => {
    const pokemon = useLoaderData() as Pokemon;
    const navigate = useNavigate()

    const onNext = useCallback(async () => {
        const nextId = pokemon.id + 1
        if (nextId > 1025) return
        navigate(`/pokemon/${nextId}`)
    }, [pokemon.id])

    const onPrevius = useCallback(async () => {
        const previusId = pokemon.id - 1
        if (previusId < 1) return;
        navigate(`/pokemon/${previusId}`)
    }, [pokemon.id])

    const nextComponent = useMemo(() => (
        <Typography 
            variant="h4"
            onClick={onNext}
            component="button" >{">"}</Typography>
    ), [onNext])

    const previusComponent = useMemo(() => (
        <Typography 
            variant="h4"
            onClick={onPrevius}
            component="button" >{"<"}</Typography>
    ), [onPrevius])
    
    return (
        <>
            <ScrollRestoration />
            <Header 
                title={capitalize(pokemon.name)} 
                showHomeBtn
                next={nextComponent}
                previus={previusComponent} />
            <Container maxWidth="md" sx={{padding: "1.5rem"}}>
                <Details pokemon={pokemon} />
            </Container>
        </>
    )
}