<template>
  <data-tables :data='data' :actions-def='actionsDef' :checkbox-filter-def='checkFilterDef' :action-col-def='actionColDef'>
    <el-table-column v-for='title in titles' :key="title.flow_no" :prop='title.prop' :label='title.label' sortable='custom'>
    </el-table-column>
  </data-tables>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import ElementUI from 'element-ui';
import Vue from 'vue';
import 'element-ui/lib/theme-default/index.css';
import DataTables from 'vue-data-tables';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

Vue.use(ElementUI);
Vue.use(DataTables);
locale.use(lang);

const data = [
  {
    content: 'Water flood',
    flow_no: 'FW201601010001',
    flow_type: 'Repair',
    flow_type_code: 'repair',
  },
  {
    content: 'Lock broken',
    flow_no: 'FW201601010002',
    flow_type: 'Repair',
    flow_type_code: 'repair',
  },
  {
    content: 'Help to buy some drinks',
    flow_no: 'FW201601010003',
    flow_type: 'Help',
    flow_type_code: 'help',
  },
];

const titles = [
  {
    prop: 'flow_no',
    label: 'NO.',
  },
  {
    prop: 'content',
    label: 'Content',
  },
  {
    prop: 'flow_type',
    label: 'Type',
  },
];

export default {
  data() {
    return {
      data,
      titles,
      actionsDef: {
        colProps: {
          span: 5,
        },
        def: [{
          name: 'new',
          handler: () => {
            this.data.push({
              content: 'hello world',
              flow_no: 'FW201601010004',
              flow_type: 'Help',
              flow_type_code: 'help',
            });
          },
          buttonProps: {
            type: 'text',
          },
        },
        {
          name: 'import',
          handler: () => {
            this.$message('import clicked');
          },
          icon: 'upload',
        }],
      },
      checkFilterDef: {
        props: 'flow_type',
        def: [{
          code: 'repair',
          name: 'Repair',
        }, {
          code: 'help',
          name: 'Help',
        }],
      },
      actionColDef: {
        label: 'Actions',
        def: [{
          handler: (row) => {
            this.$message('Edit clicked');
            /* eslint no-param-reassign: ["error", { "props": false }] */
            row.flow_no = 'hello word';
          },
          name: 'Edit',
        }, {
          icon: 'message',
          type: 'text',
          handler: (row) => {
            this.$message('RUA in row clicked');
            console.log('RUA in row clicked', row);
          },
          name: 'RUA',
        }],
      },
    };
  },
  methods: {
    getRowActionsDef() {
      const self = this;
      return [{
        type: 'primary',
        handler(row) {
          self.$message('Edit clicked');
          console.log('Edit in row clicked', row);
        },
        name: 'Edit',
      }];
    },
  },
};
</script>

<style>
</style>