<template>
  <div class="productBanner">
    <loading v-if="isLoading" />
    <carousel v-else class="fade" v-model="currentPage" @touchend="touch">
      <slide v-for="(image, index) in productImage" :key="index">
        <img :src="image" ref="img">
        <span>{{ `${currentPage}/${productImage.length}` }}</span>
      </slide>
    </carousel>
  </div>
</template>

<script lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { defineComponent, ref } from 'vue'

export default defineComponent ({
  props: {
    productImage: Array,
    isLoading: Boolean
  },
  components: {
    Carousel,
    Slide
  },
  setup() {
    const currentPage = ref(1)
    const img = ref('')
    const touch = () => {
      setTimeout(() => {
        const image = img.value as any
        const width = image.width
        const transform = image.parentElement.parentElement.style.transform
        const clipStart = transform.indexOf('(') + 1
        const clipEnd = transform.indexOf('px)')
        const num = Math.floor(transform.slice(clipStart, clipEnd))
        currentPage.value = Math.round(Math.abs(num) / width) + 1
      }, 500)
    }
    
    return { currentPage, img, touch }
  }
})
</script>

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