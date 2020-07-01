<template>
  <div class="page">
    <h1 class="subheading">Champions</h1>

    <div class="busca">
      <input type="text" v-model="champ" @change="filtraChamp" />
    </div>

    <v-container class="my-5" v-if="rito.length > 0">
    <v-layout row wrap class="justify-center">
     <v-flex xs6 sm3 md2 
     v-for="champs in rito" 
     :key="champs.id" 
     class="champ-container d-flex align-center flex-wrap flex-column">       
        <v-avatar size="100">
        <img               
          :src="champs.squareimg"
          :alt="champs.id"
        />
        </v-avatar>
      
        <div class="subheading">{{champs.id}}</div>
        <div class="caption">{{champs.title}}</div>
      </v-flex>
    </v-layout>
    </v-container>
   
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import ApiRiot from "@/Api/riot"
export default {
  data() {
    return {
      rito:[],
      champ: ""
    }
  },
  async created(){
    
    const ritogomes = new ApiRiot()
    if(Object.keys(this.$store.state.campeoes).length === 0){
      this.rito=await ritogomes.getChampion() 
      this.addChamps(this.rito)
    }
    else{
      this.rito = this.$store.state.campeoes
    }
    
  },
  methods: {
    ...mapActions([
      'addChamps'
    ]),
    filtraChamp(){
      if(this.champ.length >= 3){       
        const filtroChamp = this.rito.filter( nome => {        
         return nome.id.indexOf(this.champ) > -1
        })
        if(Object.keys(filtroChamp).length === 0){
          console.log("Nenhum encontrado")
        }
        else{
          this.rito = filtroChamp
        }
      }
      else{
        this.rito = this.$store.state.campeoes
      }
    }
  }
}
</script>
