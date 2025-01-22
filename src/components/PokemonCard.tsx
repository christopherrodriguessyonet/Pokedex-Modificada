import { Card, CardActionArea, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material"
import { LazyLoadImage } from 'react-lazy-load-image-component';

type Props = {
    pokemonName: string
    pokemonNumber: number
}

export const PokemonCard = (props: Props)  => {
    return (
        <Card key={props.pokemonName} sx={{height: "100%", display: "flex"}}>
            <CardActionArea
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <CardMedia sx={{width: "96px", height: "96px"}}>
                    <LazyLoadImage
                        alt={`${props.pokemonName} image`}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemonNumber}.png`}
                        width={"96px"}
                        height={"96px"}
                        placeholder={<CircularProgress />}/>
                    </CardMedia>
                    <CardContent>
                        <Typography>
                            {props.pokemonNumber}. {props.pokemonName}
                        </Typography>
                    </CardContent>
                </CardActionArea>
        </Card>
    )
}
