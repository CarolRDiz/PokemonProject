<template>
  <button @click="mode()">Cambiar modo de juego</button>
  <h1 v-if="!pokemon">Cargando...</h1>
  <div v-else>
    <span class="estats">Mejor racha: {{ best }}</span>
    <span class="estats">Racha: {{ streak }}</span>
    <h1>¿Quien es este pokemon?</h1>
    <PokemonPictures :pokemonId="pokemon.id" :showPokemon="showPokemon"/>
    <PokemonOptions :pokemons="pokemonsArray" @selection="checkPokemon"/>
  </div>
  <template v-if="end">
    <h2 >{{ message }}</h2>
    <button @click="newGame">Jugar de nuevo</button>
  </template>
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue';
import PokemonPictures from '@/components/PokemonPictures.vue';
import getPokemonOptions from '@/helpers/getPokemonOptions';

console.log(getPokemonOptions)

//const pokemons=[pok1,pok2,pok3,pok4]

export default {
  components:{PokemonOptions,PokemonPictures},
  data(){
    return{
      pokemon: null,
      pokemonsArray: [],
      showPokemon: false,
      end: false,
      showAnswer:false,
      message: '',
      streak: 0,
      best: 0,
      easyMode: false
    }
  },
  methods:{
    mode(){
      this.easyMode = !this.easyMode
      this.newGame()
    },

    async mixedPokemons(){
      this.pokemonsArray = await getPokemonOptions()
      const randomPokemon = Math.floor(Math.random() * 4)
      this.pokemon = this.pokemonsArray[randomPokemon]
    },
    checkPokemon(pokemonId) {
      this.showPokemon = true
      if (pokemonId === this.pokemon.id) {
        this.message = "Has acertado!"
        this.streak = this.streak + 1
        if (this.best < this.streak) {
          this.best = this.streak
        }
        console.log(this.streak)
        console.log(this.best)
      } else {
        this.message = `Respuesta incorrecta, ${this.pokemon.name}`
        this.streak = 0
        console.log(this.streak)
      }
      this.end = true
    },
    newGame(){
      this.end = false
      this.pokemon= null
      this.pokemonsArray= []
      this.showPokemon= this.easyMode
      this.showAnswer=false
      this.message= ''
      this.mixedPokemons()
    }

  },
  mounted(){
    this.mixedPokemons()
  },
  }
</script>
<style>
.estats{
  display: block;
  background-color: rgb(160, 255, 160);
  border-radius: 3px;
  width: fit-content;
  padding: 5px;
}
</style>