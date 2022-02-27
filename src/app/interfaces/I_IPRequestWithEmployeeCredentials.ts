export interface I_IPRequestWithEmployeeCredentails {

  _id: string;
  createdBy: {
    _id: string;
    lastName: string;
    firstName: string;
    username: string;
  };
  createdAt: Date
  address: string;

}