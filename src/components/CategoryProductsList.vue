<template>
  <div class="categoryProductsList">
    <ul>
      <li v-for="item in products" :key="item.id" class="fade">
        <div class="card">
          <div class="post">
            <img :src="item.image" />
      
            <div class="post-content">
              <p class="post-header" @click="goLink(item.id)">{{ subContent(item.name, 19) }}</p>
              <p class="post-text">{{ subContent(item.description, 35) }}</p>
              <div class="post-footer">
                <div>
                  <p>$ {{ item.price }}</p>
                  <p>還剩{{ item.count }}件</p>
                </div>

                <button class="btnStyle" @click="goLink(item.id)">Detail</button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <p class="categoryProductsList__Prompt" v-if="!isLoading">{{ getPrompt }}</p>
    <loading v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent ({
  props: {
    products: Array,
    isLoading: Boolean,
    loadMore: Boolean
  },
  setup(props: any) {
    const subContent = (str: String, num: number) => {
      const length = str.length
      return length > num ? str.slice(0, num + 1) + '...' : str
    }

    const $router = useRouter()
    const goLink = (id: number) => $router.push({ name: 'Product', params: { id } })

    const getPrompt = computed(() => {
      const { products, loadMore } = props
      return products.length == 0 
        ? '此類別暫無商品'
        : loadMore ? '' : '已無更多商品'
    })
    return { subContent, getPrompt, goLink }
  }
})
</script>

<style lang="scss" scoped>
.categoryProductsList {
  margin: 30px 0;
  &__Prompt {
    color: $subColor;
    font-weight: bold;
    margin: 50px 0;
  }

  .card {
    width: 100%;
    height: 180px;
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(242,245,248,1) 35%, rgba(236,236,237,1) 100%);
    box-shadow: 0 13px 15px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    margin-top: 30px;
    transition: background-color .5s, box-shadow .5s, margin-left .5s;
    &:hover {
      margin-left: 5px;
      background-color: #ffff;
      box-shadow: 0 30px 30px rgba(0, 0, 0, 0.3);
      transition: background-color .5s, box-shadow .5s, margin-left .5s;
    }
  }

  .post {
    display: flex;
    padding: 15px 10px;
    img {
      width: 40%;
      height: 150px;
      border-radius: 10px 10px 10px;
      object-fit: center;
    }

    &-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 60%;
      overflow: hidden;
      padding: 0 10px;
    }

    &-header {
      font-size: 16px;
      color: $baseColor;
      text-align: center;
    }

    &-text {
      font-size: 14px;
      padding: 10px 0;
      color: #768CA4;
    }

    &-footer {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 55px;
      background-color: #F2F5F8;
      border-radius: 10px;
      padding: 5px;
      p {
        &:first-child {
          font-size: 20px;
          color: $subColor;
          font-weight: bold;
          margin: 5px 0;
        }

        &:last-child {
          font-size: 13px;
        }
      }
    }
  }
}
</style>