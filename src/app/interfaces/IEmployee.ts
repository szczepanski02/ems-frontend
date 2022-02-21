import { authorities } from "../shared/constants/authorities";

export interface IEmployee {
  _id: string;
  username: string;
  email: string;
  profile_img: string;
  created_at: Date;
  created_by: string;
  role: authorities;
  first_name: string;
  last_name: string;
  isActive: boolean;
}