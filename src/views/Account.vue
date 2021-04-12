<template>
  <div class="account container">
    <div class="account__box">
      <header>- {{ nowPage }} -</header>
      <component :is="nowComponent" @changePage="changePage" :linkPrompt="linkPrompt" />
      <p><a @click="changePage">{{ linkPrompt }}</a></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import AccountLogin from '../components/AccountLogin.vue'
import AccountRegister from '../components/AccountRegister.vue'

export default defineComponent ({
  components: {
    AccountLogin,
    AccountRegister
  },
  setup() {
    const nowPage = ref('Login')
    const nowComponent = computed(() => `Account${nowPage.value}`)
    const linkPrompt = computed(() => {
      return nowPage.value === 'Login' 
        ? "Don't have an account? REGISTER" 
        : "Already have an account? LOGIN"
    })

    const changePage = () => nowPage.value = nowPage.value === 'Login' ? 'Register' : 'Login'

    return { nowPage, nowComponent, linkPrompt, changePage }
  }
})
</script>

<style lang="scss">
@import "../scss/rwd.scss";

.account {
  margin: 0 auto;
  &__box {
    margin-top: 75px;
    background: #f0f0f0;
    width: 100%;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
    @include pad-width {
      width: 487px;
    }
    header {
      background: #2C3E50;
      text-align: center;
      padding: 25px 0 25px;
      letter-spacing: 10px;
      color: #e2e2e2;
      font: normal normal 200 1em/100% "Raleway", Helvetica, sans-serif;
      text-transform: uppercase;
      @include pad-width {
        padding: 35px 0 35px;
        border-radius: 2px;
      }
    }

    fieldset {
      margin-bottom: 15px;
      padding: 20px 20px 0;
      border: 0;
      @include pad-width {
        padding: 20px 42px 0;
      }
      input {
        width: 100%;
        height: 45px;
        border: 0;
        border: 1px solid #dbd9d9;
        border-radius: 3px;
        background: #fff;
        padding: 1px 13px;
        margin: 0 0 10px;
        color: #434343;
        font-weight: 300;
        outline: 0;
        box-shadow: none;
        appearance: none;
        transition: height, border, 0.25s linear;
        &:focus {
          height: 55px;
          border: 1px solid #a8a8a8;
        }
      }
    }
  }

  footer {
    text-align: center;
    margin: 0;
    padding: 0 42px 0;
    border-radius: 0 0 8px 8px;
    button {
      letter-spacing: 3px;
      margin: 0;
      color: #fff;
      background: $baseColor;
      font: normal normal 200 1em/100% "Raleway", Helvetica, sans-serif;
      text-align: center;
      border-radius: 2px;
      border: none;
      outline: 0;
      width: 75%;
      text-transform: uppercase;
      padding: 16px 0;
      cursor: pointer;
      transition: opacity 0.25s linear;
    }
  }

  p {
    font-size: 0.8rem;
    font-weight: 300;
    margin: 0;
    padding: 20px 0 20px;
    a {
      transition: color 0.25s linear;
      color: #6C7A89;
      &:hover {
        cursor: pointer;
        color: #4183D7;
      }
    }
  }
}

.commonForm {
  text-align: center;
  max-height: 350px;
  animation: acc-slider 0.8s linear;
  @include pad-width {
    border-radius: 2px;
  }
}

@keyframes acc-slider {
  0% { opacity: 0; }
  50% { 
    opacity: 0;
    max-height: 0;
    transform: translateY(-100px); 
  }
  85% { opacity: 0; }
  100% { 
    opacity: 1;
    max-height: 350px;
    transform: translateY(0); 
  }
}
</style>