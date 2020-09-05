<template>
  <nav>

    <v-toolbar flat class="theme--dark toolbar-lol">
      
      <v-toolbar-title class="text-uppercase">
        <router-link to="/" class="limpa">
          <span class="lol">Lol</span>
          <span class="zinho">zinho</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      
      <v-select
        :items="languages"
        label="Idioma"
        dense
        height="20"
        class="idioma"
        :change="TrocaLingua()"
        v-model="lang"          
      ></v-select>

      <v-select
        :items="versions"
        label="Patch"
        dense
        height="20"
        class="idioma"
        :change="TrocaPatch()"
        v-model="patch"          
      ></v-select>
     
    </v-toolbar>    

    <!-- <v-navigation-drawer app v-model="drawer">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            
          </v-avatar>
          <p class="subheading mt-1">Lolzinho</p>
        </v-flex>
        <v-flex class="mt-4 mb-3">
        </v-flex>
      </v-layout>
     
    </v-navigation-drawer> -->

  </nav>
</template>

<script>
import {mapActions} from 'vuex'
import ApiRiot from "@/Api/riot"
export default {
  data() {
    return {
      languages: [],
      versions:[],
      lang:"",
      patch:""
    }
  },
  async beforeCreate(){
    const ritogomes = new ApiRiot(this.$store.state.language,this.$store.state.patch)   
    await ritogomes.getLanguages().then((resp)=>{
      this.languages= resp
    })    
    this.lang = this.$store.state.language
    await ritogomes.getPatchs().then((resp)=>{
      this.versions= resp      
      this.patch = resp[0]
      this.addPatch(this.patch)    
    })
  },
  methods:{
    ...mapActions([
      'addLanguage','addPatch'
    ]),
    TrocaLingua(){
      if(this.lang !== ''){
        this.addLanguage(this.lang)
      }
    },
    TrocaPatch(){
      if(this.patch !== ''){
        this.addPatch(this.patch)
      }
    }
  }
}
</script>

