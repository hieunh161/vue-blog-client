<template>
  <div class="ui container">
    <button @click="openModal">open modal</button>
    <h1>CUSTOMER LIST</h1>
    <loader  v-if="!isDoneLoading"></loader>
    <table class="ui striped table" v-if="isDoneLoading">
      <thead>
        <tr>
          <th>Name</th>
          <th>Start Year</th>
          <th>Relationship</th>
          <th>Current Bill</th>
          <th>Revenue</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers">
          <td>{{customer.name}}</td>
          <td>{{customer.startYear}}</td>
          <td>{{customer.relationship}}</td>
          <td>{{customer.currentBill}}</td>
          <td>{{customer.revenue}}</td>
        </tr>
      </tbody>
    </table>
    <modal v-model="showModal">
      <p slot="header">Confirmation needed</p>
      <p slot="content">Do you want to continue?</p>
      <template slot="actions">
          <div class="ui black deny button" @click="showModal=false">
            No
          </div>
          <div class="ui positive right" @click="confirm">
            Yes
          </div>
      </template>
  </modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import modal from 'vue-semantic-modal';
import Loader from './Loader';
import CustomerTable from './CustomerTable';
import CustomerForm from './CustomerForm';

export default {
  name: 'customer',
  created() {
    this.$store.dispatch('customer/loadCustomers');
  },
  data() {
    return {
      showModal: true,
      confirmed: true,
    };
  },
  methods: {
    openModal() {
      /* global $:true */
      $('#editCustomer')
      .modal({ inverted: true })
      .modal('show');
    },
    submitForm() {
      $('#editCustomer')
      .modal('hide');
    },
    cancelForm() {
      $('#editCustomer')
      .modal('hide');
    },
    confirm() {
      this.confirmed = true;
      this.showModal = false;
    },
  },
  computed: {
    ...mapGetters({ customers: 'customer/customers' }),
    ...mapGetters({ isDoneLoading: 'customer/isDoneLoading' }),
  },
  components: {
    Loader,
    CustomerTable,
    CustomerForm,
    modal,
  },
};
</script>

<style>
  
</style>