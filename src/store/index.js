import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    campeoes:{}
  },
  mutations: {
    setarcampeoes: (state, champs) =>{      
      state.campeoes = champs
    }
  },
  actions: {
    addChamps: ( {commit},payload)=>{
      //console.log(payload)
      commit('setarcampeoes',payload)
    }
  },
  modules: {
  }
})
