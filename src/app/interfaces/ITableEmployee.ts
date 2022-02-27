import { Authority } from "../shared/constants/authority";

export interface ITableEmployee {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  authority: Authority;
  ipVerification: boolean;
}