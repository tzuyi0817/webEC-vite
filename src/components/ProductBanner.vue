<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { ref } from 'vue';

interface Props {
  productImage: string[];
  isLoading: boolean;
};

defineProps<Props>();
const currentPage = ref(1);

const touch = async (event) => {
  setTimeout(() => {
    const img = event.target;
    const width = img.width;
    const transform = img.parentElement.parentElement.style.transform;
    const clipStart = transform.indexOf('(') + 1;
    const clipEnd = transform.indexOf('px)');
    const num = transform.slice(clipStart, clipEnd) | 0;
    currentPage.value = Math.round(Math.abs(num) / width) + 1;
  });
};
</script>

<template>
  <div class="productBanner">
    <loading v-if="isLoading" />
    <carousel v-else class="fade" @touchend="touch">
      <slide v-for="(image, index) in productImage" :key="index">
        <img :src="image">
        <span>{{ `${currentPage}/${productImage.length}` }}</span>
      </slide>
    </carousel>
  </div>
</template>

<style lang="scss" scoped>
.productBanner {
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    position: relative;
  }

  span {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: block;
    background: #fff;
    opacity: .65;
    padding: 3px 10px;
    border-radius: 12px;
    border: 1px solid rgba(0,0,0,.2);
    color: #000;
  }
}
</style>