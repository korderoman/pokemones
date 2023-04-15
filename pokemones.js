document.addEventListener('DOMContentLoaded', ()=>{
    getPokemons();
})

const getPokemons=async ()=>{
    const response= await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
    const data = await response.json();
    const pokemons= data.results
    const pokemonList = document.querySelector('#pokemonList');
    pokemonList.textContent = '';
    let card='';
    pokemons.forEach(async(pokemon) => {
        const details= await detailPokemon(pokemon.url)
        card += `
        <div class="card ms-3 mb-3" style="width: 18rem;">
        <img src="${getImagePokemin(pokemon.url)}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title text-uppercase">${pokemon.name}</h5>
          <p class="card-text">
            ${details.map(d=>{
                return `<li>
                    ${d.ability.name}                
                </li>`
            })}
          </p>
        </div>
      </div>
        `
        pokemonList.innerHTML=card;
    });

}

const detailPokemon=async (rawUrl)=>{
    const baseApitDetail = rawUrl;
    const response = await fetch(baseApitDetail);
    const data = await response.json();
    return data.abilities;
}

const getImagePokemin=(rawUrl)=>{
    const aux = rawUrl.split('pokemon/')[1];
    const position = aux.split('/')[0];
    const base="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
    return `${base}/${position}.png`
}

