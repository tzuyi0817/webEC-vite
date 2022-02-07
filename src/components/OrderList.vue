<template>
  <loading v-if="isLoading" />

  <div class="orderList" v-else>
    <ul v-if="orderList.length">
      <li v-for="(order, index) in orderList" :key="index">
        <p class="orderList__status amount">{{ order.Order_status.orderStatus }}</p>
        <div class="orderList__box">
          <router-link :to="`/product/${order.items[0].id}`">
            <img :src="order.items[0].image">
          </router-link>

          <div class="orderList__content">
            <router-link :to="`/product/${order.items[0].id}`">
              <p>{{ subName(order.items[0].name) }}</p>
            </router-link>
            <p>{{ `x${order.items[0].Order_item.quantity}` }}</p>
            <p class="amount">{{ `$${order.items[0].Order_item.price}` }}</p>
          </div>
        </div>

        <hr />

        <div class="orderList__amount">
          <span>{{ `${order.items.length} 商品` }}</span>
          <p>付款金額:<span class="amount">{{ `$${order.amount}` }}</span></p>
        </div>
      </li>
    </ul>

    <div class="orderList__none" v-else>
      <img src="../assets/purchase-order.png" />
      <p>找不到訂單</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { orderType } from "../utils/interface";

interface Props {
  orderList: orderType[],
  isLoading: boolean,
  nowSelect: number
}

defineProps<Props>();
const subName = (name: string) => name.length > 20 ? name.slice(0, 20) + '...' : name;
</script>

<style lang="scss" scoped>
.orderList {
  text-align: center;
  height: 60%;
  &__none {
    margin-top: 90px;
    img {
      width: 30%;
      max-height: 200px;
      max-width: 200px;
    }

    P {
      color: rgba(0, 0, 0, .54);
      font-size: 0.875rem;
    }
  }

  &__status {
    padding: 12px 12px 0;
  }

  &__box {
    display: flex;
    padding: 12px;
    text-align: left;
    position: relative;
  }

  &__content {
    flex: 1;
    margin-left: 15px;
    p {
      &:nth-child(2) {
        margin: 10px 0;
        text-align: right;
      }
    }
  }

  &__amount {
    display: flex;
    padding: 12px;
    justify-content: space-between;
    p {
      font-size: 1.125rem;
    }
  }

  .amount {
    margin: 10px 0;
    text-align: right;
    color: $subColor;
    font-weight: bold;
    font-size: 0.875rem;
    margin-left: 5px;
  }

  ul {
    overflow-y: scroll;
    height: 100%;
    padding-bottom: 30px;
    li {
      margin-top: 10px;
      background: #fff;
      font-size: 0.875rem;
      img {
        min-width: 80px;
        width: 80px;
        height: 80px;
        object-fit: center;
      }
    }
  }
}
</style>