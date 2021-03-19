<template>
  <ul class="cartItem">
    <li v-for="(item, index) in cartItem" :key="index" class="fade">
      <div class="cartItem__box">
        <router-link :to="`/product/${item.id}`"><img :src="item.image"></router-link>

        <div class="cartItem__content">
          <p>{{ subName(item.name) }}</p>
          <span>較長備貨</span>
          <div>
            <h6>{{ `$${item.price}` }}</h6>
            <h6>{{ `[剩餘 ${item.count} 件]` }}</h6>
          </div>

          <div class="cartItem__quantity">
            <button @click="minusBtn(index)"><icon name="minus" type="fas" /></button>
            <input type="number" v-model.number="item.quantity" @input="handlerInput($event, index)" :disabled="item.quantity == item.count" />
            <button @click="item.quantity++" :disabled="item.quantity == item.count"><icon name="plus" type="fas" /></button>
          </div>
        </div>
      </div>

      <hr />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  props: {
    cartItem: Array
  },
  setup(props) {
    const subName = (name: string) => name.length > 20 ? name.slice(0, 20) + '...' : name
    const minusBtn = (index: number) => {
      const { cartItem }: any = props
      cartItem[index].quantity == 1 ? '' : cartItem[index].quantity--
    }
    const handlerInput = (event: InputEvent, index: number) => {
      const { value }: any = event.target
      const { cartItem }: any = props
      if (value > cartItem[index].count) cartItem[index].quantity = cartItem[index].count
      if (value < 1) cartItem[index].quantity = 1
    }
    return { subName, handlerInput, minusBtn }
  }
})
</script>

<style lang="scss" scoped>
.cartItem {
  margin: 10px 0;
  &__box {
    display: flex;
    padding: 12px;
    font-size: 0.875rem;
    text-align: left;
    img {
      min-width: 80px;
      width: 80px;
      height: 80px;
      object-fit: center;
    }
  }

  &__content {
    margin-left: 15px;
    p {
      &:first-child {
        margin-bottom: 10px;
      }
    }

    div {
      margin: 20px 0 10px;
      display: flex;
      h6 {
        &:first-child {
          color: $subColor;
          font-weight: bold;
          margin-right: 5px;
        }

        &:last-child {
          opacity: 0.6;
        }
      }
    }

    span {
      padding: 0 2px;
      color: $subColor;
      border: 1px solid $subColor;
    }
  }

  &__quantity {
    margin-top: 15px;
    button {
      background: #fff;
      border: 1px solid #eee;
      width: 32px;
      height: 32px;
      text-align: center;
      color: #333;
      user-select: none;
      border-radius: 0px;
      svg {
        width: 10px;
        opacity: 0.6;
      }
    }

    input {
      text-align: center;
      margin: 0 -1px;
      width: 50px;
      height: 32px;
      padding: 1px 2px;
      border: 1px solid #eee;
    }
  } 
}
</style>