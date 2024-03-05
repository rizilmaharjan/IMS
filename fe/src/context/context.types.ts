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
  noOfProducts: number;
  product: {
    amount: string;
    brand: string;
    category: string;
    colors: string[];
    image: string;
    name: string;
    stock: number;
    _id: string;
  };
  status: string;
  totalAmount: number;
  user: {
    confirmpassword: string;
    email: string;
    name: string;
    password: string;
    profile: string;
    role: string;
    username: string;
    _id: string;
  };
  _id: string;
};

export type TUserRole = {
  name: string;
  _id: string;
};

export type TLoggedInUser = {
  confirmpassword: string;
  email: string;
  name: string;
  password: string;
  profile: string;
  role: string;
  userRoles: TUserRole;
  username: string;
  _id: string;
};
