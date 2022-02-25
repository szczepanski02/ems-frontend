import { Authority } from "../shared/constants/authority";

export interface IAuthorizatedEmployee {
  id?: string;
  username?: string;
  email?: string;
  authority?: Authority;
  firstName?: string;
  lastName?: string;
}