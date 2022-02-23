<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useGroupPathStore } from '@/store';
import { storeToRefs } from 'pinia';
import { ajax, getAjax } from "@/utils/common";
import IndexBanner from "@/components/IndexBanner.vue";
import NavTabs from "@/components/NavTabs.vue";
import IndexContent from "@/components/IndexContent.vue";
import { Types } from "@/types";

const groupPathStore = useGroupPathStore();
const { groupPath } = storeToRefs(groupPathStore);
const categories = ref([]);
const nowId = ref(1);
const isLoading = ref(false);
const nowCategory = computed((): Types.Category => categories.value[nowId.value - 1]);

const getId = (id: number) => nowId.value = id;

const getCategories = async() => {
  const ajaxGroup = ajax(groupPath.value.platform + "/index", "get");
  isLoading.value = true;

  const result = await getAjax(ajaxGroup);
  isLoading.value = false;
  categories.value = result.categories;
};

onMounted(getCategories);
</script>

<template>
  <div class="index container">
    <index-banner />
    <section>
      <strong>都市人的餐酒坊</strong>
      <p>
        MuseClub是一間實體結合線上的餐酒館，在線上我們提供你南美莊園原豆、法國酒莊葡萄酒與台灣本地小農食材；在實體概念店我們用我們的食材做成精美的料理，並每周舉辦料理工作坊將異國的食材，與自己做料理，成為你的生活風格。
      </p>
    </section>

    <nav-tabs :options="categories" @getId="getId" :isLoading="isLoading" :nowId="nowId" />
    <index-content v-if="!isLoading" :category="nowCategory" :isLoading="isLoading" />
  </div>
</template>

<style lang="scss" scoped>
.index {
  section {
    padding: 15px 5px 0;
    p {
      padding: 10px 0;
      line-height: 18px;
    }
  }
}
</style>