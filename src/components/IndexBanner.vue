<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { useRouter } from 'vue-router';

const router = useRouter();
const getImgUrl = (src: string) => new URL(src, import.meta.url).toString();
const banner = [
  {
    id: 1,
    url: '/category/1',
    src: getImgUrl("../assets/banner1.jpg"),
  },
  {
    id: 2,
    url: '/category/2',
    src: getImgUrl("../assets/banner2.jpg"),
  },
  {
    id: 3,
    url: '/category/3',
    src: getImgUrl("../assets/banner3.jpg"),
  },
  {
    id: 4,
    url: '/product/27',
    src: getImgUrl("../assets/banner4.jpg"),
  }
];

const goLink = (link: string) => router.push(link);
</script>

<template>
  <div class="indexBanner">
    <carousel>
      <slide v-for="item in banner" :key="item.id">
        <a @click="goLink(item.url)"><img :src="item.src"></a>
      </slide>
      
      <template #addons>
        <!-- <navigation /> -->
        <pagination />
      </template>
    </carousel>
  </div>
</template>

<style lang="scss" scoped>
.indexBanner {
  position: relative;
  a {
    width: 100%;
  }

  img {
    touch-action: pan-y;
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  ::v-deep(.carousel__prev),
  ::v-deep(.carousel__next),
  ::v-deep(.carousel__pagination-button--active) {
    background-color: $baseColor;
  }
}
</style>