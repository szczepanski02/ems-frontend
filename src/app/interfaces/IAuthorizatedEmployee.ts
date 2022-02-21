import { authorities } from "../shared/constants/authorities";

export interface IAuthorizatedEmployee {
  id?: string;
  username?: string;
  email?: string;
  role?: authorities;
  firstName?: string;
  lastName?: string;
}