export const POST = async (
    req: Request
): Promise<Response> => {
    try {
        const body = await req.json();
        const { pokemon1, pokemon2 } = body;

        if (!pokemon1 || !pokemon2) {
            return Response.json({ error: "Missing pokemon names" }, { status: 400 });
        }

        // Fetch both Pokemon data in parallel
        const [response1, response2] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon1.toLowerCase()}`),
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon2.toLowerCase()}`)
        ]);

        if (!response1.ok || !response2.ok) {
            return Response.json({ error: "One or both Pokemon not found" }, { status: 404 });
        }

        const [data1, data2] = await Promise.all([
            response1.json(),
            response2.json()
        ]);

        // Calculate total base stats
        const stats1 = data1.stats.reduce((sum: number, stat: any) => sum + stat.base_stat, 0);
        const stats2 = data2.stats.reduce((sum: number, stat: any) => sum + stat.base_stat, 0);

        // Determine winner
        const winner = stats1 > stats2 ? data1 : data2;

        return Response.json({
            name: winner.name,
            sprite: winner.sprites.front_default,
            type: winner.types.map((type: any) => type.type.name)
        }, { status: 200 });

    } catch (error) {
        return Response.json("Error", { status: 500 });
    }
};