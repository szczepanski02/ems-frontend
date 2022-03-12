import { Authority } from "../shared/constants/authority";

export interface IUserFromToken {
  id: number;
  username: string;
  authority: Authority;
  firstName: string;
  lastName: string;
}