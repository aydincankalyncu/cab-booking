export class CreateLocationDto {
  startDestination: string;
  endDestination: string;
  travelTime: string;
  isActive: boolean;
  description: string;
  distance: string;
  cars: CarDto[];
}

export class UpdateLocationDto {
  id: string;
  startDestination: string;
  endDestination: string;
  description: string;
  isActive: boolean;
  travelTime: string;
  distance: string;
  cars: CarDto[];
}

class CarDto {
  id: string;
  name: string;
  priceOneWay: number;
  priceOneWayDiscount: number;
  priceDoubleWay: number;
  priceDoubleWayDiscount: number;
}
