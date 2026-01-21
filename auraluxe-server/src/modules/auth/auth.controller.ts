import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //

  // ! for login
  @Post('login')
  async loginUser(@Body() payload: LoginDto) {
    const result = await this.authService.loginUser(payload);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'User logged in successfully!!!',
      data: result,
    };
  }

  // ! for getting new access token
  @Post('refresh-token')
  async getNewAccessToken(@Body() payload: { refreshToken: string }) {
    const result = await this.authService.refreshAccessToken(
      payload?.refreshToken,
    );

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'New Access Token refetch successfully!!!',
      data: result,
    };
  }

  //
}
