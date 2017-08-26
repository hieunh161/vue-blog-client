<template>
  <div class="ui container">
    <button @click="openAddForm">open modal</button>
    <h1>CUSTOMER LIST</h1>
    <h1>is Updating ... {{isUpdating}}</h1>
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
          <td>{{customer.relationship | relationship}}</td>
          <td>{{customer.currentBill | currency}}</td>
          <td>{{customer.revenue | currency}}</td>
          <td>
            <div class="ui icon green button" v-bind:id="'editButton'+customer.key" @click="() => openEditForm(customer)"><i class="icon edit"></i></div>
            <div class="ui icon red button" v-bind:id="'deleteButton'+customer.key" @click="() => removeCustomer(customer)"><i class="icon remove"></i></div>
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
          <div class="two fields">
            <div class="field">
              <label>Potential (USD)</label>
              <input type="text" v-model="iCustomer.potential" name="Potential" placeholder="Potential">
            </div>
            <div class="field">
              <label>Address</label>
              <input type="text" v-model="iCustomer.address" name="Address" placeholder="Address">
            </div>
          </div>
        </form>
      </div>
      <div class="actions">
        <div class="ui button basic red" @click="dismissForm">Cancel</div>
        <div class="ui button green" id="updateButton" @click="submitForm">OK</div>
      </div>
    </div>
    <customer-chart :customers="customers"></customer-chart>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import * as d3 from 'd3';
import * as $ from 'jquery';
import Loader from './Loader';
import CustomerTable from './CustomerTable';
import CustomerForm from './CustomerForm';
import CustomerChart from './CustomerChart';

export default {
  name: 'customer',
  created() {
    this.$store.dispatch('customer/loadCustomers');
  },
  data() {
    return {
      iCustomer: {},
      selectedCustomer: null,
      editMode: false,
    };
  },
  methods: {
    openEditForm(c) {
      this.iCustomer = c;
      this.editMode = true;
      this.openModal();
    },
    openAddForm() {
      this.editMode = false;
      this.openModal();
    },
    setSelectedCustomer(customer) {
      this.selectedCustomer = customer;
    },
    getSelectedCustomer() {
      return this.selectedCustomer;
    },
    openModal() {
      $('#editCustomer')
      .modal({ inverted: true })
      .modal('show');
    },
    addCustomer(c) {
      this.$store.dispatch('customer/addCustomer', c);
    },
    editCustomer(c) {
      this.$store.dispatch('customer/editCustomer', c);
    },
    removeCustomer(c) {
      $(`#deleteButton${c.key}`).addClass('loading');
      this.$store.dispatch('customer/removeCustomer', c);
    },
    submitForm() {
      $('#updateButton').addClass('loading');
      if (this.editMode) {
        this.editCustomer(this.iCustomer);
      } else {
        this.addCustomer(this.iCustomer);
      }
    },
    dismissForm() {
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
    CustomerChart,
  },
  watch: {
    isUpdating: {
      handler(value) {
        if (!value) {
          $('#updateButton').removeClass('loading');
          this.dismissForm();
          this.iCustomer = {};
        }
      },
      deep: true,
    },
  },
};
</script>

<style>
  
</style>