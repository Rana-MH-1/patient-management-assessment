import { PatientType, createPatientType } from '@/Utils/Types';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/',
  });
  

export const FetchAllPatients = async()=>{
    const {data} = await instance.get("patients");
    return data?.map((Patient: PatientType) => ({
        firstName: Patient.firstName,
        lastName: Patient.lastName,
        email: Patient.email,
        BirthDate: Patient.BirthDate,
        Gender : Patient.Gender,
        PhoneNumber : Patient.PhoneNumber,
        Address : Patient.Address,
        MedicalInformation : Patient.MedicalInformation,
        InsurranceInformation : Patient.InsurranceInformation,
        status : Patient.status
      }));
}

export const createNewPatient = async(newPatient : createPatientType)=>{
    const {data} = await instance.post("patients",newPatient);
    return data
}

export const FetchOnePatient = async(id : string)=>{
    await instance.get(`patients/${id}`);
}