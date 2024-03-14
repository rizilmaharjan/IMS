export type Product = {
  _id?: string;
  amount: string;
  brand: string;
  category: string;
  colors: string[];
  image: string;
  name: string;
  stock: number;
  userRoles: {
    _id: string;
    name: string;
  };
  type: "product";
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
  userRoles: {
    _id: string;
    name: string;
  };
};

export type Order = {
  noOfProducts: number;
  product: {
    _id?: string;
    amount: string;
    brand: string;
    category: string;
    colors: string[];
    image: string;
    name: string;
    stock: number;
    userRoles: {
      _id: string;
      name: string;
    };
    type: "product";
  };
  status: string;
  totalAmount: number;
  color: string;
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
  type: "order";
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
