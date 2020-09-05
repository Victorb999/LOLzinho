<template>
<div>
  <div v-if="!erro">
    <div :style="cssHead" class="champion-container"> 
      <h1>{{champ.id}}</h1>
      <h3>{{champ.title}}</h3>
      <div class="lore">
        <span >{{champ.lore}}</span>
      </div>
    </div>

    <v-container class="skills">
      <h2>Habilidades</h2>
      <v-row>
        <v-col v-if="champ.length > 0">
          <img :src="urlpassive" alt="skills.id">
          <h3>{{champ.passive.name}}</h3>
          <p>{{champ.passive.description}}</p>
        </v-col>
        <v-col v-for="(skills,index0) in champ.spells" :key="index0">
          <img :src="urlspell+skills.image.full" alt="skills.id">
          <h3>{{skills.name}}</h3>
          <p>{{skills.description}}</p>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row class="dicas">
      <v-col class="dicacom d-12-xs d-12-sm d-12-md" v-if="champ.allytips != ''">
        <h2>Dicas para jogar com</h2>
        <ul>
          <li v-for="(dicas,index1) in champ.allytips" :key="index1">
            <span>{{dicas}}</span>
          </li>
        </ul>
      </v-col>

      <v-col class="dicacontra d-12-xs d-12-sm d-12-md"  v-if="champ.enemytips != ''">
        <h2>Dicas para jogar contra</h2>
        <ul>
          <li v-for="(dicas,index2) in champ.enemytips" :key="index2">
            <span>{{dicas}}</span>
          </li>
        </ul>
      </v-col>
      </v-row>
    </v-container>

    <v-container>
      <h2 class="pt-2 px-5">Skins</h2>
      <v-slide-group show-arrows v-model="imgLoading">
        <v-slide-item
          v-for="(img,i) in imgLoading"
          :key="i"
          >

          <v-dialog v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
            <v-card          
                class="ma-4"
                height="400"
                width="200"
                :img="img"
                v-bind="attrs"
                v-on="on"
                @click="setaModal(i)"
              >         
              </v-card>
            </template>
            
            <v-card>
              <v-card-title class="headline">
                {{modal.titulo}}
              </v-card-title>
              <v-img :src="modal.img" ></v-img>
            </v-card>

          </v-dialog>
        </v-slide-item>
        </v-slide-group>
    </v-container>

  

  </div>
  <div v-else>
    <v-container class="erro">      
      <v-layout class="busca" row wrap justify-center>
      <v-col sm="8" xs="12" md="8" >
       <h1>Não conseguimos encontrar esse campeão. =[</h1>
       <h3>Tente buscar com outro nome.</h3>
      </v-col>
    </v-layout>
    </v-container>
  </div>
</div>
</template>

<script>
import ApiRiot from "@/Api/riot"
export default {
  data() {
    return {
      champ: {},
      champId:'',
      imgSplashs:[],
      imgLoading:[],
      cssHead:{},
      dialog:false,
      modal:{},
      urlspell:"",
      urlpassive:"",
      erro: false,
    }
  },
  watch: {
    lang:{
      async handler(){
        await this.setaChamp()
      }
    },
    patch:{
      async handler(){
        await this.setaChamp()
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
  async beforeCreate(){
    this.champId = this.$route.params.id
    const ritogomes = new ApiRiot(this.$store.state.language, this.$store.state.patch)   
    await ritogomes.getChampion(this.champId).then((resp)=>{
      this.champ= resp
       if(this.champ !== false){
        resp.skins.map( skin =>{
          this.imgSplashs = [...this.imgSplashs,ritogomes.getUrlSplash(resp.id,skin.num)]
        })

        resp.skins.map( skin =>{
          this.imgLoading = [...this.imgLoading,ritogomes.getUrlLoad(resp.id,skin.num)]
        })

        this.cssHead =  {
            backgroundImage: `url(${this.imgSplashs[0]})`
        }
        this.urlspell = ritogomes.getUrlSpell()
        this.urlpassive = ritogomes.getUrlPassive()+ this.champ.passive.image.full
        this.erro = false
      }
      else{
        this.erro = true
      }
    })    
    
  },
  methods:{
    async setaChamp(){
      this.champId = this.$route.params.id
        const ritogomes = new ApiRiot(this.$store.state.language, this.$store.state.patch)   
        await ritogomes.getChampion(this.champId).then((resp)=>{
          this.champ= resp
          if(this.champ !== false){
            resp.skins.map( skin =>{
              this.imgSplashs = [...this.imgSplashs,ritogomes.getUrlSplash(resp.id,skin.num)]
            })

            resp.skins.map( skin =>{
              this.imgLoading = [...this.imgLoading,ritogomes.getUrlLoad(resp.id,skin.num)]
            })

            this.cssHead =  {
                backgroundImage: `url(${this.imgSplashs[0]})`
            }
            this.urlspell = ritogomes.getUrlSpell()
            this.urlpassive = ritogomes.getUrlPassive()+ this.champ.passive.image.full
            this.erro = false
          }
          else{
            this.erro = true
          }
        })  
    },
    setaModal(i){
      this.modal={
        img:this.imgSplashs[i],
        titulo:this.champ.skins[i].name
      }
    }
  }
}
</script>