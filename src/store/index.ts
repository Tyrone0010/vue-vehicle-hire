/* eslint-disable max-len */
import dataService from '@/services/data.service';
import State from '@/types/State';
import { BookedVehicle } from '@/types/Vehicle';
import Vue from 'vue';
import Vuex from 'vuex';
import { convertVehicleToRow, findBookedVehicle, numberOfHireDays } from './storeHelper';

Vue.use(Vuex);

export default new Vuex.Store<State>({
  state: {
    vehicles: [],
    currentVehicle: undefined,
    availableVehiclesSearchRange: [undefined, undefined],
    bookedVehicles: [
      {
        from: new Date(2023, 10, 4),
        to: new Date(2023, 10, 6),
        registrationNumber: 'RAY 5WC',
        by: 'Tyrone',
      },
    ],
    customers: [{
      firstName: 'Germain',
      surname: 'McMurraya',
    }, {
      firstName: 'Rosemary',
      surname: 'Gillopp',
    }, {
      firstName: 'Brittni',
      surname: 'Presshaugh',
    }, {
      firstName: 'Kali',
      surname: 'Sproat',
    }, {
      firstName: 'Melodie',
      surname: 'McMeyler',
    }, {
      firstName: 'Crin',
      surname: 'MacAskie',
    }, {
      firstName: 'Margaretha',
      surname: 'Falkingham',
    }, {
      firstName: 'Glennis',
      surname: 'Loughran',
    }, {
      firstName: 'Jackquelin',
      surname: 'Look',
    }, {
      firstName: 'Meriel',
      surname: 'Crayden',
    }, {
      firstName: 'Peri',
      surname: 'Sleightholme',
    }, {
      firstName: 'Torrie',
      surname: 'Sellors',
    }, {
      firstName: 'Frasco',
      surname: 'Bartley',
    }, {
      firstName: 'Gennie',
      surname: 'Harrowing',
    }, {
      firstName: 'Grover',
      surname: 'Smart',
    }, {
      firstName: 'Donella',
      surname: 'Hegel',
    }, {
      firstName: 'Catherine',
      surname: 'Dalyiel',
    }, {
      firstName: 'Nickey',
      surname: 'Weeks',
    }, {
      firstName: 'Wandie',
      surname: 'Josiah',
    }, {
      firstName: 'Edita',
      surname: 'Chetham',
    }],
  },
  getters: {
    allVehicleRows: (state) => convertVehicleToRow(state.vehicles),
    allVehicles: (state) => state.vehicles,
    searchDateFrom: (state) => state.availableVehiclesSearchRange[0],
    searchDateTo: (state) => state.availableVehiclesSearchRange[1],
    getCurrentVehicle: (state) => state.currentVehicle,
    getAvailableVehicles: (state) => {
      if (!state.availableVehiclesSearchRange[0] || !state.availableVehiclesSearchRange[1]) {
        return [];
      }

      const toRemove = findBookedVehicle(
        state.bookedVehicles,
        state.vehicles,
        new Date(state.availableVehiclesSearchRange[0]),
        new Date(state.availableVehiclesSearchRange[1]),
      );

      const available = state.vehicles.filter(
        (allVehicles) => !toRemove.find(
          (remove) => remove.registrationNumber === allVehicles.registrationNumber,
        ),
      );
      return convertVehicleToRow(available);
    },
    currentNumberOfHireDays: (state) => {
      if (!state.availableVehiclesSearchRange[0] || !state.availableVehiclesSearchRange[1]) {
        return 0;
      }

      return numberOfHireDays(state.availableVehiclesSearchRange[0], state.availableVehiclesSearchRange[1]);
    },
  },
  mutations: {
    GET_ALL_VEHICLES(state, vehicles) {
      state.vehicles = vehicles;
    },
    SET_AVAILABLE_VEHICLES_SEARCH_RANGE(state, dateRange) {
      state.availableVehiclesSearchRange = dateRange;
    },
    SET_CURRENT_VEHICLE(state, registrationNumber) {
      state.currentVehicle = state.vehicles.find((vehicle) => vehicle.registrationNumber === registrationNumber);
    },
    BOOK_VEHICLE(state, bookedVehicle) {
      state.bookedVehicles = [...state.bookedVehicles, bookedVehicle];
    },

  },
  actions: {
    getVehicles({ commit }) {
      dataService.getVehicles().then((data) => {
        commit('GET_ALL_VEHICLES', data);
      });
    },
    setAvailableVehiclesSearchRange({ commit }, dateRange: [string, string]) {
      commit('SET_AVAILABLE_VEHICLES_SEARCH_RANGE', dateRange);
    },
    setCurrentVehicle({ commit }, registrationNumber:string) {
      commit('SET_CURRENT_VEHICLE', registrationNumber);
    },
    resetCurrentVehicle({ commit }) {
      commit('SET_CURRENT_VEHICLE', undefined);
    },
    bookVehicle({ commit }, bookedVehicle: BookedVehicle) {
      commit('BOOK_VEHICLE', bookedVehicle);
    },
  },
  modules: {},
});
