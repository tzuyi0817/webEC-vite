<template>
  <div class="navTabs">
    <ul>
      <li v-for="item in options" :key="item.id">
        <button 
          :class="['navTabs__item', { 'navTabs__item--active': nowId === item.id }]"
          @click="selOption(item.id)"
        >{{ item.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent ({
  props: { options: Array },
  emits: ['getId'],
  setup(props, { emit }) {
    const data = reactive({ nowId: 1 })
    const selOption = (id: number) => {
      data.nowId = id
      emit('getId', id)
    }

    const resultData = toRefs(data)
    return { ...resultData, selOption }
  }
})
</script>

<style lang="scss" scoped>
.navTabs {
  margin: 20px 0;

  &__item {
    color: #fff;
    padding: 10px 0;
    width: 100%;
    border: 2px solid #fff;
    background: $subColor;
    &--active {
      background: $baseColor;
      opacity: 1;
    }
  }

  ul {
    display: flex;
    li {
      flex-grow: 1;
    }
  }
}
</style>