import { memo } from "react";
import { Typography, Chip } from "@mui/material";
import { Pokemon } from "../types";
import { List, ListItem } from "./List";

const Component = ({ pokemon }: { pokemon: Pokemon }) => {
    return <>
        <Typography variant="h5" component={"h3"} gutterBottom align="center">
            Moves
        </Typography>
        <List>
            {pokemon.moves.map((item) => (
                <ListItem key={item.move.name}>
                    <Chip label={item.move.name} color="secondary" />
                </ListItem>
            ))}
        </List></>
}

export const Moves = memo(Component, (p, n) => p.pokemon.id === n.pokemon.id)
