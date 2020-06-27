<template>
  <div class="dashboard">
    <h1 class="subheading">Champions</h1>

    <v-container class="my-5" v-if="rito.length > 0">
    <v-layout row wrap >
     <v-flex xs6 sm3 md2 v-for="champs in rito" :key="champs.id">       
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
import ApiRiot from "@/Api/riot"
export default {
  data() {
    return {
      rito:[]
    }
  },
  async created(){
    const ritogomes = new ApiRiot()
    this.rito=await ritogomes.getChampion()    
  },
  methods: {
    
  }
}
</script>
