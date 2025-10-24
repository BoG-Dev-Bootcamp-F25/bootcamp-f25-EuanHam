export const GET = async (
    req: Request,
    context: { params: Promise<{ type: string }> }
): Promise<Response> => {
    try {
        const { type } = await context.params;
        const typeName = type?.toLowerCase();

        if (!typeName) {
            return Response.json({ error: "Missing type" }, { status: 400 });
        }

        const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);

        if (!response.ok) {
            return Response.json({ error: "Type not found" }, { status: 404 });
        }

        const typeData = await response.json();
        const pokemonList = typeData.pokemon.map((p: any) => p.pokemon.name);

        return Response.json({ pokemon: pokemonList }, { status: 200 });
    } catch (error) {
        return Response.json("Error", { status: 500 });
    }
};