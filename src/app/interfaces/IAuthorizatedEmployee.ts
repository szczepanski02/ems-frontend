import { Authority } from "../shared/constants/authority";

export interface IAuthorizatedEmployee {
  id?: number;
  username?: string;
  email?: string;
  authority?: Authority;
  firstName?: string;
  lastName?: string;
}