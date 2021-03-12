<template>
  <div class="loading">
    <div class="loading-element">
      <div class="inner one">Load</div>
      <div class="inner two">ING</div>
      <div class="inner three"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  position: relative;
  width: 100%;
  height: 250px;
}

.loading-element { 
  position: absolute;
  top: calc(50% - 32px);
  left: calc(50% - 32px);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  perspective: 800px;
  .inner { 
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    font-size: 17px;
    font-weight: bold;
    color: $subColor;
    &.one {
      left: 0%;
      top: 0%;
      animation: rotate-one 1.5s linear infinite;
      border-bottom: 5px solid $baseColor;
    }

    &.two {
      right: 0%;
      top: 0%;
      animation: rotate-two 1.5s linear infinite;
      border-right: 5px solid red;
    }

    &.three { 
      right: 0%;
      bottom: 0%;
      animation: rotate-three 1.5s linear infinite;
      border-top: 5px solid #ffcc00;
    }
  }
} 

@keyframes rotate-one { 
  0% { transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg); } 
  100% { transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg); } 
}

@keyframes rotate-two { 
  0% { transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg); } 
  100% { transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg); } 
}

@keyframes rotate-three { 
  0% { transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg); } 
  100% { transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg); } 
}
</style>