import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    campeoes:{},
    language:'pt_BR',
    patch:'10.15.1'
  },
  mutations: {
    setarcampeoes: (state, champs) =>{      
      state.campeoes = champs
    },
    setarlanguage: (state, lang) =>{      
      state.language = lang
    },
    setarpatch: (state, lang) =>{      
      state.patch = lang
    }
  },
  actions: {
    addChamps: ( {commit},payload)=>{
      //console.log(payload)
      commit('setarcampeoes',payload)
    },
    addLanguage:( {commit},payload)=>{
      //console.log(payload)
      commit('setarlanguage',payload)
    },
    addPatch:( {commit},payload)=>{
      //console.log(payload)
      commit('setarpatch',payload)
    }
  },
  modules: {
  }
})
