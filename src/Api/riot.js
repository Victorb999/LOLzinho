import axios from "axios"
import {
  CDN_URL
} from "./config.js"

class ApiRiot{
  constructor() {    
    this.language = "pt_BR"
    this.patch = "10.13.1"
    this.urlpadrao = `${CDN_URL}/${this.patch}/data/${this.language}`
    this.urlImgSquare = `${CDN_URL}/${this.patch}/img/champion`
  }


  async getChampion(){
   
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
          })
        })
  
        return ListChamp

   
  }
  
}

export default ApiRiot