<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  rating: number;
}

const props = withDefaults(defineProps<Props>(), {
  rating: 0,
});

const stars = computed(() => {
  const yellowNum = props.rating | 0;
  const grayNum = 5 - props.rating | 0;
  const decimalNum = (props.rating - yellowNum).toFixed(1);

  return {
    ['yellow']: { num: yellowNum },
    ['gray']: { num: grayNum },
    ['decimal']: { num: +decimalNum },
  }
});
</script>

<template>
  <span class="star">
    <icon name="star" type="fas" class="fa-star fa-star-yellow" v-for="numY in stars.yellow.num" :key="numY" />
    <span class="star star__percentage" v-if="stars.decimal.num">
      <icon name="star" type="fas" class="fa-star-gray" />
      <icon name="star" type="fas" class="fa-star-yellow percent-star" :style="`clip: rect(0px ${18 * stars.decimal.num}px 18px 0px);`" />
    </span>
    <icon name="star" type="fas" class="fa-star fa-star-gray" v-for="numG in stars.gray.num" :key="numG" />
  </span>
</template>

<style lang="scss" scoped>
.star {
  display: flex;
  justify-content: center;
  align-items: center;
  &__percentage {
    max-height: 18px;
    position: relative;
  }
}

svg {
  width: 18px;
  &.fa-star-gray {
    color: #cbcbcb;
  }

  &.fa-star-yellow {
    color: #fcb040;
  }
}

.percent-star {
  position: absolute;
  left: 0;
  top: 0;
}
</style>