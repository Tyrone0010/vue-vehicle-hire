<template>
  <div class="home">
    <div>
      <div>
        <date-picker placeholder="Enter date range" v-model="range" range></date-picker>
      </div>
      <code v-if="data.length">
      <BasicTable tableName="All Vehicles" :columns="columns" :rows="data"></BasicTable>
      </code>
      <code v-if="!data.length">No Vehicles are available to Hire</code>
    </div>
    <GenericModal
      v-show="isModalVisible"
      @close="toggleModal"
    >
      <template v-slot:header>
          Book Vehicle
      </template>

      <template v-slot:body>
        <div>
          <p>From: {{ new Date($store.getters.searchDateFrom).toLocaleDateString() }}</p>
          <p>To: {{ new Date($store.getters.searchDateTo).toLocaleDateString() }}</p>
          <p>Registration: {{ $store.getters.getCurrentVehicle?.registrationNumber }}</p>
          <p>Make: {{ $store.getters.getCurrentVehicle?.make }}</p>
          <p>Model: {{ $store.getters.getCurrentVehicle?.model }}</p>
          <p>Fuel Type: {{ $store.getters.getCurrentVehicle?.fuelType }}</p>
          <p>Total Cost: £{{
            $store.getters.currentNumberOfHireDays *
            parseInt($store.getters.getCurrentVehicle?.dailyRate.substring(1,3), 10)
            }}</p>
        </div>
      </template>

      <template v-slot:footer>
        <div>
          <button @click="cancelBookVehicle">Cancel</button>
          <button @click="bookVehicle">Book Vehicle</button>
        </div>
      </template>
    </GenericModal>
  </div>
</template>

<script lang="ts">
import { Column } from '@/types/Table';
import Vue from 'vue';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import BasicTable from '../components/BasicTable.vue';
import GenericModal from '../components/GenericModal.vue';

export default Vue.extend({
  name: 'AvailableVehiclesView',
  components: {
    BasicTable,
    DatePicker,
    GenericModal,
  },
  data() {
    return {
      range: [undefined, undefined],
      isModalVisible: false,
      customer: null,
    };
  },
  methods: {
    toggleModal() {
      console.log(`toggling modal to ${!this.isModalVisible}`);
      this.isModalVisible = !this.isModalVisible;
    },
    cancelBookVehicle() {
      this.$store.dispatch('resetCurrentVehicle');
      this.toggleModal();
    },
    bookVehicle() {
      const { registrationNumber } = this.$store.getters.getCurrentVehicle;
      this.$store.dispatch('bookVehicle', {
        from: this.$store.getters.searchDateFrom, to: this.$store.getters.searchDateTo, registrationNumber, by: 'user',
      }).then(() => this.$store.dispatch('resetCurrentVehicle'));
      this.toggleModal();
    },
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
        {
          label: '',
          key: 'dailyRate',
          render: (data: string) => '',
        },
        {
          label: '',
          key: 'registrationNumber',
          render: (registrationNumber: string | undefined) => {
            this.toggleModal();
            this.$store.dispatch('setCurrentVehicle', registrationNumber);
          },
        },
      ] as Column[];
    },
    data() {
      return this.$store.getters.getAvailableVehicles;
    },
  },
  watch: {
    range(val) {
      if (val[0] && val[1]) {
        return this.$store.dispatch('setAvailableVehiclesSearchRange', val);
      }
      return val;
    },
  },
  mounted() {
    this.$root.$on('calculate-costs', (dailyCost: string) => {
      alert(`The cost to hire this vehicle for ${this.$store.getters.currentNumberOfHireDays} day${this.$store.getters.currentNumberOfHireDays > 1 ? 's' : ''} is £${this.$store.getters.currentNumberOfHireDays * parseInt(dailyCost, 10)}`);
    });
    return this.$store.dispatch('getVehicles');
  },
});
</script>
