<template>
    <div class="pokemon-container">
        <img :src="imageSource" alt="pokemon" class="hidden-pokemon"/>
        <img v-if="showPokemon" :src="imageSource" alt="pokemon" class="fade-in"/>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';

    export default {
        props: {
            pokemonId:{
            type:Number,
            required: true,
            },
            showPokemon: {
            type:Boolean,
            required: true,
            default:false,
            },
        },
        
        computed:{
            imageSource(){
                return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`
            },
        },   
    }
</script>

<style >
/* Pokemon Picture */
.pokemon-container {
  height: 200px;
  position: relative;
}

img {
  height: 200px;
  position: absolute;
  left: 50%;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;

  transform: translateX(-50%);
}
.hidden-pokemon {
  filter: brightness(0);
}
</style>







