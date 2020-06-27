<template>
  <v-app >
    <Navbar />

    <v-main>
      <router-view></router-view>
    </v-main>
    
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  components: { Navbar },
  name: 'App',
  data () {
    return {
      
    }
  }
}
</script>