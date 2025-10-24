export const GET = async (req: Request): Promise<Response> => {

    try {
        const pokeIndex = Math.floor(Math.random() * 1025) + 1;
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeIndex}`);


        const pokemonJson = await pokemon.json();
        const filteredData = {
            name: pokemonJson.name,
            sprite: pokemonJson.sprites.front_default,
            type: pokemonJson.types.map((type: any) => type.type.name)

        };

        return Response.json(filteredData, { status: 200 });
    } catch (error) {
        return Response.json("Error", {status: 500});
    }


};