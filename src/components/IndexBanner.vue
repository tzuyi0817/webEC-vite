<template>
  <div class="indexBanner">
    <carousel>
      <slide v-for="item in banner" :key="item.id">
        <a @click="goLink(item.url)"><img :src="item.src"></a>
      </slide>
      
      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>
</template>

<script lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent ({
  components: { 
    Carousel,
    Slide,
    Pagination,
    Navigation 
  },
  setup() {
    const $router = useRouter()
    const goLink = (link: string) => $router.push(link)
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
    ]

    return { banner, goLink }
  }
})
</script>

<style lang="scss" scoped>

.indexBanner {
  position: relative;
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