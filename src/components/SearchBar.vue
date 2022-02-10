<template>
  <div class="search__bar">
    <label>
      <input type="search" placeholder="Search for goods..."  v-model="keyword" />
    </label>
    <button @click="search" :disabled="Boolean(isLoading)">
      <icon :name="svg" type="fas" :class="{ 'loading': isLoading }" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  isLoading: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(["getKeyword"]);
const keyword = ref('');
const svg = computed(() => props.isLoading ? 'spinner' : 'search');

const search = () => emit('getKeyword', keyword.value);
</script>

<style lang="scss" scoped>
.search__bar {
  position: fixed;
  width: 90%;
  top: 20px;
  display: flex;
  justify-content: center;
  input[type="search"] {
    -webkit-appearance: none;
    background-clip: padding-box;
    background-color: #fff;
    vertical-align: middle;
    border-radius: 0.25rem;
    border: 1px solid #e0e0e5;
    font-size: 1rem;
    width: 100%;
    line-height: 2;
    padding: 0.375rem 1.25rem;
    transition: border-color 0.2s;
    margin-bottom: 0;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: auto;
    align-self: center;
    height: 51px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    &:focus {
      transition: all 0.5s;
      box-shadow: 0 0 40px $searchShadow;
      border-color: $searchBorder;
      outline: none;
    }
  }

  label {
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: auto;
    align-self: center;
    margin-bottom: 0;
  }

  button {
    height: 51px;
    padding: 1rem 1.3rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    background: $searchBorder;
    transition: all 0.2s;

    svg {
      width: 20px;
      color: #292826;
      &.loading {
        animation: spin 2s infinite linear;
      }
    }
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(1turn); }
}
</style>