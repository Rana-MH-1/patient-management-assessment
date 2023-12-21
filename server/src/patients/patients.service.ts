import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly PatientRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const { email } = createPatientDto;
    const newPatient = this.PatientRepository.create(createPatientDto);

    // Validate the entity using class-validator
    const errors = await validate(newPatient);

    // If there are validation errors, throw an exception with the error messages
    if (errors.length > 0) {
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    //verify that the patient doesn't exist in db
    const isFound = await this.PatientRepository.findOne({ where: { email } });
    if (isFound) {
      throw new HttpException(
        { message: 'Patient with this email already exists', email },
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.PatientRepository.save(newPatient);
  }

  async findAll() {
    return await this.PatientRepository.find();
  }

  async findOne(id: number) {
    const patient = await this.PatientRepository.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException();
    }
    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    await this.PatientRepository.update(id, updatePatientDto);
    return this.PatientRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const patient = await this.PatientRepository.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException();
    }
    await this.PatientRepository.remove(patient);
    throw new HttpException(
      { message: 'Patient deleted successfully' },
      HttpStatus.OK,
    );
  }
}
