export interface IPRequestWithUserParam {

  address: string;
  id: number;
  createdAt: Date;
  createdBy: {
    username: string;
    firstName: string;
    lastName: string;
  }

}