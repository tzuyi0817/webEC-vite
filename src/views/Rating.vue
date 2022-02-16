<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGroupPathStore, useTitleStore } from '@/store';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { ajax, getAjax } from '@/utils/common';
import RatingList from '@/components/RatingList.vue';
// import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons';

const groupPathStore = useGroupPathStore();
const titleStore = useTitleStore();
const { groupPath } = storeToRefs(groupPathStore);
const { id } = useRoute().params;
const isLoading = ref(false);
const ratingList = ref([]);
const ratingLength = ref(0);
const currentPage = ref(1);
const totalPage = ref(0);
const loadMore = ref(false);

const getRating = async () => {
  const searchParams = new URLSearchParams({ page: `${currentPage.value}` });
  const ajaxGroup = ajax(groupPath.value.platform + `/product/${id}?${searchParams.toString()}`, 'get');
  isLoading.value = true;

  const result = await getAjax(ajaxGroup);
  isLoading.value = false;
  ratingList.value = ratingList.value.concat(result.comment);
  ratingLength.value = result.product.Comments.length;
  totalPage.value = result.totalPage.length;
  loadMore.value = totalPage.value > currentPage.value;
};

const handleScroll = (event: Event) => {
  if (!isLoading.value && loadMore.value) {
    const { scrollHeight, offsetHeight, scrollTop } = <HTMLDivElement>event.target;
    if (scrollHeight - offsetHeight <= scrollTop + 5) {
      currentPage.value++;
      getRating();
    }
  }
};

titleStore.updateTitleName('評價');
onMounted(getRating);
</script>

<template>
  <div class="rating container" @scroll.passive="handleScroll">
    <h1 v-if="!isLoading">{{ `${ratingLength}則評價` }}</h1>

    <rating-list :ratingList="ratingList" :isLoading="isLoading" :ratingLength="ratingLength" />
  </div>
</template>

<style lang="scss" scoped>
.rating {
  margin: 50px 0;
  h1 {
    margin: 45px 0;
    color: $baseColor;
  }
}
</style>