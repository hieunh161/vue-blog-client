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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers">
          <td>{{customer.name}}</td>
          <td>{{customer.startYear}}</td>
          <td>{{customer.relationship}}</td>
          <td>{{customer.currentBill}}</td>
          <td>{{customer.revenue}}</td>
          <td>
            <div class="ui icon green button" @click="() => editCustomer(customer)"><i class="icon edit"></i></div>
            <div class="ui icon red button" @click="() => removeCustomer(customer)"><i class="icon remove"></i></div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="ui modal" id="editCustomer">
      <i class="close icon"></i>
      <div class="header">
        Add Customer
      </div>
      <div class="content">
        <form class="ui form">
          <div class="field">
            <label>Customer Name</label>
            <input type="text" v-model="iCustomer.name" name="name" placeholder="Customer Name">
          </div>
          <div class="two fields">
            <div class="field" id="">
              <label>Start Year</label>
              <input type="number" v-model="iCustomer.startYear" name="startYear" placeholder="start year">
            </div>
            <div class="field">
              <label>Relationship</label>
              <input type="text" v-model="iCustomer.relationship" name="relationship" placeholder="Relationship">
            </div>
          </div>
          <div class="two fields">
            <div class="field">
              <label>Current Bill (USD)</label>
              <input type="text" v-model="iCustomer.currentBill" name="Current Bill" placeholder="Current Bill">
            </div>
            <div class="field">
              <label>Revenue (USD)</label>
              <input type="text" v-model="iCustomer.revenue" name="Revenue" placeholder="Revenue">
            </div>
          </div>
        </form>
      </div>
      <div class="actions">
        <div class="ui button basic red" @click="cancelForm">Cancel</div>
        <div class="ui button green" id="updateButton" @click="submitForm">OK</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
      iCustomer: {},
      selectedCustomer: null,
    };
  },
  methods: {
    setSelectedCustomer(customer) {
      this.selectedCustomer = customer;
    },
    getSelectedCustomer() {
      return this.selectedCustomer;
    },
    openModal() {
      /* global $:true */
      $('#editCustomer')
      .modal({ inverted: true })
      .modal('show');
    },
    addCustomer(c) {
      this.$store.dispatch('customer/addCustomer', c).then(
        () => {
          console.log('done');
          $('#updateButton').removeClass('loading');
          this.cancelForm();
        },
      );
      this.iCustomer = {};
    },
    editCustomer(c) {
      console.log(c.$key);
    },
    removeCustomer(c) {
      console.log(c);
      this.$store.dispatch('customer/removeCustomer', c);
    },
    submitForm() {
      $('#updateButton').addClass('loading');
      this.addCustomer(this.iCustomer);
    },
    cancelForm() {
      $('#editCustomer')
      .modal('hide');
    },
  },
  computed: {
    ...mapGetters({ customers: 'customer/customers' }),
    ...mapGetters({ isDoneLoading: 'customer/isDoneLoading' }),
    ...mapGetters({ isUpdating: 'customer/isUpdating' }),
  },
  components: {
    Loader,
    CustomerTable,
    CustomerForm,
  },
  watch: {
    // isUpdating(updating) {
    //   console.log(`We have updating value ${updating} now, yaay!`);
    // },
  },
};
</script>

<style>
  
</style>