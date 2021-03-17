<template>
  <div class="productRating">
    <div class="productRating__title">
      <div>
        <h1>商品評價</h1>

        <button class="productRating__stars" @click="goRating">
          <template v-if="ratingLength">
            <stars :rating="rating" />
            <span class="rating">{{ rating }} / 5</span>
            <span>{{ `(${ratingLength}則評論)` }}</span>
          </template>
          <span v-else>此商品尚未有人評價</span>
        </button>
      </div>

      <button @click="goRating">查看全部 <icon name="chevron-right" type="fas" /></button>
    </div>

    <hr />
    <rating-list :ratingList="ratingList" />

    <div class="productRating__footer">
      <button @click="goRating">{{ `查看所有瀏覽者 (${ratingLength})` }} <icon name="chevron-right" type="fas" /></button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed} from 'vue'
import Stars from '../components/Stars.vue'
import RatingList from '../components/RatingList.vue'

export default defineComponent ({
  props: {
    product: Object,
    rating: Number
  },
  components: {
    Stars,
    RatingList
  },
  setup(props: any) {
    const { product } = props
    const goRating = () => (123)
    const ratingLength = computed(() => product.Comments && product.Comments.length)
    const ratingList = computed(() => product.Comments && product.Comments.slice(0, 3))

    return { goRating, ratingList, ratingLength }
  }
})
</script>

<style lang="scss" scoped>
.productRating {
  padding: 10px;
  text-align: left;
  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__stars {
    display: flex;
    align-items: center;
    margin: 10px 0;
    .rating {
      color: $baseColor;
      font-size: 14px;
    }

    span {
      margin-right: 8px;
      color: rgba($baseFont, 0.6)
    }
  }

  &__footer {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    width: 8px;
    margin-left: 8px;
  }

  button {
    display: flex;
    align-items: center;
    background: transparent;
    &:last-child {
      color: $baseColor;
    }
  }
}
</style>