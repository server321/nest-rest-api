import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateEmployeeDto {

    @IsNotEmpty()
    readonly firstName: string

    @IsNotEmpty()
    readonly lastName: string

    @IsEmail()
    readonly email: string

    readonly profileImage: string
}