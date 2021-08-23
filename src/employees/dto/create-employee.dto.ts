import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {

    @IsNotEmpty()
    readonly firstName: string

    @IsNotEmpty()
    readonly lastName: string

    @IsEmail()
    readonly email: string

    readonly profileImage: string
}