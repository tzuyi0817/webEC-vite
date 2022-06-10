import type { Types } from '@/types';
import mitt from 'mitt'

const bus: Types.Bus = {
  $on: () => {},
  $off: () => {},
  $emit: () => {},
};
const emitter = mitt();

bus.$on = emitter.on;
bus.$off = emitter.off;
bus.$emit = emitter.emit;

export default bus;
