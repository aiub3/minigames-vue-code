<template>
  <v-app>
    <TheNavbar />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'

export default {
  name: 'App',

  components: {
    TheNavbar
  }
}
</script>

<style>
.row {
  margin: 0;
}
</style>
