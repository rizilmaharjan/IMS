export type Product = {
  _id?: string;
  amount: string;
  brand: string;
  category: string;
  colors: string[];
  image: string;
  name: string;
  stock: number;
};


export type User = {
    _id: string;
    confirmpassword: string;
    email: string;
    name: string;
    password: string;
    profile: string;
    role: string;
    username: string;
  };

export type Order = {
    _id: string;
    category: string;
    color: string;
    image: string;
    name: string;
    noOfProducts: number;
    orderedId: string;
    status: string;
    totalAmount: number;
    user: User
  };
  
