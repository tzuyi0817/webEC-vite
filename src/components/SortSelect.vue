<template>
  <div class="cusSelBlock">
    <select class="s-hidden" v-model="selectValue"></select>
    <div :class="['selectLabel', { 'active': isOpen }]" @click="trigger">{{ selectValue.name }}</div>
      <ul class="options">
        <li 
          v-for="(item, index) in options" 
          :key="index"
          :class="{ 'open': isOpen, 'active': selectValue.value == item.value && isOpen }"
          :tabindex="index"
          @click.prevent="selectEvent(item)"
        >{{ item.name }}</li>
      </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { selValType } from "../utils/interface";

interface Props {
  options: selValType[],
};

const props = defineProps<Props>();
const emit = defineEmits(["getSelVal"]);
const selectValue = ref({} as selValType);
const isOpen = ref(false);

const trigger = () => isOpen.value = !isOpen.value;
const selectEvent = (select: selValType) => {
  selectValue.value = select;
  isOpen.value = false;
  emit('getSelVal', select);
};

onMounted(() => selectValue.value = props.options[0]);
</script>

<style lang="scss" scoped>
select {
  height: 100%;
  width: 100%;
}

.cusSelBlock {
  margin: 0 15px;
  height: 45px;
  min-width: 230px;
  display: inline-block;
  position: relative;
  perspective: 800px;
  font-size: 14px;
}

.s-hidden {
  visibility: hidden;
}

.selectLabel {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  background-color: #fff;
  border: 1px solid #333;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  color: $baseColor;
  font-weight: bold;
  cursor: pointer;
  display: block;
  height: 100%;
  width: 100%;
  letter-spacing: 2px;
  line-height: 45px;
  padding: 0 50px 0 20px;
  text-align: left;
  transform-style: preserve-3d;
  transform-origin: 50% 0%;
  transition: transform 300ms;
  transition: transform 300ms, -webkit-transform 300ms;
  -webkit-touch-callout: none;
  user-select: none;
  &:after {
    content: '\25BC';
    border-left: 1px solid #333;
    color: #333;
    font-size: 12px;
    line-height: 17px;
    padding: 10px;
    text-align: center;
    position: absolute;
    right: 0px;
    top: 5px;
    height: 15px;
    width: 30px;
  }
  &:active {
    transform: rotateX(30deg);
    &:after {
      content: '\25B2';
    }
  }
  &.active {
    &:after {
      content: '\25B2';
    }
  }
}

::-webkit-scrollbar { 
  display: none; 
}

.options {
  position: absolute;
  top: 50px;
  height: 1px;
  width: 100%;
  li {
    background-color: rgb(255,255,255);
    border-left: 1px solid #333;
    border-right: 1px solid #333;
    border-bottom: 1px solid #333;
    cursor: pointer;
    display: block;
    line-height: 50px;
    padding: 0 50px 0 20px;
    text-align: left;
    -webkit-transition: -webkit-transform 300ms ease;
    transition: -webkit-transform 300ms ease;
    transition: transform 300ms ease;
    transition: transform 300ms ease, -webkit-transform 300ms ease;
    position: absolute;
    top: -50px;
    left: 0;
    z-index: 0;
    height: 45px;
    width: 100%;
    &.active {
      background-color: $baseColor;
      color: #fff;
    }

    &:focus {
      outline: none;
    }

    &:nth-child(1) {
      transform: translateY(2px);
    }

    &:nth-child(2) {
      transform: translateY(4px);
    }

    @for $i from 1 through 10 {
      &:nth-child(#{$i}) {
        z-index: #{10+1-$i};
        &.open {
          transform: translateY(#{$i*100%});
          transition-delay: #{$i*30}ms
        }
      }
    }
  }
}
</style>