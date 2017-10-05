<template>
  <div>
    <responsive-menu></responsive-menu>
    <notification-bar></notification-bar>
    <hover-button></hover-button>
    <!-- <hamburger-menu></hamburger-menu> -->
  </div>
</template>

<script>
import NotificationBar from './NotificationBar';
import HoverButton from './HoverButton';
import ResponsiveMenu from './ResponsiveMenu';
import HamburgerMenu from './HamburgerMenu';

export default {
  data() {
    return {

    };
  },
  components: {
    HoverButton,
    NotificationBar,
    ResponsiveMenu,
    HamburgerMenu,
  },
};
</script>

<style scoped>

</style>
