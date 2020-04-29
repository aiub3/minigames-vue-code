<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3" v-if="!showBoard">
      <v-row>
        <v-col cols="6">
          <v-radio-group
            label="Choose the number of players"
            v-model="gameConfig.players"
          >
            <v-radio label="1 Player" :value="1"></v-radio>
            <v-radio label="2 Payers" :value="2"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="6">
          <v-radio-group
            label="Choose player 1 symbol"
            v-model="gameConfig.turn"
          >
            <v-radio label="X" :value="'X'"></v-radio>
            <v-radio label="O" :value="'O'"></v-radio>
          </v-radio-group>
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
import Board from '@/components/TicTacToe/Board.vue'

export default {
  components: {
    Board
  },
  data() {
    return {
      gameConfig: {
        players: 1,
        turn: 'X'
      },
      showBoard: false
    }
  },
  methods: {
    startGame() {
      this.showBoard = true
    },
    backToConfig() {
      this.showBoard = false
    }
  }
}
</script>
