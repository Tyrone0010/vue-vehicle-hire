import { Row } from '@/types/Table';
import { BookedVehicle, Vehicle } from '@/types/Vehicle';

export function convertVehicleToRow(vehicles: Vehicle[]) {
  return vehicles.map((vehicle): Row => {
    const row: Row = [];
    Object.keys(vehicle).forEach((key) => {
      row.push({
        column: key,
        value: vehicle[key],
      });
    });
    return row;
  });
}

// eslint-disable-next-line max-len
export function findBookedVehicle(bookedVehicles: BookedVehicle[], vehicles: Vehicle[], fromDate: Date, toDate: Date) {
  const toRemove: Vehicle[] = [];

  bookedVehicles.forEach((vehicle) => {
    if (fromDate < vehicle.to && vehicle.from < toDate) {
      const matched = vehicles.find(
        (bookedVehicle) => bookedVehicle.registrationNumber === vehicle.registrationNumber,
      );
      if (matched) {
        toRemove.push(matched);
      }
    }
  });
  return toRemove;
}

export function numberOfHireDays(start: string, end: string) {
  // const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(start).getTime();
  const secondDate = new Date(end).getTime();
  const differenceInTime = secondDate - firstDate;
  return (differenceInTime / (1000 * 3600 * 24)) + 1;

  // return Math.round(Math.abs((firstDate - secondDate) + 1));
}
