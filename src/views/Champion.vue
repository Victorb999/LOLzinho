<template>
<div>
  <div :style="cssHead" class="champion-container"> 
    <h1>{{champ.id}}</h1>
    <h3>{{champ.title}}</h3>
    <div class="lore">
      <span >{{champ.lore}}</span>
    </div>
  </div>

  <div>
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
  </div>
     

  <!-- <v-carousel height="">
    <v-carousel-item
      v-for="(img,i) in imgLoading"
      :key="i"
      :src="img"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel> -->

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
      modal:{}
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