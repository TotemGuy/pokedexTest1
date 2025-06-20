const input = document.querySelector("#pokemonInput")
const Siguiente = document.querySelector("#botonSiguiente")
const Anterior = document.querySelector("#botonAnterior")
const display = document.querySelector("#pokemonDisplay")

let pagina = 0

function ingresarPokemon(pokemon){
    console.log(pokemon)

        if(pokemon.types[1]){
            return "<th><img src='" + pokemon.sprites.front_default + "' style='width:9vw'></img> <br> Nombre: " + pokemon.species.name + " <br> Tipo: "+ pokemon.types[0].type.name + ", " + pokemon.types[1].type.name + "</th>"
        } else {
            return "<th><img src='" + pokemon.sprites.front_default + "' style='width:9vw'></img> <br> Nombre: " + pokemon.species.name + " <br> Tipo: "+ pokemon.types[0].type.name + "</th>"
        }
}

function buscarPokemon(){
    pokemonDisplay.innerHTML=""
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=" + pagina*18).then(function(res){
        return res.json()
    }).then(function(data){
        let pokemons = []
        for(i=0;i<20;i++){ 
            pokemons.push(fetch(data.results[i].url).then(function(res){
                return(res.json())
            }))
        }
            console.log(data)
            console.log(pokemons)

            Promise.all(pokemons).then(function(pokemons){
            for(i=0;i<3;i++){
                    pokemonDisplay.innerHTML+= "<tr>" + ingresarPokemon(pokemons[i*6+0]) + ingresarPokemon(pokemons[i*6+1]) + ingresarPokemon(pokemons[i*6+2]) + ingresarPokemon(pokemons[i*6+3]) + ingresarPokemon(pokemons[i*6+4]) + ingresarPokemon(pokemons[i*6+5]) + "</tr>"
                }
    })
}).catch(function(error){
    pokemonDisplay.innerHTML = "No se encontraron resultados"
});
}

function siguientePagina(){
        pagina+=1
        buscarPokemon()
}

function anteriorPagina(){
    if(pagina!=0){
    pagina-=1
    }
    buscarPokemon()
}

buscarPokemon()
Siguiente.addEventListener("click", siguientePagina)
Anterior.addEventListener("click", anteriorPagina)

