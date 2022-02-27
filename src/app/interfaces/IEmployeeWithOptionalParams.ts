import { IAuthorizatedEmployee } from 'src/app/interfaces/IAuthorizatedEmployee';
export interface IEmployeeWithOptionalParams extends IAuthorizatedEmployee {
  createdBy?: string;
  createdAt?: Date;
  _id?: string;
  profileImg?: string;
  isActive?: boolean;
  ipVerification?: boolean;
}