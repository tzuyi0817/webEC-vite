<template>
  <div class="container">
    <index-banner />
    <nav-tabs :options="categories" @getId="getId" />
    <index-content :category="nowCategory" />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import IndexBanner from '/@/components/IndexBanner.vue'
import NavTabs from '/@/components/NavTabs.vue'
import IndexContent from '/@/components/IndexContent.vue'

export default defineComponent ({
  components: {
    IndexBanner,
    NavTabs,
    IndexContent
  },
  setup() {
    const { ctx }: any = getCurrentInstance()
    const groupPath = useStore().state.groupPath
    const data = reactive({ 
      categories: [],
      nowId: 1 
    })

    const nowCategory = computed(() => data.categories[data.nowId - 1])
    const getId = (id: number) => data.nowId = id
 
    const ajax: object = ctx.common.ajax(groupPath.platform + '/index', 'get')
    const getCategories = (): void => {
      ctx.common.getAjax(ajax).then((result: any) => {
        data.categories = result.categories
      })
    }

    onMounted(() => getCategories())
    const resData = toRefs(data)
    return { ...resData, getId, nowCategory }
  }
})
</script>