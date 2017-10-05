<template>
  <div class="container">
    <ul class="notificationBar">
      <li>
        <i class="fa fa-check" aria-hidden="true"></i>
        <div>Third notification</div>
      </li>
      <li>
        <i class="fa fa-paper-plane" aria-hidden="true"></i>
        <div>Second notification</div>
      </li>
      <li>
        <i class="fa fa-plus" aria-hidden="true"></i>
        <div>First notification</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.container {
  padding: 20px;
}
.notificationBar {
  list-style: none;
  margin: 0px;
  padding: 0;
  position: relative;
}
.notificationBar li {
  margin-top: 60px;
}
.notificationBar li div {
  margin-left: 50px;
  margin-top: -34px;
  border: 1px solid #ddd;
  padding: 10px;
  background-color: white;
  width: 250px;
}
.notificationBar li i {
  width: 30px;
  height: 30px;
  display: block;
  text-align: center;
  line-height: 30px;
  border: 1px solid #ddd;
  border-radius: 50%;
  background-color: white;
}

.notificationBar li i::after {
  content: '';
  width: 40px;
  height: 1px;
  position: absolute;
  background-color: #ddd;
  margin-top: 15px;
  z-index: -1;
}
.notificationBar::after {
  content: '';
  width: 1px;
  height: 100%;
  background-color: #ddd;
  position: absolute;
  top: 4px;
  left: 15px;
  z-index: -1;
}
</style>