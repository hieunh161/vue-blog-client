<template>
  <div class="ui container">
    <h1>CUSTOMER LIST</h1>
    <table class="ui striped table">
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
const customers = [
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

export default {
  name: 'customer',
  data() {
    return {
      customers,
    };
  },
};
</script>

<style>
  
</style>