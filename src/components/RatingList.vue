<script setup lang="ts">
import { Types } from '@/types';
import { computed } from 'vue';
import Stars from '@/components/Stars.vue';

interface Props {
  ratingList: Types.Comment[];
  isLoading?: boolean;
  ratingLength?: number;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  ratingLength: -1,
});

const getPrompt = computed(() => {
  const { ratingList, ratingLength } = props;
  const nowLength = ratingList.length;
  return nowLength === 0
    ? '此商品尚未有人評價'
    : nowLength === ratingLength ? '已無更多評價' : '';
});

const hideName = (name: string) => name?.slice(0, 1) + '*****' + name?.slice(-1);
const conversionTime = (time: string) => new Date(time).Format('yyyy-MM-dd hh:mm:ss');
</script>

<template>
  <ul class="ratingList">
    <li v-for="item in ratingList" :key="item.id" class="fade">
      <div class="ratingList__box">
        <img :src="item.User.image">

        <div class="ratingList__content">
          <p>{{ hideName(item.User.name) }}</p>
          <div><stars :rating="item.rating" /></div>
          <p>{{ item.comment }}</p>
          <p>{{ conversionTime(item.updatedAt) }}</p>
        </div>
      </div>

      <hr />
    </li>

    <p class="ratingList__Prompt" v-if="!isLoading">{{ getPrompt }}</p>
    <loading v-if="isLoading" />
  </ul>
</template>

<style lang="scss" scoped>
.ratingList {
  font-size: 0.875rem;
  &__box {
    display: flex;
    padding-top: 10px;
    img {
      height: 1.5rem;
      width: 1.5rem;
      border-radius: 1.5rem;
    }
  }

  &__content {
    padding: 0 8px;
    p {
      text-align: left;
      margin-bottom: 8px;
      &:last-child {
        margin: 20px 0;
        opacity: 0.6;
      }
    }

    div {
      display: flex;
      margin: 12px 0;
    }
  }

  &__Prompt {
    text-align: center;
    color: $subColor;
    font-weight: bold;
    margin: 50px 0;
  }
}
</style>