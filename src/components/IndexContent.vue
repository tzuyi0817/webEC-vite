<script setup lang="ts">
import type { Types } from '@/types';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

interface Props {
  category: Types.Category;
}

const props = defineProps<Props>();
const router = useRouter();
const nowId = ref(1);
const url = computed(() => `/category/${nowId.value}`);
const content = computed(() => contentData[nowId.value - 1]);
const contentData = [
  '烘焙咖啡使咖啡生豆的化學與物理性質轉變為已烘焙的咖啡製品',
  '葡萄酒是用新鮮葡萄果實或葡萄汁，經過發酵釀製而成的酒精飲料',
  '不使用化學合成農藥、化學合成肥料、基因改造生物、動物及植物生長調節劑等非天然物質的農產品'
];

const goLink = (url: string) => router.push(url);

watch(() => props.category, (val: Types.Category) => nowId.value = val.id ?? 1);
</script>

<template>
  <div class="indexContent fade">
    <p>{{ content }}</p>
    <a @click="goLink(url)">
      <img :src="category && category.image">
      <p>前往 {{ category && category.name }} 頁面 >></p>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.indexContent {
  p {
    padding: 10px 5px;
    &:last-child {
      font-weight: bold;
      color: $baseColor;
    }
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
}
</style>