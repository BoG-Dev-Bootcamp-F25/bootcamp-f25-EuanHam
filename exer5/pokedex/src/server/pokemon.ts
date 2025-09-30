const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon"; //Put the url for the endpoint into a variable for readability and convenience :)

const getPokemonJSON = async (dexNumber: number): Promise<any> => {
    try {
        const response = await fetch(`${POKEMON_API_URL}/${dexNumber}/`); //A string template literal; basically a more readable way to put variables in a string
        const pokemonJSON = await response.json();
        return pokemonJSON;
    } catch(e) {
        throw e;
    }
}

export { getPokemonJSON };

const exampleUsage = async () => {
    const pokemonJSON = await getPokemonJSON(1); //bulbasaur
    
    const pokemonTypes = pokemonJSON.types;
    const pokemonMoves = pokemonJSON.moves;
    const pokemonSprite = pokemonJSON.sprites;
    const pokemonStats = pokemonJSON.stats;
    const pokemonName = pokemonJSON.name;
    const pokemonHeight = pokemonJSON.height;
    const pokemonWeight = pokemonJSON.weight;
    const pokemonDexNumber = pokemonJSON.order;
};