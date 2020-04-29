<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3" v-if="!showBoard">
      <v-row>
        <v-col cols="12">
          <p>Select game colors to start the game (2 minimum)</p>
          <v-select
            v-model="selectedColors"
            :items="colors"
            label="Select colors"
            multiple
          >
            <template v-slot:prepend-item>
              <v-list-item ripple @click="toggle">
                <v-list-item-action>
                  <v-icon
                    :color="selectedColors.length > 0 ? 'indigo darken-4' : ''"
                    >{{ icon }}</v-icon
                  >
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Select All</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"></v-divider>
            </template>
          </v-select>
        </v-col>
      </v-row>
      <v-btn
        class="primary"
        @click="startGame"
        :disabled="selectedColors.length < 2"
        >Start Game</v-btn
      >
    </v-col>
    <v-col cols="12" sm="6" offset-sm="3" v-else>
      <Board @backToConfig="backToConfig" :selectedColors="selectedColors" />
    </v-col>
  </v-row>
</template>

<script>
import Board from '@/components/Simon/Board.vue'

export default {
  components: {
    Board
  },
  data() {
    return {
      colors: [
        'black',
        'blue',
        'grey',
        'green',
        'orange',
        'pink',
        'purple',
        'red',
        'yellow'
      ],
      selectedColors: [],
      showBoard: false
    }
  },
  computed: {
    selectAllColors() {
      return this.selectedColors.length === this.colors.length
    },
    selectSomeColors() {
      return this.selectedColors.length > 0 && !this.selectAllColors
    },
    icon() {
      if (this.selectAllColors) return 'mdi-close-box'
      if (this.selectSomeColors) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    }
  },
  methods: {
    toggle() {
      this.$nextTick(() => {
        if (this.selectAllColors) {
          this.selectedColors = []
        } else {
          this.selectedColors = this.colors.slice()
        }
      })
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
