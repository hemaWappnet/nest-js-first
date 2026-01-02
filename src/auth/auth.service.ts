import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

interface UserPayload {
  id: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserPayload | null> {
    const user = await this.userService.validateUser(email, password);
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user; // Exclude password
      return result as UserPayload;
    }
    return null;
  }

  login(user: UserPayload) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    const user = await this.userService.createUser(createUserDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userPayload } = user; // Exclude password
    return this.login(userPayload as UserPayload);
  }
}
