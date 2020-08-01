import axios from "axios"
import {
  CDN_URL,LANGUAGES_URL
} from "./config.js"

class ApiRiot{
  constructor(lang) {    
    this.language = lang
    this.patch = "10.15.1"
    this.urlpadrao = `${CDN_URL}/${this.patch}/data/${this.language}`
    this.urlImgSquare = `${CDN_URL}/${this.patch}/img/champion`
    this.urlChampion = `${this.urlpadrao}/champion`
  }

  getUrlSplash(id,numero){
    return `${CDN_URL}/img/champion/splash/${id}_${numero}.jpg`
  }
  getUrlLoad(id,numero){
    return `${CDN_URL}/img/champion/loading/${id}_${numero}.jpg`
  }

  getUrlPassive(){
    return `${CDN_URL}/${this.patch}/img/passive/`
  }
  getUrlSpell(){
    return `${CDN_URL}/${this.patch}/img/spell/`
  }

  async getChampions(){
   
      // await axios({
      //   method: "get",
      //   url: `${this.urlpadrao}/champion.json`
      // }).then(()=>{
      //   //console.log("aa",response.data.data)
      //   return "coco"
      // }).catch(err => {return err})
      
    let response = await axios({
      method: "get",
      url: `${this.urlpadrao}/champion.json`
    }).catch(err => {return err})

    let championsMap = response.data.data
    let ListChamp = []
    //console.log(championsMap)
    Object.keys(championsMap).map((champ)=>{          
      ListChamp.push({
        id: championsMap[champ].id,
        squareimg: `${this.urlImgSquare}/${champ}.png`,
        title: championsMap[champ].title,
        blurb: championsMap[champ].blurb,
        tags: championsMap[champ].tags,
        partype: championsMap[champ].partype,
        url: `/champion/${championsMap[champ].id}`
      })
    })
    return ListChamp   
  }

  async getChampion(id){
    let champion = {}
    await axios({
        method: "get",
        url: `${this.urlChampion}/${id}.json`
      }).then((response)=>{
        champion = response.data.data
      }).catch(err => {champion = err})

      return champion[id]
  }

  async getLanguages(){
    let language = []
    await axios({
        method: "get",
        url: LANGUAGES_URL
      }).then((response)=>{
        language = response.data
      }).catch(err => {language = err})

    // let Listlang = {}
    // Object.keys(language).map((oxi)=>{    
    //   Listlang = {...Listlang,oxi}
    //   console.log(Listlang)      
    // })
    // console.log(Listlang)
    return language
  }
  
}

export default ApiRiot