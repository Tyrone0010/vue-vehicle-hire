<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div>
      <BasicTable tableName="All Vehicles" :columns="columns" :rows="data"></BasicTable>
    </div>
  </div>
</template>

<script lang="ts">
import { Column } from '@/types/Table';
import Vue from 'vue';
import BasicTable from '../components/BasicTable.vue';

export default Vue.extend({
  name: 'VehiclesView',
  components: {
    BasicTable,
  },
  computed: {
    columns() {
      return [
        { label: 'Registration Number', key: 'registrationNumber' },
        { label: 'Make', key: 'make' },
        { label: 'Model', key: 'model' },
        { label: 'Category', key: 'category' },
        { label: 'Fuel Type', key: 'fuelType' },
        { label: 'Hire Rate (Daily)', key: 'dailyRate' },
      ] as Column[];
    },
    data() {
      return this.$store.getters.allVehicleRows;
    },
  },
  mounted() {
    return this.$store.dispatch('getVehicles');
  },
});
</script>
