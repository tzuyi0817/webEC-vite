import mitt from 'mitt'

interface busType {
  $on?: any,
  $off?: any,
  $emit?: any
}

const bus: busType = {}
const emitter = mitt()

bus.$on = emitter.on
bus.$off = emitter.off
bus.$emit = emitter.emit

export default bus