<template>
  <div class="page">
    <h1 class="subheading">Champions</h1>

    <v-layout class="busca" row wrap justify-center>
      <v-col sm="6" xs="12" md="6" >
        <v-text-field label="Busque um campeão" v-model="champ"
        append-icon="mdi-magnify"
        placeholder="Digite o nome do champ que você está querendo"
        filled class="theme--dark input-search"
        outlined flat 
        ></v-text-field>
      </v-col>
    </v-layout>

    <v-container class="my-5" v-if="rito.length > 0">
    <v-layout row wrap class="justify-center">
     <v-flex xs6 sm3 md2 
     v-for="champs in rito" 
     :key="champs.id"
     class="champ-container d-flex align-center flex-wrap flex-column">       
        <router-link :to="champs.url">
          <v-avatar size="100">
          <img               
            :src="champs.squareimg"
            :alt="champs.id"
          />
          </v-avatar>
        </router-link>
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
  watch: {
    champ: function () {
      this.filtraChamp()
    },
    lang:{
      async handler(){
        const ritogomes = new ApiRiot(this.lang,this.patch)
        this.rito= await ritogomes.getChampions() 
        this.addChamps(this.rito)
      }
    },
    patch:{
      async handler(){
        const ritogomes = new ApiRiot(this.lang,this.patch)
        this.rito= await ritogomes.getChampions() 
        this.addChamps(this.rito)
      }
    }
  },
  computed:{
    lang(){
      return this.$store.state.language
    },
    patch(){
      return this.$store.state.patch
    }
  },
  async created(){
    const ritogomes = new ApiRiot(this.lang,this.patch)
    if(Object.keys(this.$store.state.campeoes).length === 0){
      this.rito=await ritogomes.getChampions() 
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
         return nome.id.toLowerCase().indexOf(this.champ.toLowerCase()) > -1
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
