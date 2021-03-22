<template>
  <div class="rating container" @scroll="handerScroll">
    <h1 v-if="!isLoading">{{ `${ratingLength}則評價` }}</h1>

    <rating-list :ratingList="ratingList" :isLoading="isLoading" :ratingLength="ratingLength" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import * as common from '../utils/common'
import RatingList from '../components/RatingList.vue'

export default defineComponent ({
  components: {
    RatingList
  },
  setup() {
    const store = useStore()
    const { groupPath } = store.state
    const { id } = useRoute().params
    const data = reactive({
      isLoading: false,
      ratingList: [],
      ratingLength: 0,
      currentPage: 1,
      totalPage: 0,
      loadMore: false
    })

    const getRating = async() => {
      const searchParams = new URLSearchParams({ page: data.currentPage.toString() })
      const ajax = common.ajax(groupPath.platform + `/product/${id}?${searchParams.toString()}`, 'get')
      data.isLoading = true

      const result = await common.getAjax(ajax)
      data.isLoading = false
      data.ratingList = data.ratingList.concat(result.comment)
      data.ratingLength = result.product.Comments.length
      data.totalPage = result.totalPage.length
      data.loadMore = data.totalPage > data.currentPage
    }

    const handerScroll = (event: any) => {
      if (!data.isLoading && data.loadMore) {
        const { scrollHeight, offsetHeight, scrollTop } = event.srcElement
        if (scrollHeight - offsetHeight <= scrollTop + 5) {
          data.currentPage++
          getRating()
        }
      }
    }

    store.commit('updateTitleName', '評價')
    onMounted(() => getRating())
    const resData = toRefs(data)
    return { ...resData, handerScroll }
  }
})
</script>

<style lang="scss" scoped>
.rating {
  margin: 50px 0;
  h1 {
    margin: 45px 0;
    color: $baseColor;
  }
}
</style>