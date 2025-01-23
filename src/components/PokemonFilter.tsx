import React, { useState } from "react";
import { Button } from "@mui/material";

interface PokemonFilterProps {
    setPokemonList: React.Dispatch<React.SetStateAction<any[]>>;
}

export const PokemonFilter: React.FC<PokemonFilterProps> = ({ setPokemonList }) => {
    const [selectedType, setSelectedType] = useState("");

    const types = [
        "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", 
        "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", 
        "steel", "fairy"
    ];

    const fetchPokemonsByType = async (type: string) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
            const data = await response.json();

            // Busca os detalhes completos de cada Pokémon
            const pokemonsWithImages = await Promise.all(
                data.pokemon.map(async (poke: any) => {
                    const pokemonResponse = await fetch(poke.pokemon.url);
                    const pokemonData = await pokemonResponse.json();

                    return {
                        name: pokemonData.name,
                        imageUrl: pokemonData.sprites.front_default,
                        id: pokemonData.id,
                    };
                })
            );

            setPokemonList(pokemonsWithImages);
        } catch (error) {
            console.error("Erro ao buscar Pokémon por tipo:", error);
        }
    };

    const handleTypeClick = (type: string) => {
        setSelectedType(type);
        fetchPokemonsByType(type);
    };

    return (
        <div>
            {types.map((type) => (
                <Button
                    key={type}
                    variant={type === selectedType ? "contained" : "outlined"}
                    onClick={() => handleTypeClick(type)}
                    sx={{ margin: "0.5rem" }}
                >
                    {type}
                </Button>
            ))}
        </div>
    );
};