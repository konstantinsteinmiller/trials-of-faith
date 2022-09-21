import StrategyManager from '@/World/StrategyManager.js'
import EventEmitter from '@/Utils/EventEmitter.js'
import DicesHandler from '@/World/DicesHandler.js'
import Bowl from '@/World/Models/Bowl.js'
import LifeStone from '@/World/Models/LifeStone.js'
import FaithToken from '@/World/Models/FaithToken.js'
import BabiRune from '@/World/Models/Runes/BabiRune.js'
import AnubisRune from '@/World/Models/Runes/AnubisRune.js'
import TawaretRune from '@/World/Models/Runes/TawaretRune.js'
import Experience from '@/Experience.js'
import { GAME_PLAYER_TYPES, GAMES_PHASES, GAME_STARTING_LIFE_STONES, GAMES_RUNES } from '@/Utils/constants.js'

export default class Player extends EventEmitter {
  constructor(playerId, isPlayer) {
    super()
    this.experience = new Experience()
    this.world = this.experience.world
    this.debug = this.experience.debug

    this.playerId = playerId
    this.isPlayer = !!isPlayer
    this.lifeStones = []
    this.faithTokens = []
    this.runes = []
    this.isPlayerAtTurn = null
    this.isStartingPlayer = null
    this.selectedRune = null

    this.init()

    // Debug
    if (this.debug.isActive && !this.isPlayer) {
      this.debugFolder = this.debug.ui.addFolder('player')
      // this.debugFolder
      //   .addColor(this.lifeStones[0].highlightMesh.material, 'color')
      //   .name('color of the lifeStone highlight')
      //   .onChange((color) => {
      //     this.lifeStones.forEach((stone) => {
      //       stone.highlightMesh.material.color = color
      //     })
      //   })
      this.debug.faithTokenAmount = 3
      this.debug.lifeStoneAmount = 2
      this.debugFolder.add(this, 'destroyLifeStones')
      this.debugFolder.add(this.debug, 'lifeStoneAmount', 1, 20, 1)
      this.debugFolder.add(this, 'destroyFaithTokens')
      this.debugFolder.add(this.debug, 'faithTokenAmount', 1, 20, 1)
      this.debugFolder.close()
    }

    // setTimeout(() => {
    //   this.destroyLifeStones(3)
    // }, 2500)
    //
    // setTimeout(() => {
    //   this.destroyFaithTokens(3)
    // }, 5700)
  }

  reset() {
    this.lifeStones = []
    this.faithTokens = []
    this.runes = []
    this.isPlayerAtTurn = null
    this.isStartingPlayer = null
  }

  init() {
    this.dicesHandler = new DicesHandler(this.playerId, this.isPlayer)
    if (!this.isPlayer && this.playerId === GAME_PLAYER_TYPES.GAME_PLAYER_TYPE_NPC) {
      this.strategyManager = new StrategyManager(this)
    }

    new Bowl(this.isPlayer)
    this.lifeStones = []
    this.faithTokens = []
    this.runes = []

    let debugRunes = []
    if (this.debug.isActive) {
      debugRunes = [
        // new Rune(3, GAMES_RUNES.RUNE_ISIS, this),
        // new Rune(4, GAMES_RUNES.RUNE_SHU, this),
        // new Rune(5, GAMES_RUNES.RUNE_SERQET, this),
        // new Rune(6, GAMES_RUNES.RUNE_SETH, this),
        // new Rune(7, GAMES_RUNES.RUNE_RA, this),
        // new Rune(8, GAMES_RUNES.RUNE_OSIRIS, this),
        // new Rune(9, GAMES_RUNES.RUNE_TAWARET, this),
        // new Rune(10, GAMES_RUNES.RUNE_NEKHBET, this),
        // new Rune(11, GAMES_RUNES.RUNE_HORUS, this),
        // new Rune(12, GAMES_RUNES.RUNE_NEPHTHYS, this),
      ]
    }

    this.runes = [
      new BabiRune(0, this),
      // new Rune(0, GAMES_RUNES.RUNE_ANUBIS_BLACK, this),
      new AnubisRune(1, this),
      new TawaretRune(2, this),
      // new Rune(2, GAMES_RUNES.RUNE_ANUBIS_WHITE, this),
      // new Rune(2, GAMES_RUNES.RUNE_BAST, this),
      ...debugRunes,
    ]
    this.lifeStones = [...Array(GAME_STARTING_LIFE_STONES).keys()].map(
      (id) => new LifeStone(this, this.isPlayer, id, id * 0.1),
    )
    const startFaithTokens = this.debug.isActive ? 12 : 0
    this.faithTokens = [...Array().keys(startFaithTokens)].map(
      (id) => new FaithToken(this.isPlayer, id, id * 0.2),
    )

    this.dicesHandler.on('finished-moving-dices-to-enemy', () => {
      if (this.dicesHandler.dicesList.every((dice) => dice.highlightMesh?.isPlaced)) {
        this.dicesHandler.availableThrows = 0
        this.world.faithReachedByPlayer[this.playerId] = true
        this.trigger(GAMES_PHASES.FAITH_CASTING)
      }
      Object.keys(this.world.faithReachedByPlayer).length < 2 && this.trigger(GAMES_PHASES.DICE_ROLL)
    })

    this.dicesHandler.on('dices-rebuild', () => {
      this.trigger('dices-rebuild')
    })

    this.dicesHandler.on(GAMES_PHASES.DICE_ROLL, () => {
      this.trigger(GAMES_PHASES.DICE_ROLL)
    })

    this.dicesHandler.on(GAMES_PHASES.FAITH_CASTING, () => {
      this.trigger(GAMES_PHASES.FAITH_CASTING)
    })

    this.dicesHandler.on(GAMES_PHASES.DICE_RESOLVE, () => {
      this.trigger(GAMES_PHASES.DICE_RESOLVE)
    })

    this.dicesHandler.on(GAMES_PHASES.FAITH_RESOLVE, () => {
      this.trigger(GAMES_PHASES.FAITH_RESOLVE)
    })
  }

  destroyLifeStones(amount) {
    return Promise.all(
      [...Array(amount || this.debug.lifeStoneAmount).keys()].map(
        (stone, index) =>
          new Promise((resolve) => {
            this.lifeStones[0]?.destroyLifeStone(1000 + 200 * index, resolve)
          }),
      ),
    )
  }

  addLifeStones(amount) {
    return Promise.all(
      [...Array(amount).keys()].map(
        (stone, index) =>
          new Promise((resolve) => {
            this.lifeStones.push(
              new LifeStone(this, this.isPlayer, this.lifeStones.length, index * 0.1, resolve),
            )
          }),
      ),
    )
  }

  destroyFaithTokens(amount) {
    ;[...Array(amount || this.debug.faithTokenAmount).keys()].forEach((token, index) => {
      let faithToken = this.faithTokens.pop()
      faithToken?.destroyFaithToken(200 * index)
      faithToken = null
    })
  }

  startFaithSelection() {
    if (this.world.isSessionPlayerAtTurn()) {
      this.world.runeManager.showControlHint()
    } else if (this.playerId === GAME_PLAYER_TYPES.GAME_PLAYER_TYPE_NPC) {
      this.strategyManager.selectRune()
    }
  }

  update() {
    this.dicesHandler && this.dicesHandler.update()
  }
}
