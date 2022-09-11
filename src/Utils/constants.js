// import * as THREE from 'three'

export const HIGHLIGHT_POSITION_MAP = {
  top: {
    top: '12.25%',
    right: '33%',
  },
  bottom: {
    top: '62.0%',
    right: '33%',
  },
  front: {
    top: '37.25%',
    right: '33%',
  },
  back: {
    top: '86.5%',
    right: '33%',
  },
  left: {
    top: '37.25%',
    right: '66%',
  },
  right: {
    top: '37.25%',
    right: '0%',
  },
}

export const GAME_SYMBOLS = {
  AXE: 'AXE',
  HELM: 'HELM',
  ARROW: 'ARROW',
  SHIELD: 'SHIELD',
  HAND: 'HAND',
}

export const DICE_FACES_MAP = {
  /* dice model number to side symbol mapping */
  1: {
    top: { symbol: GAME_SYMBOLS.AXE, isGolden: false },
    bottom: { symbol: GAME_SYMBOLS.HELM, isGolden: false },
    front: { symbol: GAME_SYMBOLS.ARROW, isGolden: true },
    back: { symbol: GAME_SYMBOLS.HAND, isGolden: true },
    right: { symbol: GAME_SYMBOLS.AXE, isGolden: false },
    left: { symbol: GAME_SYMBOLS.SHIELD, isGolden: false },
  },
  2: {
    top: { symbol: GAME_SYMBOLS.AXE, isGolden: false },
    bottom: { symbol: GAME_SYMBOLS.HAND, isGolden: true },
    front: { symbol: GAME_SYMBOLS.ARROW, isGolden: false },
    back: { symbol: GAME_SYMBOLS.HELM, isGolden: false },
    right: { symbol: GAME_SYMBOLS.AXE, isGolden: false },
    left: { symbol: GAME_SYMBOLS.SHIELD, isGolden: true },
  },
  3: {
    top: { symbol: GAME_SYMBOLS.AXE, isGolden: false },
    bottom: { symbol: GAME_SYMBOLS.HELM, isGolden: true },
    front: { symbol: GAME_SYMBOLS.HAND, isGolden: false },
    back: { symbol: GAME_SYMBOLS.SHIELD, isGolden: false },
    right: { symbol: GAME_SYMBOLS.AXE, isGolden: false },
    left: { symbol: GAME_SYMBOLS.ARROW, isGolden: true },
  },
  4: {
    top: { symbol: GAME_SYMBOLS.AXE, isGolden: false },
    bottom: { symbol: GAME_SYMBOLS.HELM, isGolden: true },
    front: { symbol: GAME_SYMBOLS.HAND, isGolden: true },
    back: { symbol: GAME_SYMBOLS.HELM, isGolden: false },
    right: { symbol: GAME_SYMBOLS.ARROW, isGolden: false },
    left: { symbol: GAME_SYMBOLS.SHIELD, isGolden: false },
  },
  5: {
    top: { symbol: GAME_SYMBOLS.AXE, isGolden: false },
    bottom: { symbol: GAME_SYMBOLS.HELM, isGolden: false },
    front: { symbol: GAME_SYMBOLS.HAND, isGolden: false },
    back: { symbol: GAME_SYMBOLS.ARROW, isGolden: true },
    right: { symbol: GAME_SYMBOLS.AXE, isGolden: false },
    left: { symbol: GAME_SYMBOLS.SHIELD, isGolden: true },
  },
  6: {
    top: { symbol: GAME_SYMBOLS.AXE, isGolden: false },
    bottom: { symbol: GAME_SYMBOLS.ARROW, isGolden: false },
    front: { symbol: GAME_SYMBOLS.HAND, isGolden: false },
    back: { symbol: GAME_SYMBOLS.HELM, isGolden: true },
    right: { symbol: GAME_SYMBOLS.AXE, isGolden: false },
    left: { symbol: GAME_SYMBOLS.SHIELD, isGolden: true },
  },
}

const PI_HALF = Math.PI * 0.5
export const ROTATION_FACE_MAP = {
  top: { x: 0, y: -PI_HALF, z: 0 },
  bottom: { x: -Math.PI, y: PI_HALF, z: 0 },
  front: { x: -PI_HALF, y: 0, z: 0 },
  back: { x: PI_HALF, y: 0, z: Math.PI },
  right: { x: 0, y: -PI_HALF, z: PI_HALF },
  left: { x: 0, y: PI_HALF, z: -PI_HALF },
}

export const KEYBOARD_STATE_MODIFIERS = ['shift', 'ctrl', 'alt', 'meta']
export const KEYBOARD_STATE_ALIAS = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  space: 32,
  pageup: 33,
  pagedown: 34,
  tab: 9,
}

export const GAME_BACKGROUND_VOLUME = 'TRIALS_OF_FAITH_BACKGROUND_VOLUME'
export const GAME_SOUND_EFFECT_VOLUME = 'TRIALS_OF_FAITH_SOUND_EFFECT_VOLUME'
export const GAME_TYPES = {
  GAME_TYPE_MULTIPLAYER: 'GAME_TYPE_MULTIPLAYER',
  GAME_TYPE_NPC: 'GAME_TYPE_NPC',
}

export const GAME_PLAYER_TYPES = {
  GAME_PLAYER_TYPE_PLAYER: 'GAME_PLAYER_TYPE_PLAYER',
  GAME_PLAYER_TYPE_NPC: 'GAME_PLAYER_TYPE_NPC',
}
