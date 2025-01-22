import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: ["'Press Start 2P'", "'Roboto'", "sans-serif"].join(",")
    },
})

export const ThemeProvider = ({ children }: React.PropsWithChildren) => 
    <MuiThemeProvider theme={theme} >{children}</MuiThemeProvider>
