<template>
  <div class="container">
    <div v-for="item in categories" :key="item.id">
      <img :src="item.image">
    </div>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const { ctx }: any = getCurrentInstance()
    const groupPath = useStore().state.groupPath
    const data = reactive({ categories: [] })
    const ajax: object = ctx.common.ajax(groupPath.platform + '/index', 'get')

    const getData = (): void => {
      ctx.common.getAjax(ajax).then((result: any) => {
        data.categories = result.categories
      })
    }

    onMounted(() => getData())
    const resData = toRefs(data)
    return { ...resData }
  }
}
</script>