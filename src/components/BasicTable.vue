<template>
  <table id={tableName} class="center">
    <thead>
      <tr>
        <th v-for="(col, index) in columns" :key="index">{{ col.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <td v-for="(col, index) in columns" :key="index">
          <code v-if="!col.render">
            {{
              (row.find((cell) => cell.column === col.key))?.value
            }}
          </code>
          <code v-if="col.render && col.key === 'dailyRate'">
            <button @click="handleCostsClicks(
              (row.find((cell) => cell.column === col.key))?.value)">Get Costs</button>
          </code>
          <code v-if="col.render && col.key === 'registrationNumber'">
            <button @click="col.render((row.find((cell) => cell.column === col.key))?.value || '')">
              Book Vehicle</button>
          </code>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue';
import { Column, Rows } from '../types/Table';

export default Vue.extend({
  name: 'BasicTable',
  methods: {
    handleCostsClicks(row: unknown) {
      if (typeof row === 'string') {
        const dailyRate = row.substring(1, 3);
        this.$root.$emit('calculate-costs', dailyRate);
      }
    },
  },
  props: {
    tableName: {
      type: String,
      required: true,
    },
    columns: {
      type: Array as () => Column[],
      required: true,
    },
    rows: {
      type: Array as () => Rows,
      required: true,
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  border-collapse: collapse;
  font-family: Tahoma, Geneva, sans-serif;
}
table td {
  padding: 15px;
}
table thead td {
  background-color: #54585d;
  color: #ffffff;
  font-weight: bold;
  font-size: 13px;
  border: 1px solid #54585d;
}
table tbody td {
  color: #636363;
  border: 1px solid #dddfe1;
}
table tbody tr {
  background-color: #f9fafb;
}
table tbody tr:nth-child(odd) {
  background-color: #ffffff;
}
.center {
  border: 5px solid white;
  border-radius: 5px;
  margin: auto;
  text-align: center;
}
</style>
