<template>
<div>
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
      <v-col>
        <img :src="urlpassive+champ.passive.image.full" alt="skills.id">
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
    <v-col class="dicacom mb-6" >
      <h2>Dicas para jogar com</h2>
      <ul>
        <li v-for="(dicas,index1) in champ.allytips" :key="index1">
          <span>{{dicas}}</span>
        </li>
      </ul>
    </v-col>

    <v-col class="dicacontra mb-6">
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
              height="200"
              width="100"
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
      urlpassive:""
    }
  },
  async beforeCreate(){
    this.champId = this.$route.params.id
    const ritogomes = new ApiRiot()   
    await ritogomes.getChampion(this.champId).then((resp)=>{
      this.champ= resp
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
      this.urlpassive = ritogomes.getUrlPassive()
    })    
    
  },
  methods:{
    setaModal(i){
      this.modal={
        img:this.imgSplashs[i],
        titulo:this.champ.skins[i].name
      }
    }
  }
}
</script>