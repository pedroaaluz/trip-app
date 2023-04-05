interface OperatingHoursInterface {
  closed: string;
  open: string;
}

export interface LocationInterface {
  name: string;
  tag:
    | 'Religioso'
    | 'Cultural'
    | 'Natureza'
    | 'Histórico'
    | 'Restaurante'
    | 'Hotel';
  description: string;
  image: string;
  favorite: boolean;
  operatingHours: OperatingHoursInterface;
  address: string;
  long: number;
  lat: number;
  id: string;
}
