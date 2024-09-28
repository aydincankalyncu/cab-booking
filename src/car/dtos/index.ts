export class CreateCarDto {
  name: string;
  isActive: string;
  type: string;
  capacity: number;
  luggage: number;
  image: string;
}

export class UpdateCarDto {
  id: string;
  name: string;
  isActive: string;
  type: string;
  capacity: number;
  luggage: number;
  image: string;
}
