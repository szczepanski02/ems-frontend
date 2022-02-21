import { authorities } from "../shared/constants/authorities";

export interface ITableEmployee {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  isActive: boolean;
  role: authorities;
}