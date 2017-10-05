<template>
  <div class="container">
    <div class="ham-icon" :class="{ active: isActive }" @click="isActive = !isActive">
      <div class="hamburger"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },
};
</script>

<style scoped>
.container {
  margin: 0px;
  padding: 0px;
  background: tomato;
}
.ham-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  cursor: pointer;
  display: block;
  background: tomato;
}

.hamburger {
  width: 50px;
  height: 6px;
  background: #fff;
  position:absolute;
  top: 50%;
  bottom: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: 0.5s;
}

.hamburger::before,
.hamburger::after {
  width: 50px;
  height: 6px;
  background: #fff;
  position:absolute;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}
.hamburger::before  {
  top: -16px;
}
.hamburger::after {
  top: 16px;
}
</style>
