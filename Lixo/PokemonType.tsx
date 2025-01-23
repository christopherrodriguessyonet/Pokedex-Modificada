/*import { Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PokemonCard } from '../components/PokemonCard';
import { getPokemonListByType } from '../services/getPokemonListByType'; // Função para pegar Pokémons por tipo

export const PokemonTypePage = () => {
  const { type } = useParams<{ type: string }>(); // Pega o tipo da URL
  const [pokemons, setPokemons] = useState<any[]>([]); // Armazenar os Pokémons filtrados

  useEffect(() => {
    const fetchPokemons = async () => {
      if (type) {
        const data = await getPokemonListByType(type);
        setPokemons(data);
      }
    };
    
    fetchPokemons();
  }, [type]);

  return (
    <Container>
      {/* Botão Home para voltar à página inicial }
      <Link to="/" style={{ textDecoration: "none", marginBottom: "1rem", display: "inline-block" }}>
        <Typography variant="h6">Home</Typography>
      </Link>

      <Typography variant="h3" gutterBottom>
        Pokémons do Tipo {type}
      </Typography>
      
      <Grid container spacing={2}>
        {pokemons.map((pokemon) => (
          <Grid item key={pokemon.name} xs={12} sm={6} md={4}>
            {/* Link para a página de detalhes do Pokémon }
            <Link to={`/pokemon/${pokemon.id}`} style={{ textDecoration: "none" }}>
              <PokemonCard pokemonName={pokemon.name} pokemonNumber={pokemon.id} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};*/