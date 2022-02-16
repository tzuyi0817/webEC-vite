<template>
  <div class="navTabs">
    <loading v-if="isLoading" />

    <ul v-else class="fade">
      <li v-for="item in options" :key="item.id">
        <button 
          :class="['navTabs__item', { 'navTabs__item--active': nowId === item.id }]"
          @click="selOption(item?.id)"
        >{{ item.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Types } from "@/types";

interface Props {
  options: Types.Category[];
  isLoading: boolean;
  nowId: number;
}

defineProps<Props>();
const emit = defineEmits(["getId"]);

const selOption = (id: number | undefined) => emit('getId', id);
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