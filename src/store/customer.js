import * as firebase from 'firebase';
import * as uuidv4 from 'uuid/v4';
// const uuidv4 = require('uuid/v4');

// const customerData = [
//   { name: 'FX',
//     startYear: 2012,
//     relationship: 'very good',
//     currentBill: '4M',
//     revenue: '100M',
//     logo: 'http://nsv.com/wp-content/uploads/2012/06/fuji-xerox-logo.png',
//     homepage: '',
//   },
//   { name: 'FXSS',
//     startYear: 2014,
//     relationship: 'good',
//     currentBill: '1M',
//     revenue: '100M',
//     logo: 'http://nsv.com/wp-content/uploads/2012/06/fuji-xerox-logo.png',
//     homepage: '',
//   },
//   { name: 'Canon',
//     startYear: 2016,
//     relationship: 'good',
//     currentBill: '1M',
//     revenue: '1B',
//     logo: 'http://www.canon.it/Images/Canon_Logo_350_tcm80-959888.jpg',
//     homepage: '',
//   },
//   { name: 'Sony',
//     startYear: 2012,
//     relationship: 'good',
//     currentBill: '4M',
//     revenue: '2B',
//     logo: 'https://lh4.googleusercontent.com/-G0mDI6fQXeM/AAAAAAAAAAI/AAAAAAAAfEI/q3w_lbwesr4/photo.jpg',
//     homepage: '',
//   },
//   { name: 'Konica',
//     startYear: 2017,
//     relationship: 'good',
//     currentBill: '1M',
//     revenue: '1B',
//     logo: 'https://www.konicaminolta.jp/about/release/minolta/org/img/konicaminolta_logo.gif',
//     homepage: '',
//   },
//   { name: 'SDNA',
//     startYear: 2011,
//     relationship: 'good',
//     currentBill: '0.5M',
//     revenue: '300M',
//     logo: 'https://lh4.googleusercontent.com/-G0mDI6fQXeM/AAAAAAAAAAI/AAAAAAAAfEI/q3w_lbwesr4/photo.jpg',
//     homepage: '',
//   },
// ];

/* eslint-disable no-param-reassign */
const customer = {
  namespaced: true,
  state: {
    isLoading: true,
    isUpdating: false,
    customers: null,
    selectedCustomer: null,
  },
  mutations: {
    initCustomers: (s, payload) => {
      s.customers = payload.customers;
      s.isLoading = payload.isLoading;
    },
    setSelectedCustomer: (s, c) => {
      s.selectedCustomer = c;
    },
    addCustomer: (s, c) => {
      s.customers.push(c);
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
        context.commit('initCustomers', { customers: result, isLoading: false });
      });
    },
    addCustomer: (context, c) => {
      context.commit('setUpdateFlag', true);
      const customerId = uuidv4();
      console.log(customerId);
      firebase.database().ref('customer').child(customerId).set(c)
      .then(
        () => {
          setTimeout(() => {
            c.key = customerId;
            context.commit('addCustomer', c);
            context.commit('setUpdateFlag', false);
            console.log('push data success');
          }, 3000);
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
          setTimeout(() => {
            context.commit('removeCustomer', c);
            context.commit('setUpdateFlag', false);
            console.log('remove data success');
          }, 3000);
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
