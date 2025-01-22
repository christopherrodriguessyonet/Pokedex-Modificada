import { Chip, Typography } from "@mui/material";
import { List, ListItem } from "./List";
import { Pokemon } from "../types";

type Props = {
    pokemon: Pokemon
}

export const Abilities = ({ pokemon }: Props) => <>[]
    <Typography variant="h5" component={"h3"} gutterBottom align="center">
        Abilities
    </Typography>
    <List>
        {pokemon.abilities.map((item) => (
            <ListItem key={item.ability.name}>
                <Chip label={item.ability.name} color="secondary" />
            </ListItem>
        ))}
    </List></>
