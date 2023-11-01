export type Vehicle = {
  [key:string]: string;
  registrationNumber: string;
  category: string;
  make: string;
  model: string;
  fuelType: string;
  dailyRate: string;
};

export type BookedVehicle = {
  registrationNumber: string;
  from: Date;
  to: Date;
  by: string;
}
