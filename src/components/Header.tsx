import { memo } from "react"
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

type Props = { 
    showHomeBtn?: boolean
    title: string
    next?: JSX.Element
    previus?: JSX.Element
}

const Component = (props: Props) => {
    const navigate = useNavigate();

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color="error">
                <Toolbar>
                    {props.showHomeBtn && (
                        <Button color="inherit" onClick={() => navigate("/")} variant="text" >HOME</Button>
                    )}
                    <Box display="flex" justifyContent="space-evenly" flexGrow={1}>
                    {props.previus}
                    <Typography 
                        variant="h4"
                        component="h1"
                        align="center" >{props.title}</Typography>
                    {props.next}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

const propsAreEqual = (prevProps: Readonly<Props>, nextProps: Readonly<Props>) => {
    return prevProps.title === nextProps.title;
}

export const Header =  memo(Component, propsAreEqual)
