<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3" v-if="!showBoard">
      <v-row class="align-center">
        <v-col cols="12">
          <v-select
            :items="couplesArray"
            label="Select the number of couples"
            :value="gameConfig.couples"
            @input="selectCouples"
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <v-btn class="primary" @click="startGame">Start Game</v-btn>
    </v-col>
    <v-col cols="12" sm="6" offset-sm="3" v-else>
      <Board @backToConfig="backToConfig" :gameConfig="gameConfig" />
    </v-col>
  </v-row>
</template>

<script>
import Board from '@/components/Memorama/Board.vue'

export default {
  components: {
    Board
  },
  data() {
    return {
      gameConfig: {
        couples: 2
      },
      couplesArray: [...Array(15).keys()].map((k) => 2 + k),
      showBoard: false
    }
  },
  methods: {
    selectCouples(value) {
      this.gameConfig.couples = value
    },
    startGame() {
      this.showBoard = true
    },
    backToConfig() {
      this.showBoard = false
    }
  }
}
</script>
