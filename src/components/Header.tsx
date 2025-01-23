import { memo } from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const Component = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="error">
        <Toolbar>
          <Button
            color="inherit"
            onClick={() => navigate("/")}
            variant="text"
          >
            HOME
          </Button>

          {location.pathname === "/" && (
            <Button
            color="inherit"
            onClick={() => window.location.href = "battle.html"} // Redireciona para o arquivo HTML
            variant="text"
            sx={{ marginLeft: 3 }}
          >
            BATALHA
          </Button>
          )}

          <Box display="flex" justifyContent="space-evenly" flexGrow={1}>
            <Typography variant="h4" component="h1" align="center">
              {props.title}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginTop: "64px" }}></Box>
    </Box>
  );
};

export const Header = memo(Component);
