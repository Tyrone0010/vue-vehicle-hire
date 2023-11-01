import { Vehicle } from '@/types/Vehicle';
import axios from 'axios';

axios.defaults.baseURL = '/';

const dataService = {
  getVehicles() {
    return axios.get('/data/vehicles.json').then((response) => {
      if (response.status === 200) {
        return response.data.vehicles as Vehicle[];
      }
      throw new Error('Failed to fetch vehicles');
    });
  },
};

export default dataService;
