export class CreateCarDto {
  name: string;
  isActive: string;
  capacity: number;
  luggage: number;
  description: string;
}

export class UpdateCarDto {
  id: string;
  name: string;
  isActive: string;
  capacity: number;
  luggage: number;
  description: string;
}
