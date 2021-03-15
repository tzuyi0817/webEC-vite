<template>
  <div class="productBanner">
    <loading v-if="isLoading" />
    <carousel v-else class="fade" v-model="currentPage" @touchend="touch">
      <slide v-for="(image, index) in productImage" :key="index">
        <img :src="image" ref="img">
        <span>{{ `${currentPage}/${productImage.length}` }}</span>
      </slide>
    </carousel>
    <button @click="goBack"><icon name="angle-left" type="fas" /></button>
  </div>
</template>

<script lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

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
    const $router = useRouter()
    const currentPage = ref(1)
    const img = ref('')
    const touch = () => {
      setTimeout(() => {
        const image = img.value as any
        const width = image.width
        const transform = image.parentElement.parentElement.style.transform
        const clipStart = transform.indexOf('(') + 1
        const clipEnd = transform.indexOf('px)')
        const num = ~~transform.slice(clipStart, clipEnd)
        currentPage.value = Math.round(Math.abs(num) / width) + 1
      }, 500)
    }

    const goBack = () => $router.back()
    
    return { currentPage, img, touch, goBack }
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

  button {
    position: absolute;
    background: rgba(0, 0, 0, 0.26);
    border-radius: 50%;
    left: 25px;
    top: 15px;
    padding: 3px 10px;
    svg {
      width: 12px;
      color: #fff;
    }
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