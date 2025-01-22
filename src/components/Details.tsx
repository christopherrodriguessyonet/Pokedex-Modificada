import { Typography, Grid, styled } from "@mui/material"
import { Pokemon } from "../types"
import { Abilities } from "./Abilities"
import { Moves } from "./Moves"
import { Stats } from "./Stats"
import { Types } from "./Types"

import ImgNotAvailable from "../assets/Image_not_available.png"

type Props = { pokemon: Pokemon }

const ImgContainer = styled("div")`
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
`;

const Img = styled("img")`
    max-width: 100%;
`;

export const Details = ({ pokemon }: Props) => {
    return <>
        <Typography variant="h4" component="h2"># {pokemon.id}</Typography>
        <ImgContainer>
            <Img
                src={
                    pokemon.sprites.other["official-artwork"].front_default ??
                    pokemon.sprites.front_default ??
                    ImgNotAvailable
                }
            />
        </ImgContainer>
        <Grid container spacing={2} sx={{ marginBottom: "1.5rem" }}>
            <Grid item xs={12} sm={6}>
                <Stats pokemon={pokemon} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Types pokemon={pokemon} />
                <Abilities pokemon={pokemon} />
            </Grid>
        </Grid>
        <Moves pokemon={pokemon} />
    </>
}
