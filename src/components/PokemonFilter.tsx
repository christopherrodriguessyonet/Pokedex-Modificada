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
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await response.json();
        const pokemonsWithImages = data.pokemon.map((poke: any) => {
            const pokemonId = poke.pokemon.url.split("/")[6]; // Extrai o ID do Pokémon da URL
            return {
                name: poke.pokemon.name,
                imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`, // Corrigido para interpolação da URL
                id: pokemonId,
            };
        });
        setPokemonList(pokemonsWithImages);
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
