import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const existingUser = await this.usersService.findByEmail(dto.email);

    if (existingUser) {
      throw new BadRequestException('Ya existe un usuario con ese correo');
    }

    const user = await this.usersService.create(dto);
    const { password, ...result } = user;
    return result;
  }

  async login(dto: LoginDto): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) {
      throw new BadRequestException('Credenciales invalidas');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Credenciales invalidas');
    }

    const { password, ...result } = user;
    return result;
  }
}