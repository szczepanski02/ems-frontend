import { IAuthorizatedEmployee } from 'src/app/interfaces/IAuthorizatedEmployee';
export interface IEmployeeWithOptionalParams extends IAuthorizatedEmployee {
  createdBy?: string;
  createdAt?: Date;
  id?: number;
  profileImg?: string;
  isActive?: boolean;
  ipVerification?: boolean;
}