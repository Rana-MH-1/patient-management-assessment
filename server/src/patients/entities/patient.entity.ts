import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';

@Entity({ name: 'patients' })
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'firstName is required !' })
  firstName: string;

  @Column()
  @IsNotEmpty({ message: 'lastName is required !' })
  lastName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty({ message: 'Date of birth is required !' })
  BirthDate: string;

  @Column()
  @IsNotEmpty({ message: 'Gender is required !' })
  Gender: string;

  @Column()
  @IsNotEmpty({ message: 'Phone number is required !' })
  @IsInt()
  PhoneNumber: number;

  @Column()
  @IsNotEmpty({ message: 'Address is required !' })
  Address: string;

  @Column()
  @IsNotEmpty({ message: 'Medical Information is required !' })
  MedicalInformation: string;

  @Column({ nullable: true })
  InsurranceInformation: string;

  @Column({ type: 'text' })
  @IsNotEmpty({ message: "Patient's status is required !" })
  status: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  //set automatically the current date and time whenever the entity is updated
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
