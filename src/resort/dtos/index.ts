export class CreateResortDto {
  name: string;
  isActive: boolean;
  liveCamUrl: string;
  startDestination: string;
  endDestination: string;
  travelTime: string;
  description: string;
  distance: string;
  cars: string;
}

export class UpdateResortDto {
  id: string;
  name: string;
  isActive: boolean;
  liveCamUrl: string;
  startDestination: string;
  endDestination: string;
  travelTime: string;
  description: string;
  distance: string;
  cars: string;
}


export class CarDto {
  id: string;
  name: string;
  priceOneWay: number;
  priceOneWayDiscount: number;
  priceDoubleWay: number;
  priceDoubleWayDiscount: number;
}