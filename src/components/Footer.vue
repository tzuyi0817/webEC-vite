<template>
  <ul class="footer" v-if="isShow">
    <div :class="['slider', nowSelect]"></div>
    <li v-for="(item, index) in menu" :key="index" @click="select(item.route)">
      <a :class="{ 'active': nowSelect == item.name }">
        <icon :name="item.icon" :type="item.type" />
        <div v-if="item.name === 'cart' && cartCount">{{ cartCount }}</div>
        <span>{{ item.name }}</span>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

type pathListType = {
  [key: string]: string
}

export default defineComponent ({
  setup() {
    const menu = [
      { name: 'home', icon: 'home', type: 'fas', route: 'Index' },
      { name: 'search', icon: 'search-location', type: 'fas', route: 'Search' },
      { name: 'profile', icon: 'user-circle', type: 'fas', route: 'UserProfile' },
      { name: 'cart', icon: 'shopping-cart', type: 'fas', route: 'Cart' }
    ]

    const store = useStore()
    const { user, cartCount } = toRefs(store.state)
    const route = useRoute()
    const $router = useRouter()
    const nowSelect = computed(() => {
      const path = route.path.split('/')[1]
      const pathList: pathListType = {
        index: 'home',
        search: 'search',
        user: 'profile',
        cart: 'cart'
      }
      return pathList[path] || path
    })
    const isShow = computed(() => route.name !== 'Account')

    const select = (route: string) => $router.push({ name: route, params: { id: route === 'UserProfile' ? `${user.value.id}` : '' } })
    return { menu, select, nowSelect, cartCount, isShow }
  }
})
</script>

<style lang="scss" scoped>
.footer {
  width: 100%; 
  position: fixed;
  bottom: 0px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(242,245,248,1) 35%, rgba(236,236,237,1) 100%);
  border-radius: 20px 20px 0px 0px;
  padding: 30px 0px 15px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.9);
  li {
    a {
      width: 90px;
      height: 45px;
      color: $baseColor;
      text-align: center;
      display: block;
      transition: 1s;
      position: relative;
      svg {
        left: 30px;
        top: 10%;
        width: 30px;
        position: absolute;
        transition-delay: .3s;
        transition: 1s cubic-bezier(.49 , -.35 , .77 , 1.44);
        z-index: 9;
      }

      div {
        background: $cartCountBg;
        color: $cartCount;
        border-radius: .625rem;
        height: .875rem;
        position: absolute;
        left: 58%;
        top: -.15rem;
        font-size: .625rem;
        line-height: .625rem;
        padding: .125rem .3125rem;
        text-align: center;
        transition: 1s  cubic-bezier(.49 , -.35 , .77 , 1.44);
        z-index: 10;
      }

      span {
        display: block;
        font-size: 14px;
        width: 100%;
        position: absolute;
        bottom: -16px;
        transition-delay: .3s;
        transition: 1s  cubic-bezier(.49 , -.35 , .77 , 1.44);
        z-index: 9;
        opacity: 0;
        color: $baseColor;
        font-weight: bold;
      }

      &.active {
        svg {
          top: -85%;
        }

        div {
          top: -2.8rem;
        }

        span {
          bottom: 15px;
          transition-delay: .5s;
          opacity: 1;
        }
      }
    }
  }

  .slider {
    width: 50px;
    height: 50px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -30px;
    background-color: #fff;
    border: 2px solid $baseColor;
    box-shadow: 0px 0px 0px 5px $baseColor;
    transition: 1s;
    border-radius: 50%;
    opacity: 0;
    &.home {
      left: calc(50% - 135px);
      opacity: 1;
    }

    &.search {
      left: calc(50% - 45px);
      opacity: 1;
    }

    &.profile {
      left: calc(50% + 45px);
      opacity: 1;
    }

    &.cart {
      left: calc(50% + 135px);
      opacity: 1;
    }
  }
}
</style>