import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

import { Employee, EmployeeDocument } from './schemas/employee.schema';

const sharp = require("sharp");

function changeFileNameToSmall(largeName) {

  let image = largeName;

  const lastDot = image.lastIndexOf('.');

  const fileName = image.substring(0, lastDot);
  const ext = image.substring(lastDot + 1);

  let smallName = fileName + '_small.' + ext;

  return smallName
}

@Injectable()
export class EmployeesService {

  constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) {

  }


  async getAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec()
  }

  async getById(id: string): Promise<Employee> {

    return this.employeeModel.findById(id);
  }



  // async create(employeeDto: CreateEmployeeDto): Promise<Employee> {

  //   const newEmployee = new this.employeeModel(employeeDto)
  //   return newEmployee.save()
  // }

  async create(employeeDto: CreateEmployeeDto, file): Promise<Employee> {

    const newEmployee = new this.employeeModel(employeeDto)
    console.log(newEmployee._id)
    console.log(newEmployee.firstName)
    console.log(newEmployee.lastName)
    console.log(newEmployee.email)
    if (file.filename) {
      newEmployee.profileImage = file.filename;
    }
    console.log(newEmployee.profileImage);



    // Make small file



    sharp('./uploads/profileimages/' + file.filename)
      .resize({ height: 200, width: 200, fit: 'cover' })
      .toFile('./uploads/profileimages_small/' + changeFileNameToSmall(file.filename), (err, info) => {
        // console.log('Sharp error ' + err);
      });

    return newEmployee.save()
  }

  async remove(id: string): Promise<Employee> {
    return this.employeeModel.findByIdAndRemove(id)
  }

  async update(id: string, employeeDto: UpdateEmployeeDto): Promise<Employee> {
    return this.employeeModel.findByIdAndUpdate(id, employeeDto, { new: true })
  }


  // async create_uploadFile(id: string, employeeDto: UploadEmployeeDto, fileName: string): Promise<Employee> {
  //   let employee = await this.employeeModel.findById(id).exec();
  //   console.log(employee.firstName);
  //   console.log(fileName);
  //   employee.profileImage = fileName;
  //   employee.save()
  //   return employee

  //  }



}
