export interface IProducts {
  _id: string;
  name: string;
  amount: string;
  stock: number;
  image: string;
}

export interface ProductType {
  _id: string;
  name: string;
  amount: string;
  stock: string;
  image: string;
  brand: string;
  category: string;
  colors: string[];
}
