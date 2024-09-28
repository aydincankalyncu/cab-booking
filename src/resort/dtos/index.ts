export class CreateResortDto {
  name: string;
  isActive: boolean;
  from: string;
  to: string;
  price: number;
  roundTripPrice: number;
  distance: number;
  image: string;
  car: string;
}

export class UpdateResortDto {
  id: string;
  name: string;
  isActive: boolean;
  from: string;
  to: string;w
  price: number;
  roundTripPrice: number;
  distance: number;
  image: string;
  car: string;
}
