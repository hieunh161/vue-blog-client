const customerData = [
  { name: 'FX',
    startYear: 2012,
    relationship: 'very good',
    currentBill: '4M',
    revenue: '100M',
    logo: 'http://nsv.com/wp-content/uploads/2012/06/fuji-xerox-logo.png',
    homepage: '',
  },
  { name: 'FXSS',
    startYear: 2014,
    relationship: 'good',
    currentBill: '1M',
    revenue: '100M',
    logo: 'http://nsv.com/wp-content/uploads/2012/06/fuji-xerox-logo.png',
    homepage: '',
  },
  { name: 'Canon',
    startYear: 2016,
    relationship: 'good',
    currentBill: '1M',
    revenue: '1B',
    logo: 'http://www.canon.it/Images/Canon_Logo_350_tcm80-959888.jpg',
    homepage: '',
  },
  { name: 'Sony',
    startYear: 2012,
    relationship: 'good',
    currentBill: '4M',
    revenue: '2B',
    logo: 'https://lh4.googleusercontent.com/-G0mDI6fQXeM/AAAAAAAAAAI/AAAAAAAAfEI/q3w_lbwesr4/photo.jpg',
    homepage: '',
  },
  { name: 'Konica',
    startYear: 2017,
    relationship: 'good',
    currentBill: '1M',
    revenue: '1B',
    logo: 'https://www.konicaminolta.jp/about/release/minolta/org/img/konicaminolta_logo.gif',
    homepage: '',
  },
  { name: 'SDNA',
    startYear: 2011,
    relationship: 'good',
    currentBill: '0.5M',
    revenue: '300M',
    logo: 'https://lh4.googleusercontent.com/-G0mDI6fQXeM/AAAAAAAAAAI/AAAAAAAAfEI/q3w_lbwesr4/photo.jpg',
    homepage: '',
  },
];

/* eslint-disable no-param-reassign */
const customer = {
  namespaced: true,
  state: {
    isLoading: true,
    customers: null,
  },
  mutations: {
    initCustomers: (s, payload) => {
      s.customers = payload.customers;
      s.isLoading = payload.isLoading;
    },
  },
  actions: {
    loadCustomers: (context) => {
      setTimeout(() => context.commit('initCustomers', { customers: customerData, isLoading: false }), 1000);
    },
  },
  getters: {
    customers: state => state.customers,
    isDoneLoading: state => !state.isLoading,
  },
};

export default customer;
