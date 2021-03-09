<template>
  <ul class="footer">
    <div :class="['slider', nowSelect]"></div>
    <li v-for="(item, index) in menu" :key="index" @click="select(item.route)">
      <a :class="{ 'active': nowSelect == item.name }">
        <icon :name="item.icon" :type="item.type" />
        <span>{{ item.name }}</span>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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

    const select = (route: string) => $router.push({ name: route })

    return { menu, select, nowSelect }
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