<template>
  <v-app-bar
    app
    color="#6A76AB"
    dark
    prominent
    src="https://picsum.photos/1920/1080?random"
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
      ></v-img>
    </template>
    <v-toolbar-title class="ml-6">Minigames</v-toolbar-title>
    <v-spacer></v-spacer>
    <template v-slot:extension>
      <v-tabs align-with-title>
        <v-tab v-for="(link, index) in links" :key="index" :to="link.url">{{
          link.name
        }}</v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          name: 'Home',
          url: '/'
        },
        {
          name: 'Tic Tac Toe',
          url: '/tic-tac-toe'
        },
        {
          name: 'Simon',
          url: '/simon'
        },
        {
          name: 'Memorama',
          url: '/memorama'
        }
      ]
    }
  }
}
</script>
