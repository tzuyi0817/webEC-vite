<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Stars from '@/components/Stars.vue';
import RatingList from '@/components/RatingList.vue';
import type { Types } from '@/types';

interface Props {
  product: Types.Product;
  rating?: number;
}

const props = defineProps<Props>();
const route = useRoute();
const router = useRouter();
const { product } = props;
const ratingLength = computed(() => product.Comments?.length ?? 0);
const ratingList = computed(() => product.Comments?.slice(0, 3) ?? []);

const goRating = () => router.push({ name: 'Rating', params: { id: route.params.id } });
</script>

<template>
  <div class="productRating">
    <div class="productRating__title">
      <div>
        <h1>商品評價</h1>

        <button class="productRating__stars" @click="goRating">
          <template v-if="ratingLength">
            <stars :rating="rating" />
            <span class="rating">{{ rating }} / 5</span>
            <span>{{ `(${ratingLength}則評價)` }}</span>
          </template>
          <span v-else>此商品尚未有人評價</span>
        </button>
      </div>

      <button @click="goRating">
        查看全部 <icon name="chevron-right" type="fas" />
      </button>
    </div>

    <hr />
    <rating-list :ratingList="ratingList" />

    <div class="productRating__footer">
      <button @click="goRating">
        {{ `查看所有瀏覽者 (${ratingLength})` }} <icon name="chevron-right" type="fas" />
      </button>
    </div>
  </div>
</template>

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
    padding-bottom: 50px;
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