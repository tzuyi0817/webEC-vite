<template>
  <div class="userProfile container">
    <header>
      <img :src="profile.image" v-if="!isLoading" class="fade">
      <p>{{ profile.name }}</p>
      <button><icon type="fas" name="edit" />編輯</button>
    </header>

    <ul class="userProfile__tab" role="tab">
      <li :class="{ 'active': nowSelect == 1 }" role="button" @click="nowSelect = 1">排程中</li>
      <li :class="{ 'active': nowSelect == 2 }" role="button" @click="nowSelect = 2">處理中</li>
      <li :class="{ 'active': nowSelect == 3 }" role="button" @click="nowSelect = 3">已完成</li>
      <li :class="{ 'active': nowSelect == 4 }" role="button" @click="nowSelect = 4">已取消</li>
    </ul>

    <order-list :orderList="orderList" :isLoading="isLoading" :nowSelect="nowSelect" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import OrderList from '../components/OrderList.vue'
import * as common from '../utils/common'

export default defineComponent ({
  components: {
    OrderList
  },
  setup() {
    const store = useStore()
    const { groupPath } = store.state
    const { user } = toRefs(store.state)
    const orderStatus = {
      ['schedule']: 1,
      ['process']: 2,
      ['complete']: 3,
      ['cancel']: 4
    }
    const data: any = reactive({
      profile: {} as any,
      isLoading: false,
      nowSelect: orderStatus.schedule,
      orderList: computed(() => {
        if (!data.profile.Orders) return []
        const orders: [] = data.profile.Orders
        return orders.filter((order: { OrderStatusId: number }) => order.OrderStatusId === data.nowSelect)
      })
    })
    
    const getUser = async () => {
      const { id } = useRoute().params
      const ajax = common.ajax(groupPath.platform + `/user/${id}/profile`, 'get')
      data.isLoading = true

      const result = await common.getAjax(ajax)
      data.isLoading = false
      data.profile = result.profile
    }

    store.commit('updateTitleName', '我的訂單')
    onMounted(() => getUser())
    return { ...toRefs(data) }
  }
})
</script>

<style lang="scss" scoped>
.userProfile {
  margin-top: 55px;
  background: #f6f6f6;
  &__tab {
    position: relative;
    background: #fff;
    padding: 8px 0 8px 84px;
    border-bottom: 1px solid rgba(0 ,0, 0, .09);
    display: flex;
    li {
      color: rgba(0, 0, 0, .87);
      border-left: 1px solid rgba(0, 0, 0, .09);
      text-align: center;
      flex: 1;
      font-size: 0.875rem;
      &:first-child {
        border-left: none;
      }

      &.active {
        color: $baseColor;
      }
    }
  }

  &.container {
    padding: 0;
  }

  header {
    background-image: url('../assets/profile_background.jpg');
    position: relative;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat no-repeat;
    padding-bottom: 43.8%;
    img {
      z-index: 1;
      position: absolute;
      bottom: -24px;
      left: 12px;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      border: 2px solid white;
    }

    p {
      position: absolute;
      width: 100%;
      padding-left: 84px;
      bottom: 18px;
      text-align: left;
      text-shadow: 1px 1px 2px rgb(89, 89, 89);
      color: white;
      font-weight: 600;
      font-size: 1.125rem;
    }

    button {
      display: flex;
      margin: 0 12px 0 4px;
      border: 1px solid #fff;
      position: absolute;
      right: 0;
      bottom: 13px;
      color: white;
      background: transparent;
      padding: 5px;
      display: inline-block;
      vertical-align: middle;
      svg {
        margin-right: 3px;
        width: 13px;
      }
    }
  }
}
</style>