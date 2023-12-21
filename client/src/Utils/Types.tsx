export type PatientType = {
  id: number,
  firstName: string;
  lastName: string;
  email: string;
  BirthDate: string;
  Gender: string;
  PhoneNumber: number;
  Address: string;
  MedicalInformation: string;
  InsurranceInformation: string;
  status: string;
  createdAt : string;
  updatedAt : string
};


export type createPatientType = {
  firstName: string;
  lastName: string;
  email: string;
  BirthDate: string;
  Gender: string;
  PhoneNumber: number;
  Address: string;
  MedicalInformation: string;
  InsurranceInformation?: string;
  status: string;
};
