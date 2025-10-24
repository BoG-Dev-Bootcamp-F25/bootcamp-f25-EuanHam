export const GET = async (
  req: Request,
  context: { params: Promise<{ pokemon: string }> } 
): Promise<Response> => {
    try {
        const { pokemon } = await context.params;
        const pokemonName = pokemon?.toLowerCase();
        
        if (!pokemonName) {
            return Response.json({ error: "Missing Pokémon name" }, { status: 400 });
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        if (!response.ok) {
            console.log('PokeAPI error:');
            return Response.json({ status: 404 });
        }

        const pokemonData = await response.json();

        return Response.json({
            name: pokemonData.name,
            sprite: pokemonData.sprites.front_default,
            type: pokemonData.types.map((type: any) => type.type.name)
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching pokemon:', error);
        return Response.json({ 
            error: "Internal Server Error" 
        }, { status: 500 });
    }

};