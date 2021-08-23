import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";


import { EmployeesController } from "./employees.controller";
import { EmployeesService } from "./employees.service";
import { Employee, EmployeeSchema } from "./schemas/employee.schema";


@Module({
    providers: [EmployeesService],

    controllers: [EmployeesController],
    imports: [
        MongooseModule.forFeature([
            { name: Employee.name, schema: EmployeeSchema }
        ])
    ]
})
export class EmployeesModule {

}
