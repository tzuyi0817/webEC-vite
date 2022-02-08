<template>
  <transition-group name="list" tag="ul" class="cartItem">
    <li v-for="(item, index) in cartItem" :key="item.id" class="fade">
      <div class="cartItem__box">
        <router-link :to="`/product/${item.id}`"><img :src="item.image"></router-link>

        <div class="cartItem__content">
          <router-link :to="`/product/${item.id}`">
            <p>{{ subName(item.name) }}</p>
          </router-link>
          <span>較長備貨</span>
          <div>
            <h6>{{ `$${item.price}` }}</h6>
            <h6>{{ `[剩餘 ${item.count} 件]` }}</h6>
          </div>

          <div class="cartItem__quantity">
            <button @click="minusBtn(index)">
              <icon name="minus" type="fas" />
            </button>

            <input type="number" v-model.number="item.quantity" @input="handleInput($event, index)" :disabled="item.quantity == item.count" />

            <button @click="plusBtn(index)" :disabled="item.quantity == item.count">
              <icon name="plus" type="fas" />
            </button>
          </div>
        </div>

        <icon class="cross" name="times-circle" type="fas" role="button" @click="confirmDelete(index)" />
      </div>
      <hr />
    </li>
  </transition-group>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { showMsg } from '../utils/common';
import { cartItem as cartItemType } from "../utils/interface";

interface Props {
  cartItem: cartItemType[]
};

const props = defineProps<Props>();
const emit = defineEmits(['deleteProduct', 'saveCartItem']);
const { cartItem } = toRefs(props);

const subName = (name: string) => name.length > 20 ? name.slice(0, 20) + '...' : name;
const minusBtn = (index: number) => {
  cartItem.value[index].quantity == 1 
    ? confirmDelete(index)
    : cartItem.value[index].quantity--;
  emit('saveCartItem');
};

const plusBtn = (index: number) => {
  cartItem.value[index].quantity++;
  emit('saveCartItem');
};

const handleInput = (event: Event, index: number) => {
  const { value } = <HTMLInputElement>event.target;
  if (+value > cartItem.value[index].count) cartItem.value[index].quantity = cartItem.value[index].count;
  if (+value < 1) cartItem.value[index].quantity = 1;
  emit('saveCartItem');
};

const confirmDelete = (deleteIndex: number) => 
  showMsg('確定要從購物車移除此商品？' as unknown as HTMLElement, () => deleteProduct(deleteIndex), true);

const deleteProduct = (deleteIndex: number) => emit('deleteProduct', deleteIndex);
</script>

<style lang="scss" scoped>
.cartItem {
  margin: 10px 0;
  &__box {
    display: flex;
    padding: 12px;
    font-size: 0.875rem;
    text-align: left;
    position: relative;
    img {
      min-width: 80px;
      width: 80px;
      height: 80px;
      object-fit: center;
    }

    .cross {
      position: absolute;
      width: 16px;
      color: $baseColor;
      right: 3px;
      top: -3px;
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

li {
  transition: all .5s;
  height: 178px;
}

.list-leave-active, .list-enter-active {
  transition: all .5s;
}

.list-enter, .list-leave-to {
  height: 0;
  opacity: 0;
}
</style>