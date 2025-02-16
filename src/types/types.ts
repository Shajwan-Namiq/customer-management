export interface Customer {
  id: string;
  name: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  note: string;
}

export interface Contract {
  id: string;
  customerId: string;
  name: string;
  startDate: string;
  endDate: string;
  note: string;
}
