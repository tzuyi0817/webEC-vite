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

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { useRouter } from 'vue-router';

const router = useRouter();
const banner = [
  {
    id: 1,
    url: '/category/1',
    src: 'https://tshop.r10s.com/6c5/98a/16cf/7ab6/c022/392a/ec81/1198e787262c600c7376cd.jpg'
  },
  {
    id: 2,
    url: '/category/2',
    src: 'https://storage.googleapis.com/winentaste-assets/images/article/special/special_uksaywine_vinotypesec_00.jpg'
  },
  {
    id: 3,
    url: '/category/3',
    src: 'https://1.bp.blogspot.com/-CrzR_prJz4E/WnGVeBp9U8I/AAAAAAAAz04/SRo1-GPHS1AFxsF3KcoCbLBVTHipHELTgCLcBGAs/s1600/vegetables-343837_960_720.jpg'
  },
  {
    id: 4,
    url: '/product/27',
    src: 'https://jooshop.url.com.tw/website/uploads/website_225/zh-tw/prod_sort_imgs_518_0.jpg'
  }
];

const goLink = (link: string) => router.push(link);
</script>

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