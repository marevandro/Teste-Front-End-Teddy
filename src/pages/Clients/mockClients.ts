export interface Client {
  id: number;
  name: string;
  salary: number;
  company: string;
}

export const clientsMock: Client[] = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: 'Eduardo',
  salary: 3500,
  company: 'R$120.000,00',
}));
