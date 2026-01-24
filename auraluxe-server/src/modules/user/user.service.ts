import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //  ! for creating a new user
  async createUser(payload: CreateUserDto, imageUrl: string) {
    // async createUser(payload: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(payload?.password, 10);

    await this.prisma.user.create({
      data: { ...payload, password: hashedPassword, profileImage: imageUrl },
    });
  }

  // ! for getting new user
  async getAllUser() {
    const result = await this.prisma.user.findMany();
    return result;
  }

  // ! for getting single user data
  async getSingleData(id: string) {
    const result = await this.prisma.user.findUnique({ where: { id } });

    if (!result) {
      throw new NotFoundException("User don't exist!!!");
    }

    return result;
  }

  // ! for updating user profile
  async updateUser(id: string, payload: UpdateUserDto, imageUrl?: string) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id, isDeleted: false },
    });

    if (!user) {
      throw new NotFoundException("User doesn't exist!!!");
    }

    // Check if email is being updated and if it already exists
    if (payload.email && payload.email !== user.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: payload.email },
      });

      if (existingUser) {
        throw new BadRequestException('Email already in use by another user');
      }
    }

    // Prepare update data
    const updateData: Record<string, unknown> = { ...payload };

    // Handle profile image update
    if (imageUrl) {
      updateData.profileImage = imageUrl;
    }

    // Update user
    const result = await this.prisma.user.update({
      where: { id },
      data: updateData,
    });

    return result;
  }

  //
}
