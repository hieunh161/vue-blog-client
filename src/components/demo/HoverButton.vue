<template>
  <div class="btn"></div>
</template>

<script>
export default {

};
</script>

<style scoped>
.btn {
  width: 160px;
  height: 50px;
  background: tomato;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  overflow: hidden;
  color: #fff;
}
.btn::before {
  content: 'Like Me';
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 16px;
  transform: translate(-50%, -50%);
  transition: all 0.3s;
}
.btn:hover::before {
  top: -30px;
}
.btn::after {
  font-family: 'FontAwesome';
  content: '\f004';
  font-size: 24px;
  position: absolute;
  top: calc(100% + 30px);
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s;
}
.btn:hover::after {
  top: 50%;
}
</style>
