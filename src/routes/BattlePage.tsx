import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";

const BattlePage = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ textAlign: "center", marginTop: "2rem" }}>
            <Typography variant="h2" gutterBottom>
            </Typography>
            <Typography variant="body1" gutterBottom>
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/", { state: { resetHome: true } })} // Redireciona para Home com a flag reset
                sx={{ marginTop: "2rem" }}
            >
                HOME
            </Button>
        </Container>
    );
};

export default BattlePage;
