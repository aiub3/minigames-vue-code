<template>
  <v-row>
    <v-col cols="12" class="text-center">
      <v-card>
        <p class="text-center pt-5"
          :class="[counterTextClass]">
          Couples discovered: {{ couplesDiscovered }} / {{ cards.length / 2 }}
        </p>
        <p class="text-center blue--text">Attempts: {{ attempts }}</p>
        <v-container fluid>
          <v-row>
            <v-col
              v-for="(card, index) in cards"
              :key="index"
              class="d-flex child-flex"
              cols="3"
              @click="selectCard(index)"
            >
            <transition name="flip" mode="out-in">
              <v-card flat tile class="d-flex justify-center align-center board_card showed"
                v-if="card.selected || card.correct" key="card-showed">
                {{ card.number }}
              </v-card>
              <v-card flat tile class="d-flex justify-center align-center board_card"
                v-else key="card-hidden">
                ?
              </v-card>
            </transition>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-btn class="primary mt-5" @click="restartGame">Restart game</v-btn>
      <v-btn class="warning mt-5 ml-5" @click="backToConfig">Back to config</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    gameConfig: {
      type: Object,
      default: () => {
        return {
          couples: 2
        }
      }
    }
  },
  data() {
    return {
      selectedCards: [...Array(this.gameConfig.couples).keys()].flatMap((k) => [
        k,
        k
      ]),
      cards: [],
      attempts: 0,
      ableSelect: true
    }
  },
  computed: {
    couplesDiscovered() {
      return this.cards.filter((card) => card.correct).length / 2
    },
    counterTextClass() {
      return this.couplesDiscovered === this.cards.length / 2
        ? 'green--text'
        : 'indigo--text'
    }
  },
  mounted() {
    this.startGame()
  },
  methods: {
    startGame() {
      const gameCards = []
      for (const value of this.selectedCards) {
        gameCards.push({
          number: value,
          selected: false,
          correct: false
        })
      }
      this.cards = this.shuffle(gameCards)
    },
    selectCard(index) {
      const selectedCards = this.cards.filter((val) => {
        return val.selected
      })
      const currentSelect = this.cards[index]
      if (currentSelect.correct || currentSelect.selected || !this.ableSelect) {
        return
      }
      currentSelect.selected = true
      this.$set(this.cards, index, currentSelect)
      if (selectedCards.length) {
        this.ableSelect = false
        if (selectedCards[0].number === currentSelect.number) {
          const numbersIndexes = this.getMultipleIndexes(
            this.cards,
            currentSelect.number
          )
          for (const valIndex of numbersIndexes) {
            const newVal = this.cards[valIndex]
            newVal.correct = true
            this.$set(this.cards, valIndex, currentSelect)
          }
        }
        this.attempts++
        setTimeout(() => {
          this.cards.map((element) => {
            element.selected = false
          })
          this.ableSelect = true
        }, 1500)
      }
    },
    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
      }
      return array
    },
    getMultipleIndexes(array, numFilter) {
      const indexes = array.reduce((acc, curr, index) => {
        if (curr.number === numFilter) {
          acc.push(index)
        }
        return acc
      }, [])
      return indexes
    },
    restartGame() {
      this.attempts = 0
      this.startGame()
    },
    backToConfig() {
      this.$emit('backToConfig')
    }
  }
}
</script>

<style scoped>
.board_card {
  height: 120px;
  border: 1px solid black;
  font-size: 44px;
  cursor: pointer;
}

.board_card.showed {
  cursor: default;
}

.flip-enter-active {
  animation: flip-in 0.4s ease-out forwards;
}

.flip-leave-active {
  animation: flip-out 0.4s ease-out forwards;
}

@keyframes flip-in {
  from {
    transform: rotateY(90deg);
  }
  to {
    transform: rotateY(0deg);
  }
}

@keyframes flip-out {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(90deg);
  }
}
</style>
