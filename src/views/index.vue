<template>
  <div class="index container">
    <index-banner />
    <section>
      <strong>都市人的餐酒坊</strong>
      <p>
        MuseClub是一間實體結合線上的餐酒館，在線上，我們提供你，南美莊園原豆、法國酒莊葡萄酒與台灣本地小農食材；在實體概念店，我們用我們的食材做成精美的料理，
        並每周舉辦料理工作坊將異國的食材，與自己做料理，成為你的生活風格。
      </p>
    </section>

    <nav-tabs :options="categories" @getId="getId" :isLoading="isLoading" :nowId="nowId" />
    <index-content v-if="!isLoading" :category="nowCategory" :isLoading="isLoading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import * as common from '../utils/common'
import IndexBanner from '../components/IndexBanner.vue'
import NavTabs from '../components/NavTabs.vue'
import IndexContent from '../components/IndexContent.vue'

export default defineComponent ({
  components: {
    IndexBanner,
    NavTabs,
    IndexContent
  },
  setup() {
    const data = reactive({ 
      categories: [],
      nowId: 1,
      isLoading: false
    })
    const { groupPath } = useStore().state
    const nowCategory = computed(() => data.categories[data.nowId - 1])
    const getId = (id: number) => data.nowId = id

    const getCategories = async() => {
      const ajax = common.ajax(groupPath.platform + '/index', 'get')
      data.isLoading = true

      const result = await common.getAjax(ajax)
      data.isLoading = false
      data.categories = result.categories
    }

    onMounted(() => getCategories())
    const resData = toRefs(data)
    return { ...resData, getId, nowCategory }
  }
})
</script>

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