import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';

type TTokenType = {
  email: string;
  userId: string;
  role: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  //

  // ! for login user
  async loginUser(payload: LoginDto) {
    const userData = await this.prisma.user.findUnique({
      where: { email: payload?.email },
    });

    if (!userData) {
      throw new NotFoundException('Invalid Email!!!');
    }

    const isPasswordMatch = await bcrypt.compare(
      payload?.password,
      userData?.password,
    );

    if (!isPasswordMatch) {
      throw new Error('Wrong password!!!');
    }

    const tokenPayload: TTokenType = {
      email: payload?.email,
      userId: userData?.id,
      role: userData?.role,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '2h',
    });

    const refreshToken = await this.jwtService.signAsync(tokenPayload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };

    //
  }

  // ! Refresh Access Token
  async refreshAccessToken(refreshToken: string) {
    try {
      const decoded: TTokenType = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: process.env.JWT_REFRESH_SECRET,
        },
      );

      // Check if token has valid type
      if (!decoded?.userId) {
        throw new UnauthorizedException('Refresh Token expired');
      }

      // Get user data
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Generate new access token
      const tokenPayload: TTokenType = {
        email: user.email,
        userId: user.id,
        role: user.role,
      };

      const newAccessToken = await this.jwtService.signAsync(tokenPayload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '2h',
      });

      return {
        accessToken: newAccessToken,
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Refresh Token expired');
    }
  }

  //
}
