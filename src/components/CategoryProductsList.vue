<template>
  <div class="categoryProductsList">
    <ul class="fade">
      <li v-for="item in products" :key="item.id">
        <div class="card">
          <div class="post">
            <img :src="item.image" />
      
            <div class="post-content">
              <p class="post-header"><a :href="`/product/${item.id}`">{{ item.name }}</a></p>
              <p class="post-text">{{ subDescription(item.description) }}</p>
              <div class="post-footer">
                <div>
                  <p>$ {{ item.price }}</p>
                  <p>還剩{{ item.count }}件</p>
                </div>

                <button><a :href="`/product/${item.id}`">Detail</a></button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <p class="categoryProductsList__Prompt">{{ getPrompt }}</p>
    <loading v-if="isLoading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent ({
  props: {
    products: Array,
    isLoading: Boolean,
    loadMore: Boolean
  },
  setup(props: any) {
    const subDescription = (description: String) => {
      const lenght = description.length
      return lenght > 35 ? description.substr(0, 35) + '...' : description
    }

    const getPrompt = computed(() => {
      const { products, loadMore } = props
      return products.length == 0 
        ? '此類別暫無商品'
        : loadMore ? '' : '已無更多商品'
    })
    return { subDescription, getPrompt }
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
    background: rgb(255,255,255);
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
      a {
        font-size: 16px;
        color: $baseColor;
        text-align: center;
      }
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

      button {
        margin: 0 5px 0 20px;
        z-index: 0;
        position: relative;
        padding: 5px 15px;
        font-size: 16px;
        border-radius: 10px;
        text-align: center;
        overflow: hidden;
        cursor: pointer;
        transition: .3s;
        a {
          color: $subColor;
        }

        &:hover, &:active {
          box-shadow: 0 0 5px $subColor, 0 0 25px $subColor;
          &::after,
          &::before {
            transition: .3s;
            background: $subColor;
          }

          a {
            color: #fff;
          }
        }

        &::before {
          content: '';
          position: absolute;
          z-index: -2;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 150%;
          height: 300%;
          background-color: #efefef;
          background-repeat: no-repeat;
          background-size: 50% 50%;
          background-position: 0 0;
          background-image: conic-gradient($subColor, $subColor);
          animation: rotate 2s linear infinite;
        }
        
        &::after {
          content: '';
          position: absolute;
          z-index: -1;
          left: 2px;
          top: 2px;
          width: calc(100% - 4px);
          height: calc(100% - 4px);
          background: #efefef;
          border-radius: 10px;
        }
      }
    }
  }
}

@keyframes rotate {
	100% {
		transform: translate(-50%, -50%) rotate(1turn);
	}
}
</style>