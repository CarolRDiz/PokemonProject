import pokemonAPI from "../api/pokemonAPI"

const getPokemons =()=>{
    const pokemonsArr= Array.from(Array(650))
    return pokemonsArr.map((arg, index) => index+1)
}

const getPokemonOptions = async()=>{
    const mixedPokemons= getPokemons().sort(() => Math.random()-0.5)
    const pokemons = await getPokemonNames(mixedPokemons.splice(0,4))
    return pokemons
}

const getPokemonNames=async ([p1,p2,p3,p4])=>{

    const promiseArr =[
        pokemonAPI.get(`/${p1}`),
        pokemonAPI.get(`/${p2}`),
        pokemonAPI.get(`/${p3}`),
        pokemonAPI.get(`/${p4}`)
    ]

const [pokemon1,pokemon2,pokemon3,pokemon4]= await Promise.all(promiseArr)

return[
    {name: pokemon1.data.name,id: pokemon1.data.id},
    {name: pokemon2.data.name,id: pokemon2.data.id},
    {name: pokemon3.data.name,id: pokemon3.data.id},
    {name: pokemon4.data.name,id: pokemon4.data.id},

]
}

export default getPokemonOptions