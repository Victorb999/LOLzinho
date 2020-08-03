import axios from "axios"
import {
  CDN_URL,LANGUAGES_URL,VERSIONS_URL
} from "./config.js"

class ApiRiot{
  constructor(lang,patch) {    
    this.language = lang
    this.patch = patch
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

  //pega todos campeos
  async getChampions(){
   
    let response = await axios({
      method: "get",
      url: `${this.urlpadrao}/champion.json`
    }).catch(err => {return err})

    let championsMap = response.data.data
    let ListChamp = []

    //transforma num array com as infos importantes
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

  //busca o champ pelo id
  async getChampion(id){
    let champion = {}
    await axios({
        method: "get",
        url: `${this.urlChampion}/${id}.json`
      }).then((response)=>{
        champion = response.data.data
      }).catch(() => {champion[id]= false})

      return champion[id]
  }

  //retorna as linguagens disponíveis
  async getLanguages(){
    let language = []
    await axios({
        method: "get",
        url: LANGUAGES_URL
      }).then((response)=>{
        language = response.data
      }).catch(err => {language = err})

    return language
  }

  //retorna os patchs
  async getPatchs(){
    let patch = []
    await axios({
        method: "get",
        url: VERSIONS_URL
      }).then((response)=>{
        patch = response.data
      }).catch(err => {patch = err})

    return patch
  }

  
}

export default ApiRiot