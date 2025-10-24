export const GET = async (
    req: Request,
    context: { params: Promise<{ name: string }> }
): Promise<Response> => {
    try {
        const { name } = await context.params;
        const pokemonName = name?.toLowerCase();

        if (!pokemonName) {
            return Response.json({ error: "Missing Pokemon name" }, { status: 400 });
        }

        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!pokemonResponse.ok) {
            return Response.json({ error: "Pokemon not found" }, { status: 404 });
        }
        const pokemonData = await pokemonResponse.json();

        const speciesResponse = await fetch(pokemonData.species.url);
        if (!speciesResponse.ok) {
            return Response.json({ error: "Species not found" }, { status: 404 });
        }
        const speciesData = await speciesResponse.json();

        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        if (!evolutionResponse.ok) {
            return Response.json({ error: "Evolution not found" }, { status: 404 });
        }
        const evolutionData = await evolutionResponse.json();

        let nextEvolution = pokemonName;

        const findPokemon = (chain: any, name: string): any => {
            if (chain.species.name === name) {
                return chain;
            }
            for (const evolution of chain.evolves_to) {
                const found = findPokemon(evolution, name);
                if (found) return found;
            }
            return null;
        };

        const currentInChain = findPokemon(evolutionData.chain, pokemonName);
        if (currentInChain && currentInChain.evolves_to.length > 0) {
            nextEvolution = currentInChain.evolves_to[0].species.name;
        }

        return Response.json({
            current: pokemonName,
            nextEvolution: nextEvolution
        }, { status: 200 });
    } catch (error) {
        return Response.json("Error", { status: 500 });
    }
};