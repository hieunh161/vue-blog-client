import * as firebase from 'firebase';
import * as uuidv4 from 'uuid/v4';
import Vue from 'vue';

/* eslint-disable no-param-reassign */
const customer = {
  namespaced: true,
  state: {
    isLoading: true,
    isUpdating: false,
    customers: [],
    selectedCustomer: {},
  },
  mutations: {
    initCustomers: (s, c) => {
      s.customers = c;
      s.isLoading = false;
    },
    setSelectedCustomer: (s, c) => {
      s.selectedCustomer = c;
    },
    addCustomer: (s, c) => {
      s.customers.push(c);
    },
    editCustomer: (s, c) => {
      for (let index = 0; index < s.customers.length; index += 1) {
        const element = s.customers[index];
        if (element.key === c.key) {
          // https://vuejs.org/v2/guide/list.html#Mutation-Methods
          Vue.set(s.customers, index, c);
          break;
        }
      }
    },
    removeCustomer: (s, c) => {
      const index = s.customers.indexOf(c);
      if (index > -1) {
        s.customers.splice(index, 1);
      }
    },
    setUpdateFlag: (s, v) => {
      s.isUpdating = v;
    },
  },
  actions: {
    loadCustomers: (context) => {
      firebase.database().ref('customer').once('value', (snap) => {
        const result = [];
        snap.forEach((item) => {
          const value = item.val();
          value.key = item.key;
          result.push(value);
        });
        context.commit('initCustomers', result);
      });
    },
    addCustomer: (context, c) => {
      context.commit('setUpdateFlag', true);
      const customerId = uuidv4();
      console.log(customerId);
      firebase.database().ref('customer').child(customerId).set(c)
      .then(
        () => {
          c.key = customerId;
          context.commit('addCustomer', c);
          context.commit('setUpdateFlag', false);
        },
        (err) => {
          context.commit('setUpdateFlag', false);
          console.log(`push data err ${err}`);
        },
      );
    },
    editCustomer: (context, c) => {
      context.commit('setUpdateFlag', true);
      firebase.database().ref('customer').child(c.key).set(c)
      .then(
        () => {
          context.commit('editCustomer', c);
          context.commit('setUpdateFlag', false);
        },
        (err) => {
          context.commit('setUpdateFlag', false);
          console.log(`push data err ${err}`);
        },
      );
    },
    removeCustomer: (context, c) => {
      context.commit('setUpdateFlag', true);
      firebase.database().ref(`customer/${c.key}`).remove()
      .then(
        () => {
          context.commit('removeCustomer', c);
          context.commit('setUpdateFlag', false);
        },
        (err) => {
          context.commit('setUpdateFlag', false);
          console.log(`remove data err ${err}`);
        },
      );
    },
  },
  getters: {
    customers: state => state.customers,
    isDoneLoading: state => !state.isLoading,
    isUpdating: state => state.isUpdating,
    selectedCustomer: state => state.selectedCustomer,
  },
};

export default customer;
