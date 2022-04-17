<script>
  import sound1 from './assets/sounds/1.mp3'
  import sound2 from './assets/sounds/2.mp3'
  import sound3 from './assets/sounds/3.mp3'
  import sound4 from './assets/sounds/4.mp3'

  export default {
    name: 'App',
    data() {
      return {
        round: 0,
        sequence: [],
        numberOfClicks: -1,
        level: '1500',
        active: true,
        message: 'Попробуйте свои силы в Simon Game!',
        sounds: []
      }
    },
    mounted() {
      this.sounds = [
        new Audio(sound1), 
        new Audio(sound2), 
        new Audio(sound3), 
        new Audio(sound4)
      ]
    },
    methods: {
      startGame() {
        this.round = 0
        this.sequence = []
        this.startRound()
        console.log(this.sounds)
      },
      startRound() {
        this.message = 'Время слушать...'
        this.round += 1
        this.numberOfClicks = -1
        this.active = true
        this.addToSequence(this.randomNumber())
        this.animate()
      },
      addToSequence(number) {
        this.sequence.push(number)
      },
      animate() {
        setTimeout(() => {
          let i = 0
          let interval = setInterval(() => {
            // this.lightUpAndPlaySound(this.sequence[i])
            this.lightUp(this.sequence[i])
            this.playSound(this.sequence[i])

            i++
            if (i >= this.sequence.length) {
              clearInterval(interval)
              this.active = false
              this.message = 'Повторите :)'
            }
          }, +this.level)
        }, 500)
      },
      randomNumber() {
        return Math.floor((Math.random() * 4) + 1)
      },
      lightUp(tile) {
        const button = document.getElementById(tile)
        button.classList.add('active')
        setTimeout(() => {
          button.classList.remove('active')
        }, 250)
      },
      lightUpAndPlaySound(tile) {
        this.sounds[tile - 1].play()
        // (new Audio(`./assets/sounds/${tile}.mp3`)).play()

        const button = document.getElementById(tile)
        button.classList.add('active')
        setTimeout(() => {
          button.classList.remove('active')
        }, 250)
      },
      playSound(tile) {
        this.sounds[tile - 1].play()
        // (new Audio(`./assets/sounds/${tile}.mp3`)).play()
      },
      registerClick(tile) {
        if (this.active) return

        this.numberOfClicks++
        // this.lightUpAndPlaySound(tile)
        this.lightUp(tile)
        this.playSound(tile)

        if (tile !== this.sequence[this.numberOfClicks]) {
          this.finishGame()
        } else if (this.sequence.length === this.numberOfClicks + 1) {
          this.startRound()
        }
      },
      finishGame() {
        this.active = true
        this.message = `Уау! Вы смогли продержаться ${this.round} раундa/ов. Попробуйте еще!`
      }
    }
  }
</script>

<template>
  <div id="app">
    <div class="Circle">
      <div class="Red" id="1" @click="registerClick(1)"></div>
      <div class="Blue" id="2" @click="registerClick(2)"></div>
      <div class="Yellow" id="3" @click="registerClick(3)"></div>
      <div class="Green" id="4" @click="registerClick(4)"></div>
    </div>
    <div class="Data">
      <div>
        <h1>Раунд: {{ round }}</h1>
        <button @click="startGame()" class="Start-button">Start</button>
      </div>
      <div class="Options">
        <h2>Уровни сложности</h2>
        <div class="Option">
          <input type="radio" id="1" value="1500" v-model="level">
          <label for="1">Normal</label>
        </div>
        <div class="Option">
          <input type="radio" id="2" value="1000" v-model="level">
          <label for="2">Hard</label>
        </div>
        <div class="Option">
          <input type="radio" id="3" value="400" v-model="level">
          <label for="3">Insane</label>
        </div>
      </div>
      <div class="Message">{{ message }}</div>
    </div>
    <div class="Github">
      <a href="https://github.com/keeeparis/vue-simon-game-app" target="_blank">
        Fork on Github
      </a>
    </div>
  </div>
</template>

<style lang='scss'>
@import './assets/base.scss';
@import './assets/App.scss';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
  display: flex;
  justify-content: center;
}

@media (max-width: 670px) {
  #app {
    flex-direction: column;
    align-items: center;
  }
}
</style>
