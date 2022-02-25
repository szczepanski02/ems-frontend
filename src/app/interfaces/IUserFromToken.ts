import { Authority } from "../shared/constants/authority";

export interface IUserFromToken {
  _id: string;
  username: string;
  authority: Authority;
  firstName: string;
  lastName: string;
}