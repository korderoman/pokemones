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
    pokemons.forEach(async(pokemon,index) => {
        const details= await detailPokemon(pokemon.url)
        card += `
        <div class="card ms-3 mb-3" style="width: 18rem;">
        <img src="${getImagePokemin(pokemon.url)}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title text-uppercase">${pokemon.name}</h5>
          <p class="card-text">
            ${details.abilities.map(d=>{
                return `<li>
                    ${d.ability.name}                
                </li>`
            })}
          </p>
          <button  data-bs-toggle="modal" data-bs-target="#exampleModal-${index+1}"  class="btn btn-primary">Open</button>
        </div>
      </div>
      <div class="modal fade" id="exampleModal-${index+1}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <img src="${getImagePokemin(pokemon.url)}" class="card-img-top" alt="...">
            <div class="d-flex justify-content-around">
             <div>Peso: ${details.weight} </div>             
             <div>Habilidades:
             <ul>
             ${details.abilities.map(d=>{
                return `<li>
                    ${d.ability.name}                
                </li>`
            })}
             </ul> 
             </div>              
             <div>Tipo:
                <ul>
                    ${details.types.map(t=>{
                        return `<li>
                        ${t.type.name}
                        </li>`
                    })}
                </ul>
             </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
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
    return data;
}

const getImagePokemin=(rawUrl)=>{
    const aux = rawUrl.split('pokemon/')[1];
    const position = aux.split('/')[0];
    const base="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
    return `${base}/${position}.png`
}

