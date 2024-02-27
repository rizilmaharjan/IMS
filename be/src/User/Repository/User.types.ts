enum IGender {
  "Male",
  "Female",
}

export interface IUser {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
  role: string;
  profile: string;
  // gender: IGender;
  // role: string;
}
