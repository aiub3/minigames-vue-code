<template>
  <v-row>
    <span>X wins: {{ wins.X }}</span>
    <v-spacer></v-spacer>
    <span>O wins: {{ wins.O }}</span>
    <h3 class="my-5">Turn: {{ gameConfig.turn }}</h3>
    <v-col
      cols="4"
      class="box"
      v-for="(box, index) in boxes"
      :key="'box' + index"
      :class="{ x: box === 'X' }"
      :style="{ cursor: gameStarted ? 'pointer' : 'default' }"
      @click="playTurn(index)"
    >
      {{ box }}
    </v-col>
    <v-btn class="success mt-5" @click="restartGame">Restart Game</v-btn>
    <v-btn class="warning mt-5 ml-5" @click="backToConfig"
      >Back to config</v-btn
    >
  </v-row>
</template>

<script>
export default {
  props: {
    gameConfig: {
      type: Object,
      default: () => {
        return {
          players: 1,
          turn: 'X'
        }
      }
    }
  },
  data() {
    return {
      moves: 0,
      wins: {
        X: 0,
        O: 0
      },
      initialTurn: this.gameConfig.turn,
      gameStarted: true,
      boxes: ['', '', '', '', '', '', '', '', ''],
      winCombinations: [
        [0, 1, 2],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6]
      ]
    }
  },
  methods: {
    playTurn(index) {
      let lastMove = index
      if (!this.gameStarted) {
        return
      } else if (this.boxes[index]) {
        alert('This box have been played, click another box or restart game')
        return
      }
      this.$set(this.boxes, index, this.gameConfig.turn)
      this.moves++
      this.checkWinner(lastMove)
      this.gameConfig.turn = this.gameConfig.turn === 'X' ? 'O' : 'X'
      if (this.gameConfig.players === 1 && this.gameStarted) {
        setTimeout(() => {
          lastMove = this.cpuMove()
          this.checkWinner(lastMove)
          this.gameConfig.turn = this.gameConfig.turn === 'X' ? 'O' : 'X'
        }, 500)
      }
      if (this.moves === 9 && this.gameStarted) {
        setTimeout(() => {
          alert(
            'There are not more moves to play, press restart and start a new game'
          )
          this.gameStarted = false
        }, 500)
      }
    },
    cpuMove() {
      this.moves++
      const freeBoxes = this.boxes.reduce((acc, curr, index) => {
        if (!curr) {
          acc.push(index)
        }
        return acc
      }, [])
      let selectedBox = null
      for (const combiantion of this.winCombinations) {
        for (let option of combiantion) {
          option = parseInt(option)
          const combiantionsToCheck = combiantion.filter((comb) => {
            return comb !== option
          })
          if (
            freeBoxes.indexOf(option) > -1 &&
            this.boxes[combiantionsToCheck[0]] &&
            this.boxes[combiantionsToCheck[0]] ===
              this.boxes[combiantionsToCheck[1]]
          ) {
            if (this.gameConfig.turn === this.boxes[combiantionsToCheck[0]]) {
              this.$set(this.boxes, option, this.gameConfig.turn)
              return option
            } else {
              selectedBox = option
            }
          }
        }
      }
      if (!selectedBox) {
        selectedBox = freeBoxes[Math.floor(Math.random() * freeBoxes.length)]
      }
      this.$set(this.boxes, selectedBox, this.gameConfig.turn)
      return selectedBox
    },
    checkWinner(index) {
      if (this.moves < 5) {
        return
      }
      const value = this.boxes[index]
      const possibleCombinations = this.winCombinations.filter(
        (combiantion) => {
          return combiantion.indexOf(index) > -1
        }
      )
      for (const combiantion of possibleCombinations) {
        if (
          this.boxes[combiantion[0]] === this.boxes[combiantion[1]] &&
          this.boxes[combiantion[1]] === this.boxes[combiantion[2]]
        ) {
          this.setWinner(value)
          this.gameStarted = false
          return
        }
      }
    },
    setWinner(value) {
      setTimeout(() => {
        alert('The winner is ' + value + '. Press restart and start a new game')
        this.wins[value]++
      }, 500)
    },
    restartGame() {
      this.boxes.fill('')
      this.gameConfig.turn = this.initialTurn
      this.moves = 0
      this.gameStarted = true
      this.$forceUpdate()
    },
    backToConfig() {
      this.$emit('backToConfig')
    }
  }
}
</script>

<style scoped>
h3 {
  display: block;
  width: 100%;
}

.box {
  border: 1px solid black;
  height: 120px;
  color: red;
  font-size: 76px;
  font-weight: 300;
  line-height: 1.3;
  text-align: center;
  cursor: pointer;
}

.box.x {
  color: blue;
}
</style>
