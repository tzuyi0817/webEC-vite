<template>
  <div class="navTabs">
    <loading v-if="isLoading" />

    <ul v-else class="fade">
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
import { defineComponent } from 'vue'

export default defineComponent ({
  props: { 
    options: Array,
    isLoading: Boolean,
    nowId: Number
  },
  emits: ['getId'],
  setup(props, { emit }) {
    const selOption = (id: number) => emit('getId', id)

    return { selOption }
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