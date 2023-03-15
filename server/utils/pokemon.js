/** ポケモンの取得 */
export const findPokemon = async (name) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemon = await response.json();
    return pokemon;
  } catch (err) {
    console.log("findPokemon Error", err);
  }
};
