<template>
  <div class="ui container">
    <h1>CUSTOMER LIST</h1>
    <loader  v-if="!isDoneLoading"></loader>
    <table class="ui striped table" v-if="isDoneLoading">
      <thead>
        <tr>
          <th>Logo</th>
          <th>Name</th>
          <th>Start Year</th>
          <th>Relationship</th>
          <th>Current Bill</th>
          <th>Revenue</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers">
          <td><img class="ui image tiny" :src= "customer.logo"/></td>
          <td>{{customer.name}}</td>
          <td>{{customer.startYear}}</td>
          <td>{{customer.relationship}}</td>
          <td>{{customer.currentBill}}</td>
          <td>{{customer.revenue}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loader from './Loader';

export default {
  name: 'customer',
  created() {
    this.$store.dispatch('customer/loadCustomers');
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({ customers: 'customer/customers' }),
    ...mapGetters({ isDoneLoading: 'customer/isDoneLoading' }),
  },
  components: {
    Loader,
  },
};
</script>

<style>
  
</style>