import { styled } from "@mui/material";

export const List = styled("ul")`
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    justify-content: center;
`

export const ListItem = styled("li")(({theme}) => ({
    margin: theme.spacing(0.5),
    listStyle: "none",
}))
