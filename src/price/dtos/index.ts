export class CreatePriceDto {
  from: string;
  to: string;
  price: number;
  roundTripPrice: number;
  travelTime: number;
  distance: number;
}

export class UpdatePriceDto {
  id: string;
  from: string;
  to: string;
  price: number;
  roundTripPrice: number;
  travelTime: number;
  distance: number;
}
