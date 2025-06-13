const input = document.querySelector("#pokemonInput")
const botonBuscar = document.querySelector("#botonBuscar")
const display = document.querySelector("#pokemonDisplay")

function buscarPokemon(){
    let pokemon = input.value
    fetch("http://pokeapi.co/api/v2/pokemon/" + pokemon).then(function(res){
        return res.json()
    }).then(function(data){
    console.log(data)
    if(data.types[1]){
        pokemonDisplay.innerHTML = "<img src='" + data.sprites.front_default + "' style='width:15vw'></img> <br> Nombre: " + data.species.name + " <br> Tipo: "+ data.types[0].type.name + ", " + data.types[1].type.name
    } else {
        pokemonDisplay.innerHTML = "<img src='" + data.sprites.front_default + "' style='width:15vw'></img> <br> Nombre: " + data.species.name + " <br> Tipo: "+ data.types[0].type.name
    }
    }).catch(function(error){
        pokemonDisplay.innerHTML = "No se encontraron resultados"
    });
}

botonBuscar.addEventListener("click", buscarPokemon)