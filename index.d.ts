export default function agegate(date: Date | string, countryCode: string): boolean;

export interface Country {
  code: string;
  name: string;
  age: number;
}

export function getData(): Array<Country>