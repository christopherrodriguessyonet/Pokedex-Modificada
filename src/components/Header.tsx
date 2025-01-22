import { memo } from "react"
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"

type Props = { 
    showHomeBtn?: boolean
    title: string
    next?: JSX.Element
    previus?: JSX.Element
}

const Component = (props: Props) => {
    const navigate = useNavigate();
    const location = useLocation(); // Obtém a rota atual

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="fixed" color="error">
                <Toolbar>
                    {/* Mostrar o botão HOME em todas as páginas */}
                    <Button color="inherit" onClick={() => navigate("/")} variant="text" >HOME</Button>
                    
                    {/* Mostrar o botão BATALHA somente na página principal */}
                    {location.pathname === "/" && (
                        <Button color="inherit" onClick={() => navigate("/batalha")} variant="text" 
                        sx={{ marginLeft: 3 }}>BATALHA</Button>
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
            <Box sx={{ marginTop: '64px' }}>
            </Box>
        </Box>
    )
}

const propsAreEqual = (prevProps: Readonly<Props>, nextProps: Readonly<Props>) => {
    return prevProps.title === nextProps.title;
}

export const Header = memo(Component, propsAreEqual)
