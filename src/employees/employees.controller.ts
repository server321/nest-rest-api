import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Body,
    Res,
    UseInterceptors,
    UploadedFile,
    ValidationPipe
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

import { Employee } from './schemas/employee.schema';

import { diskStorage } from 'multer';
import path = require('path');
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';


function changeFileNameToSmall(largeName) {

    let image = largeName;

    const lastDot = image.lastIndexOf('.');

    const fileName = image.substring(0, lastDot);
    const ext = image.substring(lastDot + 1);

    let smallName = fileName + '_small.' + ext;

    return smallName
}

export const storage = {
    storage: diskStorage({
        destination: './uploads/profileimages',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + '_' + uuidv4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`)
        }
    })

}

@Controller('employees')
export class EmployeesController {

    constructor(private readonly employeesService: EmployeesService) { }

    @Get()
    getAll(): Promise<Employee[]> {
        return this.employeesService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<Employee> {
        return this.employeesService.getById(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', storage))
    create(@UploadedFile() file, @Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        return this.employeesService.create(createEmployeeDto, file)
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Employee> {
        return this.employeesService.remove(id);
    }

    @Put(':id')
    update(@Body() updateEmployeeDto: UpdateEmployeeDto, @Param('id') id: string): Promise<Employee> {
        return this.employeesService.update(id, updateEmployeeDto);
    }

    @Get('profile-image/:imagename')
    findProfileImage(@Param('imagename') imagename, @Res() res): Promise<Employee> {
        return res.sendFile(join(process.cwd(), 'uploads/profileimages/' + imagename));
    }

    @Get('profile-image-small/:imagename')
    findProfileImageSmall(@Param('imagename') imagename, @Res() res): Promise<Employee> {

        return res.sendFile(join(process.cwd(), 'uploads/profileimages_small/' + changeFileNameToSmall(imagename)));
    }


}
