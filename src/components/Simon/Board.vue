<template>
  <v-row class="justify-center">
    <p :class="[`${messageColor}--text`]">{{ messageGame }}</p>
    <p v-if="gameStarted">Number of moves: {{ moves }}</p>
    <div class="wrapper">
      <div
        v-for="color in colors"
        :key="color.id"
        :style="{
          'background-color': color.color,
          cursor: playerTurn ? 'pointer' : 'default'
        }"
        :class="{ selected: color.selected }"
        @click="playerSelect(color.id)"
      ></div>
    </div>
    <template v-if="!gameStarted">
      <v-btn class="primary" @click="startGame">Start game</v-btn>
      <v-btn class="warning ml-5" @click="backToConfig">Back to config</v-btn>
    </template>
    <template v-else>
      <v-btn
        class="success"
        @click="nextMove"
        :disabled="playerTurn || sequenceInProcess"
      >
        Next level
      </v-btn>
      <v-btn class="error ml-5" @click="finishGame">Finish Game</v-btn>
    </template>
  </v-row>
</template>

<script>
export default {
  props: {
    selectedColors: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      messageGame: 'Press start game to start a new game',
      messageColor: 'blue',
      moves: 0,
      colors: [],
      gameStarted: false,
      playerTurn: false,
      sequenceInProcess: false,
      result: [],
      playerSelection: []
    }
  },
  created() {
    const gameColors = []
    for (const [index, value] of this.selectedColors.entries()) {
      gameColors.push({
        id: parseInt(index),
        color: value,
        selected: false
      })
    }
    this.colors = gameColors
  },
  methods: {
    startGame() {
      this.gameStarted = true
      this.nextMove()
    },
    nextMove() {
      this.sequenceInProcess = true
      this.moves++
      this.messageGame = 'Wait until the end of the sequence'
      this.messageColor = 'blue'
      let movesPlayed = 0
      const movesInterval = setInterval(() => {
        if (!this.gameStarted) {
          return
        }
        const selectedColor = this.colors[
          Math.floor(Math.random() * this.colors.length)
        ]
        selectedColor.selected = true
        this.result.push(selectedColor.id)
        setTimeout(() => {
          this.colors.map((element) => {
            element.selected = false
          })
        }, 1000)
        movesPlayed++
        if (movesPlayed === this.moves) {
          clearInterval(movesInterval)
          this.messageGame = 'Your turn, repite the sequence'
          this.messageColor = 'indigo'
          this.sequenceInProcess = false
          this.playerTurn = true
        }
      }, 2000)
    },
    playerSelect(id) {
      if (!this.playerTurn) {
        return
      }
      this.playerSelection.push(id)
      this.checkResult()
    },
    checkResult() {
      const result = this.playerSelection.every(
        (val, i) => val === this.result[i]
      )
      if (result) {
        this.messageGame = 'You are doing well, continue on that way'
        this.messageColor = 'green'
        if (this.playerSelection.length === this.result.length) {
          this.messageGame =
            'You have finished this round perfect, press next level to add some difficulty'
          this.playerTurn = false
        }
      } else {
        this.messageGame = 'You are wrong, finish that game and start a new one'
        this.messageColor = 'red'
        this.playerTurn = false
        this.sequenceInProcess = true
      }
    },
    finishGame() {
      this.messageGame =
        'You have finished the game, press start to start a new one or go back to config'
      this.messageColor = 'red'
      this.moves = 0
      this.gameStarted = false
      this.playerTurn = false
      this.sequenceInProcess = false
      this.result = []
      this.playerSelection = []
    },
    backToConfig() {
      this.$emit('backToConfig')
    }
  }
}
</script>

<style scoped>
p {
  display: block;
  width: 100%;
  text-align: center;
}

.wrapper {
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
}

.wrapper div {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 10px;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  transition: opacity 0.6s;
}

.wrapper div.selected {
  opacity: 0.4;
}
</style>
