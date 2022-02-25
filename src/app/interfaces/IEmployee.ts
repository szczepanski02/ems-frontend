import { Authority } from "../shared/constants/authority";

export interface IEmployee {
  _id: string;
  username: string;
  email: string;
  profileImg: string;
  createdAt: Date;
  createdBy: string;
  authority: Authority;
  firstName: string;
  lastName: string;
  isActive: boolean;
}