import mitt from 'mitt'
import { busType } from './interface'

const bus: busType = {}
const emitter = mitt()

bus.$on = emitter.on
bus.$off = emitter.off
bus.$emit = emitter.emit

export default bus