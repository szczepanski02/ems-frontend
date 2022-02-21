import { authorities } from "../shared/constants/authorities";

export interface IUserFromToken {
  _id: string;
  username: string;
  role: authorities;
  first_name: string;
  last_name: string;
}