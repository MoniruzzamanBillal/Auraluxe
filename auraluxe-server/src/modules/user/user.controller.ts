import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserRole } from 'src/generated/prisma/enums';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserService } from './user.service';

interface JwtRequest {
  user: {
    userId: string;
    email: string;
    role: UserRole;
  };
}

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //  ! for creating new user
  @Post('')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  async createNewUser(
    @Body() payload: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    if (!file) {
      throw new BadRequestException('Image is required');
    }

    const imageUrl = `${process.env.APP_URL}/uploads/${file?.filename}`;

    // const result = await this.userService.createUser(payload);
    const result = await this.userService.createUser(payload, imageUrl);

    return {
      success: true,
      status: HttpStatus.CREATED,
      message: 'Registration successful!',
      data: result,
    };
  }

  // ! for getting all users
  @Get('')
  async getAllUser() {
    const result = await this.userService.getAllUser();

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'all users retrived successfully!!!',
      data: result,
    };
  }

  // ! for getting single user data
  @Get(':id')
  async getSingleUser(@Param('id') id: string) {
    const result = await this.userService.getSingleData(id);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'user retrived successfully!!!',
      data: result,
    };
  }

  // ! for updating user profile (with JWT auth)
  @UseGuards(JwtAuthGuard)
  @Patch('profile-update')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  async updateUserProfile(
    @Req() req: JwtRequest,
    @Body() payload: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let imageUrl: string | undefined;

    if (file) {
      imageUrl = `${process.env.APP_URL}/uploads/${file?.filename}`;
    }

    const userId = req.user.userId;
    const result = await this.userService.updateUser(userId, payload, imageUrl);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Profile updated successfully!',
      data: result,
    };
  }

  //
}
