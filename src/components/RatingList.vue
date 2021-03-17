<template>
  <ul class="ratingList">
    <li v-for="item in ratingList" :key="item.id">
      <div class="ratingList__box">
        <img :src="item.User.image">

        <div class="ratingList__content">
          <p>{{ hideName(item.User.name) }}</p>
          <div><stars :rating="item.rating" /></div>
          <p>{{ item.comment }}</p>
          <p>{{ conversionTime(item.updatedAt) }}</p>
        </div>
      </div>

      <hr />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Stars from '../components/Stars.vue'

export default defineComponent ({
  props: {
    ratingList: Array
  },
  components: {
    Stars
  },
  setup() {
    const hideName = (name: string) => name && name.slice(0, 1) + '*****' + name.slice(-1)
    const conversionTime = (time: string) => new Date(time).Format('yyyy-MM-dd hh:mm:ss')

    return { hideName, conversionTime }
  }
})
</script>

<style lang="scss" scoped>
.ratingList {
  font-size: 0.875rem;
  &__box {
    display: flex;
    padding-top: 10px;
    img {
      height: 1.5rem;
      width: 1.5rem;
      border-radius: 1.5rem;
    }
  }

  &__content {
    padding: 0 8px;
    p {
      margin-bottom: 8px;
      &:last-child {
        margin: 20px 0;
        opacity: 0.6;
      }
    }

    div {
      display: flex;
      margin: 12px 0;
    }
  }
}
</style>