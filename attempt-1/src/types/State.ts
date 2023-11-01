import { BookedVehicle, Vehicle } from './Vehicle';

interface Customer {
  firstName: string;
  surname: string;
}
interface State {
  vehicles: Vehicle[];
  currentVehicle: Vehicle | undefined;
  availableVehiclesSearchRange: [string | undefined, string | undefined]
  bookedVehicles: BookedVehicle[];
  customers: Customer[]
}
export default State;
export { Customer };
